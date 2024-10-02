import { User } from "../../database/models/user.js";
import { AppError } from "./appError.js";
import { catchError } from "./catchError.js";




const checkEmailAndMobileExists = catchError(async(req,res,next)=>{
    const checkEmail =await User.findOne({email : req.body.email});
    if(checkEmail) return next(new AppError('Email Aleardy Exists ..' , 409))

    const checkNumber =await User.findOne({mobileNumber : req.body.mobileNumber});
    if(checkNumber) return next(new AppError('Mobile Number Aleardy Exists ..' , 409));

    next()
});

export{
    checkEmailAndMobileExists
}