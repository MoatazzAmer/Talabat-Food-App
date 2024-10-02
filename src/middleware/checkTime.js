import { Order } from "../../database/models/order.js";
import { AppError } from "./appError.js";
import { catchError } from "./catchError.js"

export const checkTime = (action)=>{
    return catchError(async(req,res,next)=>{
        
    const updateOrder = await Order.findOne( {user :req.user._id});

    // Get the current time
    const currentTime = new Date();
    // Convert createdAt to a Date object
    const createdTime = new Date(updateOrder.createdAt)
    // Calculate the difference in milliseconds
    const timeDifference = currentTime - createdTime;    
    // Convert the difference to minutes
    const differenceInMin = timeDifference / (1000 * 60);
    if(differenceInMin > 30){
        return next(new AppError(`The order cannot be ${action} as 30 minutes have passed since it was placed.`,403))
    }
    next()
    })
}