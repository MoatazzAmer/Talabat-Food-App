import { User } from "../../../database/models/user.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AppError } from "../../middleware/appError.js";

const signUp = catchError(async(req,res,next)=>{
    const user = new User(req.body);
    await user.save()
    user.password = undefined;
    let token = jwt.sign({userId : user._id , role : user.role} , process.env.SEKERT_KEY);
    res.status(201).json({message :'Success Signup ..',user , token })
}); 


const signIn = catchError(async(req,res,next)=>{
    // find user with Email 
    const user = await User.findOne({email : req.body.email});
    if (!user || !bcrypt.compareSync(req.body.password , user.password)){
        return next(new AppError('Incorrect Email Or Password' ,409))
    }
    // make JW
    let token =jwt.sign({userId : user._id , role : user.role} ,  "Moataz")
    res.status(201).json({message : "Success Login" , token});
});


const changePassword = catchError(async(req,res,next)=>{
    // find Token 
    const {token} = req.headers
    // check Token Exists Or Not
    if(!token) return next(new AppError('Invalid Token', 401))
    // verify Token
    jwt.verify(token , process.env.SEKERT_KEY ,(err , playload)=>{
        if(err) return next(new AppError(err , 404))
        req.user = playload
    })
    // get Email From User 
    const user = await User.findById(req.user.userId)
    // check Email Aleardy Exists Or Not And Comapre Password
    if(user && bcrypt.compareSync(req.body.oldPassword , user.password)){
        // update Password 
        await User.findByIdAndUpdate(req.user.userId , {password : req.body.newPassword , passwordChangedAt : Date.now()})
    }else{
        return next(new AppError('Incorrect Old Password ...',401))
    }
    res.status(201).json({message :'Success Changed Password' , token})
});

const protectedRoutes = catchError(async(req,res,next)=>{
    // find Token 
    const {token} = req.headers
    //check Token Exists Or Not
    if(!token) return next(new AppError('Invalid Token' , 409))
    // Verify Token
    let userPlayLoad = null
    jwt.verify(token , process.env.SEKERT_KEY,(err,playLoad)=>{
        if(err) return next(new AppError(err , 409));
        userPlayLoad = playLoad
    })
    //get user And Check user Exists Or Not
    const user = await User.findById(userPlayLoad.userId);
    if(!user) return next(new AppError('User Not Found',401))

    // compare time token whith change password- 
    if(user.passwordChangedAt){
        const time = parseInt(user.passwordChangedAt.getTime() / 1000);
        if(time > userPlayLoad.iat) return next(new AppError('Invalid Token .. please Success Again' ,401))
    }
    req.user = user
    next()
})

const referTo = (...roles)=>{
    
    return catchError(async(req,res,next)=>{
        // role includes role in database
        if(roles.includes(req.user.role)){
            return next()
        }else{
            return next(new AppError('You Are Not Authorized To Access This Endpoint',401))
        }
    })
}
export{
    signUp,
    signIn,
    changePassword,
    protectedRoutes,
    referTo
}