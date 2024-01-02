/* eslint-disable consistent-return */
import CustomError from "../../utils/customError.js";
import User from "../../models/users.js";

export default async (req, res, next) => {
   // 1. check if email is available.
   const { email } = req.body;
   if (!email) {
      return next(new CustomError(400, "Please provide an email"));
   }
   // 2. find user based on given email
   const user = await User.findOne();
   // 3. generate token using crypto
   // 4. store token hash in db and with expiry time
   // 5. send token to email
   // 6. send response
};
