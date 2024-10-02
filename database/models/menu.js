import { model, Schema, Types } from "mongoose";




const menuSchema = new Schema({
    restaurant : {
        type:Types.ObjectId,
        required: true,
        ref:'Restaurant'
    },
    food:[{
        type:Types.ObjectId,
        required: true,
        ref:'Food'
    }]

},{timestamps: true , versionKey : false})


export const Menu = model('Menu' , menuSchema)