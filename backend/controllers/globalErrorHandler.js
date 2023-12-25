/* eslint-disable no-param-reassign */
import dbErrorHandler from "../utils/dbErrors.js";

const developmentError = (error) => {
   console.error(error);
   return {
      statusCode: error.statusCode,
      errors: {
         status: error.status,
         message: error.message,
         stack: error.stack,
      },
   };
};

const productionError = (error) => {
   console.log(error);
   return {
      statusCode: error.statusCode,
      errors: {
         status: error.status,
         message: error.message,
      },
   };
};

const globalErrorHandler = (err, req, res, next) => {
   err.status ||= "error";
   err.message ||= "Something went wrong";
   err.statusCode ||= 500;

   let errorResponse = err;

   // send error during development
   if (process.env.NODE_ENV === "development") {
      errorResponse = developmentError(err);
   } else {
      const error = dbErrorHandler(err);
      errorResponse = productionError(error);
   }

   // send error
   res.status(errorResponse.statusCode).json(errorResponse.errors);
};

export default globalErrorHandler;
