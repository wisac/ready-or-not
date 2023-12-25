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

const dbErrorHandler = (err) => {
   let error = err;
   if (err.name === "CastError") {
      error = dbCastError(err);
   } else if (err.name === "ValidationError") {
      error = dbValidationError(err);
   } else if (err.code === 11000) {
      error = dbDuplicateError(err);
   }
   return error;
};

export default dbErrorHandler