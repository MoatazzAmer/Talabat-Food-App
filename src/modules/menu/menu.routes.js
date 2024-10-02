import { Router } from "express";
import { addMenu, deleteMenu, getAllMenu, getSpecificMenu, updateMenu } from "./menu.controller.js";
import { protectedRoutes, referTo } from "../auth/auth.controller.js";






const menuRouter = Router();

menuRouter.post('/',protectedRoutes , referTo('shop_HR') , addMenu)
menuRouter.get('/', getAllMenu)
menuRouter.route('/:id')
        .get(protectedRoutes , referTo('admin','user','shop_HR') , getSpecificMenu)
        .put(protectedRoutes , referTo('shop_HR') , updateMenu)
        .delete(protectedRoutes , referTo('shop_HR') , deleteMenu)
export default menuRouter;