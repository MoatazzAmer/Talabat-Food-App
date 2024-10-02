import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    firstName :{
        type:String,
        required:true
    },
    lastName :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    role :{
        type:String,
        enum:['user','admin','shop_HR'],
        default : 'user'
    },
    mobileNumber : Number,
    passwordChangedAt: Date
},{timestamps:true , versionKey : false});

userSchema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password , 10)
})

userSchema.pre('findOneAndUpdate',function(){
    if(this._update.password ) this._update.password = bcrypt.hashSync(this._update.password , 10)
})

export const User = model('User' , userSchema)