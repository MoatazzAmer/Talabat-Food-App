import { model, Schema, Types } from "mongoose";




const wishListSchema = new Schema({
    user:{
        type : Types.ObjectId,
        required: true
    },
    food :[{
        type : Types.ObjectId,
        required : true,
        ref: 'Food'
    }]
},{
    timestamps :true , versionKey : false
});


export const WishList = model('WishList',wishListSchema)