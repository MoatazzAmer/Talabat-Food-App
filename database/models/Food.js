import { model, Schema, Types } from "mongoose";
const foodSchema = new Schema({
    foodName :{
        type:String,
        required : true
    },
    description : {
        type:String,
        required:true
    },
    images : [String],
    menuId :{
        type:Types.ObjectId,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    priceAfterDiscount : {
        type : Number,
        default : null
    },
    satatus :{
        type : String,
        required: true
    }
},{timestamps: true , versionKey : false})
foodSchema.post('find',function (docs){
    docs.forEach((doc)=>{
        if(doc.images) doc.images = doc.images.map(val => process.env.BASE_URL +'food/' + val)
    })
})
export const Food = model('Food' , foodSchema)
