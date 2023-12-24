import CustomError from "../utils/customError.js";
import formattedResponse from "../utils/formattedResponse.js";

const errorInDev = (error) => {
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

const errorInProd = (error) => {
   console.log(error)
   return {
      statusCode: error.statusCode,
      errors: {
         status: error.status,
         message: error.message,
      },
   };
};

const dupMessage = (err) => {
   const dupKeyValue = Object.entries(err.keyValue)[0];
   const collectionName = err.message
      .match(/collection: ([^. ]+\.[^. ]+)/)[1]
      .split(".")[1]
      .slice(0, -1);
   const message = `Duplicated value: ${dupKeyValue[1]}. A ${collectionName} with ${dupKeyValue[0]} ${dupKeyValue[1]} already exist. Please provide a new value`;
   return message;
};

const errorHandler = (err, req, res, next) => {
   err.status ||= "error";
   err.message ||= "Something went wrong";
   err.statusCode ||= 500;

   let errorResponse = err;

   // send error during development
   if (process.env.NODE_ENV === "development") {
      errorResponse = errorInDev(err);
   }
   // handle mongodb errors
   else {
      // invalid id errors
      if (err.name === "CastError") {
         errorResponse = errorInProd(
            new CustomError(400, `Invalid ${err.path}: ${err.value}`)
         );
      }
      //validation error
      else if (err.name === "ValidationError") {
         const message = Object.values(err.errors);
         errorResponse = errorInProd(new CustomError(400, `${message}`));
      }

      // duplication errors
      else if (err.code === 11000) {
         const message = dupMessage(err);

         errorResponse = errorInProd(new CustomError(400, message));
      } else {
         errorResponse = errorInProd(err);
      }
   }

   // send error
   res.status(errorResponse.statusCode).json(errorResponse.errors);
};

export default errorHandler;
