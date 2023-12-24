import CustomError from "../utils/customError.js";

const notFound = (req, res, next) => {
   next(new CustomError(404, `The requested route ${req.originalUrl} does not exist`));
};

export default notFound;
