import CustomError from "../utils/customError.js";
import formattedResponse from "../utils/formattedResponse.js";

const errorInDev = (error) => {
   console.error(error);
   return {
      status: error.status,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
   };
};

const errorInProd = (error) => {
   // console.log(error)
   return {
      status: error.status,
      message: error.message,
      statusCode: error.statusCode,
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
   const error = structuredClone(err);
   error.status || "error";
   error.message || "Something went wrong";
   error.statusCode || 500;

   let errorResponse = err;
   // console.error(err)

   // send error during development
   if (process.env.NODE_ENV === "development") {
      errorResponse = errorInDev(error);
   }
   // handle mongodb errors
   else {
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
      }
   }

   // send error during production

   res.status(errorResponse.statusCode || 501).json(errorResponse);
};

export default errorHandler;
