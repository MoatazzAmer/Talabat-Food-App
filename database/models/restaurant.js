import { model, Schema, Types } from "mongoose";


const restaurantSchema = new Schema({
    nameRestaurant : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required : true
    },
    imageCover : String,
    user :{
        type: Types.ObjectId,
        required : true
    }
},{timeStamps : true , versionKey : false});


restaurantSchema.post('find' , function(docs){
    docs.forEach((doc)=>{
        if(doc.imageCover) doc.imageCover = process.env.BASE_URL+'restaurant/' + doc.imageCover;
    });
});


export const Restaurant = model('Restaurant' , restaurantSchema);
