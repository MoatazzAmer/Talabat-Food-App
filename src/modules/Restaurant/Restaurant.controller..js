import { Restaurant } from "../../../database/models/restaurant.js";
import { AppError } from "../../middleware/appError.js";
import { catchError } from "../../middleware/catchError.js";
import fs from "fs";
import path from "path";
import { ApiFeature } from "../../utils/apiFeature.js";

const addRestaurant = catchError(async (req, res, next) => {
  // add new Restaurant ...
    req.body.imageCover = req.file.filename;

    
    const restaurant = new Restaurant({
      // user : req.user._id,
      ...req.body
    });
    await restaurant.save();
    res.status(201).json({ message: "Success Add New Restaurant", restaurant });
});

const getAllReataurant = catchError(async (req, res, next) => {
  
  let apiFeature = new ApiFeature(Restaurant.find() , req.query)
  .pagination().filter().sort().fields().search();

  let restauant = await apiFeature.mongooseQuery;

  let totslRestauant = await Restaurant.countDocuments();
  res.status(201).json({message : "Success To Get All Restauant .." , totslRestauant , page : apiFeature.pageNumber , restauant})
});

// update restaurant
const updateRestaurant = catchError(async (req, res, next) => {
  // confirm there is no old photo
  let destination = path.resolve("uploads/restaurant");
  let file = fs.readdirSync(destination);

  const oldPhoto = await Restaurant.findById(req.params.id);
  if(req.file)
  if (file.includes(oldPhoto.imageCover)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/restaurant/${oldPhoto.imageCover}`);

    // remove old image
    fs.unlinkSync(imagePath);
    }

  // set the images
    if(req.file) req.body.image = req.file.filename;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
    }
    );
  res
    .status(200)
    .json({ message: "Restaurant updated successfully", updatedRestaurant });
});

const deleteRestauant = catchError(async (req, res, next) => {
  // confirm there is no old photo
  let destination = path.resolve("uploads/restaurant");
  let file = fs.readdirSync(destination);

  const oldPhoto = await Restaurant.findById(req.params.id);
  if (file.includes(oldPhoto.imageCover)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/restaurant/${oldPhoto.imageCover}`);

    // remove old image
    fs.unlinkSync(imagePath);
    }


  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: "Success Deleted Itme", restaurant });
});
export { addRestaurant, getAllReataurant, updateRestaurant, deleteRestauant };
