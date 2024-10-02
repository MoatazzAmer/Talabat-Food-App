import { Router } from "express";
import { protectedRoutes, referTo } from "../auth/auth.controller.js";
import { addWishList, deleteWishList, getSpecificWishList, updateWishList } from "./wishList.controller.js";




const wishListRouter = Router();
wishListRouter.use(protectedRoutes,referTo('admin','shop_HR','user'))
wishListRouter.route('/')
        .post( addWishList)
        // .get(getAllWishList)

wishListRouter.route('/:id')
        .get(getSpecificWishList)
        .put(updateWishList)
        .delete(deleteWishList)

export default wishListRouter