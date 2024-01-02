/* eslint-disable consistent-return */
import crypto from "crypto";
import CustomError from "../../utils/customError.js";
import User from "../../models/users.js";
import Token from "../../models/tokens.js";
import sendEmail from "../../utils/sendEmail.js";

export default async (req, res, next) => {
   // 1. check if email is available.
   const { email } = req.body;
   if (!email) {
      return next(new CustomError(400, "Please provide an email"));
   }
   // 2. find user based on given email
   const user = await User.findOne({ email });
   if (!user) {
      return next(
         new CustomError(
            400,
            "We could not find any user account associated with the given email."
         )
      );
   }

   // 3. generate token using crypto
   const tokenHex = crypto.randomBytes(32).toString("hex");

   console.log(user);
   // 4. store token hash in db and with expiry time
   const newToken = await Token.create({
      name: "password reset token",
      userID: user._id,
      value: tokenHex,
      expiresAt: Date.now() + 5 * 60_000,
   });
   console.log(tokenHex);
   console.log(newToken);

   // 5. send token to email
   const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
   )}/api/v1/users/0/reset-password/${tokenHex}`;

   const emailDetails = {
      from: "isaac@readyornot.com",
      to: user.email,
      subject: "Password reset token (Valid for 5 minutes)",
      text: `You can reset your password by visiting this url.\n${resetPasswordUrl}\nIf you did not initiate this process, please ignore this message.`,
   };

   try {
      await sendEmail(emailDetails);
   } catch (error) {
      await newToken.deleteOne();
      return next(
         new CustomError(
            500,
            "There was an error sending the email. Try again later."
         )
      );
   }
   // 6. send response
   res.status(200).json({
      status: "success",
      message: `A password reset link has been sent to ${user.email}`,
   });
};
