import { Router } from "express";
import { protectedRoutes, referTo } from "../auth/auth.controller.js";
import { addOrder, deleteOrder, getAllOrder, getSpecificOrder, updatedOrder } from "./order.controller.js";
import { checkTime } from "../../middleware/checkTime.js";





const orderRouter = Router();

orderRouter.post('/' ,protectedRoutes , referTo('admin','shop_HR','user'), addOrder);
orderRouter.get('/' , getAllOrder);
// orderRouter.get('/' ,protectedRoutes , referTo('shop_HR'), getAllOrder);
orderRouter.get('/:id' ,protectedRoutes , referTo('shop_HR'), getSpecificOrder);
orderRouter.put('/' ,protectedRoutes , referTo('admin','shop_HR','user'), checkTime('update'),updatedOrder);
orderRouter.delete('/' , protectedRoutes , referTo('admin','shop_HR','user'),checkTime('Delete'), deleteOrder);

export default orderRouter