import mongoose from "mongoose";




export const dbConn = mongoose.connect('mongodb+srv://nodeJs:Moataz123@build-db.fxgcs4l.mongodb.net/Talabat-Food-App').then(()=>{
    console.log('Database Connected Successfuly ..');
    
}).catch(()=>{
    console.log('Error Occure When Connect Database');
    
})