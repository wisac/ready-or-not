/* eslint-disable consistent-return */
import CustomError from "../../utils/customError.js";
import { JWTGenerator } from "../../utils/JWTService.js";

export default async (req, res, next) => {
   // 1. check if required data is given
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

   // 2. check if old password is correct
   if (!(await req.user.correctPassword(oldPassword))) {
      return next(new CustomError(401, "Your current password is wrong."));
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

   // 5. update password and passwordChangedAt
   req.user.password = newPassword;
   await req.user.save();

   // 6. keep user signed in: MAY REMOVE IT LATER FOR SECURITY REASONS
   const token = JWTGenerator(req.user._id);
   // 7. send response with token
   res.status(200).json({
      status: "success",
      token,
   });
};
