import formattedResponse from "../utils/formattedResponse.js";

const errorHandler = (err, req, res, next) => {
   res.status(err.statusCode || 501).json({
      testing: err.message,
      status: err.status,
      stack: err.stack
   });
};

export default errorHandler