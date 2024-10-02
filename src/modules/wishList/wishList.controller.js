import { User } from "../../../database/models/user.js";
import {  WishList } from "../../../database/models/wishList.js";
import { AppError } from "../../middleware/appError.js";
import { catchError } from "../../middleware/catchError.js";





const addWishList = catchError(async(req,res,next)=>{
     /// add To WishList ...
    const wishList = new WishList({
        user : req.user._id,
        ...req.body
    });
    await wishList.save();
    res.status(201).json({message :"Success Add wishList" , wishList})
});


// const getAllWishList = catchError(async(req,res,next)=>{
//     // get All WishList
//     const wishLists = await WishList.find().populate('food','-_id')
//     wishLists || next(new AppError('WishLists Not Found',409));
//     !wishLists || res.status(201).json(({message :"Success To Get All WishList" , wishLists}))
// })

const getSpecificWishList = catchError(async(req,res,next)=>{
    // find wish List id....
    const wishList = await WishList.findById(req.params.id)

    // Delete WishList 
    if(wishList.user._id.toString() !== req.user._id.toString()){
        return next(new AppError(' You Are Not Authorize To Access Tis EndPoint',409))
    }
    const findWishList = await WishList.findById(req.params.id );
    wishList || next(new AppError('wishList Not Found',409));
    !wishList || res.status(201).json(({message :"Success To Get WishList" , findWishList}))
})

const updateWishList = catchError(async(req,res,next)=>{
    // update wish List....
    const user = await User.findById(req.body.user)

    console.log(user)
    if(user._id.toString() !== req.user._id.toString()){
        return next(new AppError(' You Are Not Authorize To Access Tis EndPoint',409))
    }
    const wishList = await WishList.findByIdAndUpdate(req.params.id ,{ ...req.body , user: req.user._id} , {new: true});
    wishList || next(new AppError('wishList Not Found',409));
    !wishList || res.status(201).json(({message :"Success updated WishList" , wishList}))
})

const deleteWishList = catchError(async(req,res,next)=>{
    // find wish List id....
    const wishList = await WishList.findById(req.params.id)

    // Delete WishList 
    if(wishList.user._id.toString() !== req.user._id.toString()){
        return next(new AppError(' You Are Not Authorize To Access Tis EndPoint',409))
    }
    const deletewishListt = await WishList.findByIdAndDelete(req.params.id );
    wishList || next(new AppError('wishList Not Found',409));
    !wishList || res.status(201).json(({message :"Success delete WishList" , deletewishListt}))
})

export{
    addWishList  , getSpecificWishList , updateWishList , deleteWishList
}