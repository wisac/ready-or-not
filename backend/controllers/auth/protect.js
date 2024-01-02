/* eslint-disable consistent-return */
import User from "../../models/users.js";
import { JWTVerifier } from "../../utils/JWTService.js";
import CustomError from "../../utils/customError.js";

export default async (req, res, next) => {
   // 1. check if token is available
   if (
      !req.headers.authorization
      || !req.headers.authorization.startsWith("Bearer")
   ) {
      return next(
         new CustomError(401, "You are not signed in. Please sign in")
      );
   }
   const token = req.headers.authorization.split(" ")[1];
   console.log(token);

   // 2. check if token is valid
   const decoded = JWTVerifier(token);

   console.log(decoded);

   // 3. find user with decoded id
   const user = await User.findById(decoded.id);
   console.log(user);
   if (!user) {
      return next(
         new CustomError(
            401,
            "Token is invalid or has expired. Please sign in again"
         )
      );
   }

   // 4. check if user has changed password after token signing
   if (user.changedPasswordAfterTokenIssued(decoded.iat)) {
      return next(
         new CustomError(
            401,
            "You were automatically signed out. Please sign in again."
         )
      );
   }

   // 5.
   req.user = user;
   next();
};
