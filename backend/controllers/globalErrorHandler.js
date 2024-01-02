/* eslint-disable no-param-reassign */
import findErrorSource from "../utils/appErrorSource.js";

const developmentErrorFormatter = (error) => {
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

const productionErrorFormatter = (error) => {
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
      errorResponse = developmentErrorFormatter(err);
   } else {
      const error = findErrorSource(err);
      errorResponse = productionErrorFormatter(error);
   }

   // send error
   res.status(errorResponse.statusCode).json(errorResponse.errors);
};

export default globalErrorHandler;
