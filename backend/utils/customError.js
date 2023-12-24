class CustomError extends Error {
   constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.status = String(statusCode).startsWith("4") ? "fail" : "error";
      this.errorType = "operational"; // default error type
      Error.captureStackTrace(this, this.constructor); // set error stack to this object
   }
}
export default CustomError;
