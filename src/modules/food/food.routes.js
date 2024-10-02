import { Router } from "express";
import { protectedRoutes, referTo } from "../auth/auth.controller.js";
import { addFood, deleteFoods, getAllFoods, getSpecificFood, updateFood } from "./food.controller.js";
import {  uploadMixOfFiles } from "../../fileUpload/fileUpload.js";





const foodRouter = Router();

foodRouter.route('/')
    .post(protectedRoutes,referTo("shop_HR"),uploadMixOfFiles([{name: 'images' , maxCount : 4}] , 'food') , addFood)
    .get(getAllFoods)

foodRouter.route('/:id').get(getSpecificFood);
foodRouter.put('/:id' , protectedRoutes , referTo("shop_HR") , uploadMixOfFiles([{name:'images',maxCount:4}],'food' ), updateFood)
foodRouter.delete('/:id'  , deleteFoods)


export default foodRouter;