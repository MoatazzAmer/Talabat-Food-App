import { Food } from "../../../database/models/Food.js";
import { Order } from "../../../database/models/order.js"
import { Restaurant } from "../../../database/models/restaurant.js";
import { AppError } from "../../middleware/appError.js";
import { catchError } from "../../middleware/catchError.js"
import { ApiFeature } from "../../utils/apiFeature.js";


const addOrder = catchError(async(req,res,next)=>{
    // Find all food items by their IDs
    const foodItems = await Food.find({ _id: req.body.food });
    
    // Calculate the total price by summing the prices of all food items
    var totalPrice = foodItems.reduce((total, food) =>{
        return total + (food.priceAfterDiscount ? food.priceAfterDiscount : food.price);
    }, 0);

    // Check if there are foods without discount and more than 3 items ordered
    const someFoodsHaveDiscount = foodItems.every(food => food.priceAfterDiscount)
    const someFoodsWithOutDiscount = foodItems.every(food => !food.priceAfterDiscount)

    // Apply 40% discount only to the items without discount if more than 3 items
    if(foodItems.length >= 3 && someFoodsHaveDiscount && someFoodsWithOutDiscount) {
        totalPrice = totalPrice * 0.6; 
    }

    // Add new Order with the calculated total price
    const order = new Order({
        user : req.user._id,
        ... req.body,
        totalPrice : totalPrice
    });
    await order.save()
    res.status(201).json({message:"Success Added Order ..." , order})
});

const getAllOrder = catchError(async(req,res,next)=>{
    
    let apiFeature = new ApiFeature(Order.find().populate('food','-_id').populate('restaurant' , '-_id nameRestaurant').populate('user' , '-_id') , req.query)
    .pagination().filter().sort().fields().search();

    let Orders = await apiFeature.mongooseQuery;

    let totalOrder = await Order.countDocuments();
    
    res.status(201).json({message : "Success To Get All Orders" , totalOrder , page : apiFeature.pageNumber , Orders})
});
// const getAllOrder = catchError(async(req,res,next)=>{
//     const restaurant = await Restaurant.findOne({user : req.user._id});

//     if(restaurant.user._id.toString() !== req.user._id.toString()){
//         return next(new AppError('Sorry You Are Not Authorized To Access This endpoint'))
//     }
//     // Get All Order ..
//     const orders = await Order.find().populate('food','-_id').populate('restaurant' , '-_id nameRestaurant').populate('user' , '-_id')
//     orders || next(new AppError('Orders Not Found' , 409))
//     !orders || res.status(201).json({message:"Success Get All Order ...",orders})
// });

const getSpecificOrder = catchError(async(req,res,next)=>{

    const restaurant = await Restaurant.findOne({user : req.user._id});

    if(restaurant.user._id.toString() !== req.user._id.toString()){
        return next(new AppError('Sorry You Are Not Authorized To Access This endpoint'))
    }
    // get Specific Order ..
    const order = await Order.findById(req.params.id).populate('food','-_id').populate('restaurant' , '-_id nameRestaurant').populate('user' , '-_id')
    order || next(new AppError('order Not Found' , 409))
    !order ||  res.status(201).json({message:"Success Get Specific Order ...",order})
});

const updatedOrder = catchError(async(req,res,next)=>{
    //update Order ..
    const order = await Order.findOneAndUpdate({user :req.user._id} , req.body , {new : true})
    order || next(new AppError('order Not Found' , 409))
    !order ||  res.status(201).json({message:"Success Updated Order ...",order})
});

const deleteOrder = catchError(async(req,res,next)=>{
    // Delete Order ..
    const order = await Order.findOneAndUpdate({user :req.user._id})
    order || next(new AppError('order Not Found' , 409))
    !order || res.status(201).json({message:"Success Deleted Order ...",order})
});

export {
    addOrder , getAllOrder , getSpecificOrder , updatedOrder , deleteOrder
}
