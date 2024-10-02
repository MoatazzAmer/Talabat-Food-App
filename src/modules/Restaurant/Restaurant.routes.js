import { Router } from "express";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import {addRestaurant,deleteRestauant,getAllReataurant,updateRestaurant,} from "./Restaurant.controller..js";
import { protectedRoutes, referTo } from "../auth/auth.controller.js";

const restaurantRouter = Router();

restaurantRouter.post("/",uploadSingleFile("imageCover", "restaurant"),addRestaurant);

restaurantRouter.get("/", getAllReataurant);
restaurantRouter.put("/:id",uploadSingleFile("imageCover", "restaurant"),updateRestaurant);
restaurantRouter.delete("/:id", deleteRestauant);

export default restaurantRouter;
