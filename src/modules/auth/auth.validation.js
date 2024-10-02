import Joi from "joi";



const signUpVal = Joi.object({
    firstName : Joi.string().min(2).max(20).required(),
    lastName : Joi.string().min(2).max(20).required(),
    email : Joi.string().email().required(),
    mobileNumber : Joi.number().required(),
    password : Joi.string().pattern(/^[A-Z][a-z0-9A-z]{8,40}$/).required(),
    role : Joi.string().required()
});

const signInVal = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().pattern(/^[A-Z][a-z0-9A-z]{8,40}$/).required()
});

const changePasswordVal = Joi.object({
    oldPassword : Joi.string().pattern(/^[A-Z][a-z0-9A-z]{8,40}$/).required(),
    newPassword : Joi.string().pattern(/^[A-Z][a-z0-9A-z]{8,40}$/).required()
});

export{
    signUpVal , signInVal , changePasswordVal
}