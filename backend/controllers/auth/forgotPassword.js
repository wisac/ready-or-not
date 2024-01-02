/* eslint-disable consistent-return */
import crypto from "crypto";
import CustomError from "../../utils/customError.js";
import User from "../../models/users.js";
import Token from "../../models/tokens.js";

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
   const token = crypto.randomBytes(32).toString("hex");

   console.log(user)
   // 4. store token hash in db and with expiry time
   const newToken = await Token.create({
      name: "password reset token",
      userID: user._id,
      value: token,
      expiresAt: Date.now() + 5 * 60_000,
   });
   console.log(token)
   console.log(newToken);
   // 5. send token to email
   // 6. send response
};
