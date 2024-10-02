import { AppError } from "./appError.js";

export const validate = (schema) => {
    return (req, res, next) => {

        const validationData = req.file ? { image: req.file, ...req.body, ...req.params, ...req.query } : { ...req.body, ...req.params, ...req.query };

    const { error } = schema.validate(validationData, { abortEarly: false });
    if (!error) {
        next();
    } else {
        let errMsg = error.details.map(err => err.message);
        next(new AppError(errMsg, 401));
    }
    };
};