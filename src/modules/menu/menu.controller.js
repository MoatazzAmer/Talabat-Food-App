import { Menu } from "../../../database/models/menu.js";
import { AppError } from "../../middleware/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeature } from "../../utils/apiFeature.js";



const addMenu = catchError(async(req,res,next)=>{
    // add new Food
    const menu = new Menu(req.body);

    await menu.save()
    res.status(201).json({message:"Success Add User" , menu})
});


const getAllMenu = catchError(async(req,res,next)=>{
    
    let apiFeature = new ApiFeature(Menu.find() , req.query)
    .pagination().filter().sort().fields().search()

    let menus = await apiFeature.mongooseQuery;

    let totalMenus = await Menu.countDocuments();
    res.status(201).json({message:"Success To Get All Menus", totalMenus , page: apiFeature.pageNumber , menus})
})

const getSpecificMenu = catchError(async(req,res,next)=>{
    // get Specific Menu 
    const  menu = await Menu.findById(req.params.id).populate('food' , '-_id -menuId -createdAt -updatedAt ' ).populate('restaurant' , '-_id ' );
    menu || next(new AppError("Soory Menu Not Found" , 409))
    !menu ||     res.status(201).json({message:"Success" , menu})
})

const updateMenu = catchError(async(req,res,next)=>{
    // get menu And Update
    const menu = await Menu.findByIdAndUpdate(req.params.id , req.body , {new: true});
    menu || next(new AppError("Soory Menu Not Found" , 409))
    !menu ||     res.status(201).json({message:"Success updated Menu" , menu})
})

const deleteMenu = catchError(async(req,res,next)=>{
    // get menu And Update
    const menu = await Menu.findByIdAndUpdate(req.params.id );
    menu || next(new AppError("Soory Menu Not Found" , 409))
    !menu ||     res.status(201).json({message:"Success Deleted Menu" , menu})
})

export {
    addMenu , getAllMenu , getSpecificMenu , updateMenu , deleteMenu
}