import User from "../../models/users.js";
import CustomError from "../../utils/customError.js";
import { JWTVerifier } from "../../utils/JWTService.js";

export default async (req, res, next) => {
   // 1. check if user is logged in
   // if (
   //    // eslint-disable-next-line operator-linebreak
   //    !req.headers.authorization ||
   //    !req.headers.authorization.startsWith("Bearer")
   // ) {
   //    return next(new CustomError("You are not logged in. Please login"));
   // }

   // // 1.b check if token is valid
   // const token = req.headers.authorization.split(" ")[1];
   // const decoded = JWTVerifier(token);

   // 2. check if old password is valid
   const { oldPassword, newPassword, confirmNewPassword } = req.body;
   if (!oldPassword || !newPassword || !confirmNewPassword) {
      return next(
         new CustomError(
            400,
            "Please provide old password and new Password and confirm new Password"
         )
      );
   }

   // 3. check if new passwords match
   if (newPassword !== confirmNewPassword) {
      return next(new CustomError(400, "Passwords do not match"));
   }
   // 4. check if old password is not equal new password
   if (await req.user.isOldPasswordSameAsNew(newPassword)) {
      return next(
         new CustomError(
            400,
            "New password must be different from the old password. Please choose a new and unique password."
         )
      );
   }
   console.log("OLD PASS:",req.user.password)
   // 5. update password
   req.user.password = newPassword;
   await req.user.save();
   // 6. update passwordChangedAt
   console.log("UPDATED PASSWORD:", req.user.password)
   console.log(req.user)
   // 7. send response with token
};
