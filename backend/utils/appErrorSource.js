/* eslint-disable arrow-body-style */
import CustomError from "./customError.js";

const dbDuplicateError = (err) => {
   const dupKeyValue = Object.entries(err.keyValue)[0];
   const collectionName = err.message
      .match(/collection: ([^. ]+\.[^. ]+)/)[1]
      .split(".")[1]
      .slice(0, -1);
   const message = `Duplicated value: ${dupKeyValue[1]}. A ${collectionName} with ${dupKeyValue[0]} ${dupKeyValue[1]} already exist. Please provide a new value`;
   return new CustomError(400, message);
};

const dbCastError = (err) => {
   const field = err.path;
   const { value } = err;
   return new CustomError(400, `Invalid ${field}: ${value}`);
};

const dbValidationError = (err) => {
   const errorMessages = Object.values(err.errors);
   return new CustomError(400, `${errorMessages}`);
};

// jwt errors
const JsonWebTokenError = () => {
   return new CustomError(
      400,
      "Token is invalid or has expired. Please login again"
   );
};

const tokenExpiredError = () => {
   return new CustomError(400, "Token has expired. Please login again.");
};

const appErrorSource = (err) => {
   let error = err;
   if (err.name === "CastError") {
      error = dbCastError(err);
   } else if (err.name === "ValidationError") {
      error = dbValidationError(err);
   } else if (err.code === 11000) {
      error = dbDuplicateError(err);
   } else if (error.name === "JsonWebTokenError") {
      error = JsonWebTokenError();
   } else if (err.name === "TokenExpiredError") {
      error = tokenExpiredError();
   }
   return error;
};

export default appErrorSource;
