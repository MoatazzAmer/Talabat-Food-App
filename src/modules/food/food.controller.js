import { Food } from "../../../database/models/Food.js";
import { AppError } from "../../middleware/appError.js";
import { catchError } from "../../middleware/catchError.js";
import fs from 'fs'
import path from 'path'




const addFood = catchError(async(req,res,next)=>{
    // add new Food
    req.body.images = req.files.images.map(img=> img.filename)
    const food = new Food(req.body);

    await food.save()
    res.status(201).json({message:"Success Add User" , food})
});


const getSpecificFood = catchError(async(req,res,next)=>{
    // get one Element Of Food
    const food = await Food.findById(req.params.id);
    food || next(new AppError('food Not Found' , 401));
    !food ||  res.status(201).json({message :"Success Get Specific Food" , food})
});


const getAllFoods = catchError(async(req,res,next)=>{
    
    let apiFeature = new ApiFeature(Food.find() , req.query)
    .pagination().filter().sort().fields().search();
    const food = await apiFeature.mongooseQuery;

    let totalFoods = await Food.countDocuments();
    res.status(201).json({message:"Success Get All User" , totalFoods, Page:apiFeature.pageNumber  , food})
})


const updateFood = catchError(async (req, res, next) => {
    //confirm there is no old photo

    const destination = path.resolve('uploads/food');
    const file = fs.readdirSync(destination);

    const oldImages = await Food.findById(req.params.id); 
    
    if(req.file)
    if(oldImages.images)
        oldImages.images.forEach((img)=>{
            
            if(file.includes(img)){
                
                // determine the path of old images
                let imagePath = path.resolve(`uploads/food/${img}`);
                // console.log(img);
                    
                // remove old images
                fs.unlinkSync(imagePath)
            }
        });

    if(req.file) req.body.images = req.files.images.map((val) => val.filename)
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    updateFood || next(new AppError('Sorry Food Not Found',404));
    !updateFood || res.status(200).json({ message: "Food item updated successfully", food: updatedFood });
});

const deleteFoods = catchError(async(req,res,next)=>{
    //confirm there is no old photo
    let destenation = path.resolve('uploads/food');
    let file = fs.readdirSync(destenation);


    let oldImages = await Food.findById(req.params.id);

        oldImages.images.forEach((img)=>{
            if(file.includes(img)){
                //determin the path of the old photo
                let imagePath = path.resolve(`uploads/food/${img}`)

                //remove old photo
                fs.unlinkSync(imagePath)
            }
        })

    // Delete Food
    const food = await Food.findByIdAndDelete(req.params.id);
    food || next(new AppError('food Not Found' , 401));
    !food ||  res.status(201).json({message :"Food item Deleted successfully" , food})
})
export {
    addFood , getAllFoods , getSpecificFood , updateFood , deleteFoods
}