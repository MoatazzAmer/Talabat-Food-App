import authRouter from "./modules/auth/auth.routes.js"
import foodRouter from "./modules/food/food.routes.js"
import menuRouter from "./modules/menu/menu.routes.js"
import orderRouter from "./modules/order/order.routes.js"
import restaurantRouter from "./modules/Restaurant/Restaurant.routes.js"
import userRouter from "./modules/user/user.routes.js"
import wishListRouter from "./modules/wishList/wishList.routes.js"




export const bootStrap = (app)=>{

    app.use('/auth' , authRouter);
    app.use('/user' , userRouter);
    app.use('/restaurant' , restaurantRouter);
    app.use('/food', foodRouter);
    app.use('/menu' , menuRouter);
    app.use('/order' , orderRouter);
    app.use('/wishlist' , wishListRouter)
}