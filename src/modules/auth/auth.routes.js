import { Router } from "express";
import { checkEmailAndMobileExists } from "../../middleware/checkEmailExists.js";
import {  changePassword, signIn, signUp } from "./auth.controller.js";
import { changePasswordVal, signInVal, signUpVal } from "./auth.validation.js";
import { validate } from "../../middleware/validation.js";




const authRouter = Router();

authRouter.post('/signup',validate(signUpVal),checkEmailAndMobileExists,signUp);
authRouter.post('/signin',validate(signInVal),signIn);
authRouter.post('/change-password',validate(changePasswordVal),changePassword);


export default authRouter