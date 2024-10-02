import { model, Schema, Types } from "mongoose";




const orderSchema = new Schema({
    restaurant :{
        type : Types.ObjectId,
        required : true,
        ref : 'Restaurant'
    },
    food :[{
        type : Types.ObjectId,
        required : true,
        ref : 'Food'
    }],
    user:{
        type : Types.ObjectId,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    totalPrice : Number
} , {timestamps : true , versionKey : false});


export const Order = model('Order' , orderSchema)