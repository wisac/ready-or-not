import crypto from "crypto";
import CustomError from "../../utils/customError.js";
import Token from "../../models/tokens.js";
import User from "../../models/users.js";
import sendEmail from "../../utils/sendEmail.js";

export default async (req, res, next) => {
   // 1. check if all token, passwords are present and they match
   const { password, confirmPassword } = req.body;
   if (!password || !confirmPassword) {
      return next(new CustomError(400, "Please provide new Password"));
   }
   if (password !== confirmPassword) {
      return next(new CustomError(400, "Passwords do not match"));
   }
   const { token } = req.params;
   if (!token) {
      return next(new CustomError(400, "Invalid url"));
   }
   // 2. hash token and find token with hash
   const hashedTokenValue = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
   console.log(hashedTokenValue);

   const resetToken = await Token.findOne({
      value: hashedTokenValue,
      expiresAt: { $gt: Date.now() },
   });
   if (!resetToken) {
      return next(new CustomError(404, "Token is invalid or has expired."));
   }
   console.log(resetToken);
   // 3. find user with token userID
   const user = await User.findById(resetToken.userID);
   if (!user) {
      return next(
         new CustomError(400, "User associated with this token does not exist")
      );
   }
   // 4. save new password

   user.password = password;
   await resetToken.deleteOne();
   const modifiedUser = await user.save();

   // 5. set password changed at
   console.log(modifiedUser);

   // 6. send response
   // sendEmail({
   //    from: "isaac@readyornot.com",
   //    to: user.email,
   //    subject: "Password Change Notification",
   //    text: `This is to confirm that the password for your account was successfully reset. The change was initiated at  on [Insert Date]. If you performed this action, you can disregard this message.`,
   // });
   // 7. send email notifying password change
};
