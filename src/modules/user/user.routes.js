import { Router } from "express";
import { addUser, deleteUser, getAllUser, getSpecificUser, UpdateUser } from "./user.controller.js";
import { protectedRoutes, referTo } from "../auth/auth.controller.js";
import { checkEmailAndMobileExists } from "../../middleware/checkEmailExists.js";
import { validate } from "../../middleware/validation.js";
import { addUserVal, updateUSerVal } from "./user.validation.js";




const userRouter = Router();
userRouter.route('/')
    .post(protectedRoutes , referTo('admin'),validate(addUserVal),checkEmailAndMobileExists ,addUser)
    .get(protectedRoutes , referTo('user','shop_HR'),getSpecificUser)

userRouter.put('/update' , protectedRoutes , referTo("user","shop_HR"),validate(updateUSerVal) , checkEmailAndMobileExists,UpdateUser)
userRouter.get('/users',getAllUser)
userRouter.delete('/:id' , protectedRoutes , referTo('admin'),deleteUser)

export default userRouter ;