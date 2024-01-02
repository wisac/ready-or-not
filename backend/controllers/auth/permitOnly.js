/* eslint-disable consistent-return */
/* eslint-disable func-names */
import CustomError from "../../utils/customError.js";

export default function (req, res, next) {
   if (!this.includes(req.user.role)) {
      return next(
         new CustomError(
            401,
            "You do not have permission to perform this action"
         )
      );
   }
   next();
}

