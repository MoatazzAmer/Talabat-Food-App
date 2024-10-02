import { User } from "../../../database/models/user.js";
import { AppError } from "../../middleware/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeature } from "../../utils/apiFeature.js";




const addUser = catchError(async(req,res,next)=>{
    // add new user
    const user = await User.insertMany(req.body);
      //make the password invisible in response
    user.password = undefined
    res.status(201).json({message:"Success Add User" , user})
});

const getSpecificUser = catchError(async(req,res,next)=>{
    
    const user =await User.findById(req.user._id);
    user.password = undefined
    user ||  next(new AppError('User Not Found' , 401));
    !user || res.status(201).json({message :'Success Get One User' , user})
})

const getAllUser = catchError(async(req,res,next)=>{
      //make the password invisible in response
    let apiFeature = new ApiFeature(User.find().select('-password') , req.query)
    .pagination().filter().sort().fields().search();
    const user = await apiFeature.mongooseQuery;

    let totalUser = await User.countDocuments();
    res.status(201).json({message:"Success Get All User" , totalUser, Page:apiFeature.pageNumber  , user})
})

const deleteUser = catchError(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id);
      //make the password invisible in response
    user.password = undefined
    user ||  next(new AppError('User Not Found' , 401));
    !user || res.status(201).json({message :'Success Delete User' , user})
})

const UpdateUser = catchError(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.user._id , req.body , {new : true});
      //make the password invisible in response
    user.password = undefined
    user ||  next(new AppError('User Not Found' , 401));
    !user || res.status(201).json({message :'Success Update User' , user})
})
export{
    addUser , getSpecificUser , getAllUser , deleteUser , UpdateUser
}