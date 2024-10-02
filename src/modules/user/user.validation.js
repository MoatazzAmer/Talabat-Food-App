import Joi from "joi";



const addUserVal = Joi.object({
    firstName : Joi.string().min(2).max(20).required(),
    lastName : Joi.string().min(2).max(20).required(),
    email : Joi.string().email().required(),
    mobileNumber : Joi.number().required(),
    password : Joi.string().pattern(/^[A-Z][a-z0-9A-z]{8,40}$/).required(),
    role : Joi.string().required()
});
const updateUSerVal = Joi.object({
    firstName : Joi.string().min(2).max(20).optional(),
    lastName : Joi.string().min(2).max(20).optional(),
    email : Joi.string().email().optional(),
    mobileNumber : Joi.number().optional()
})
export{
    addUserVal, updateUSerVal
}