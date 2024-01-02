/* eslint-disable consistent-return */
import bcrypt from "bcrypt";
import User from "../../models/users.js";
import { JWTGenerator } from "../../utils/JWTService.js";
import CustomError from "../../utils/customError.js";

export default async (req, res, next) => {
   // 1. check if email and password exist on req.
   const { email, password } = req.body;
   if (!email || !password) {
      return next(new CustomError(400, "Please provide email and password"));
   }

   const user = await User.findOne({ email }).select("+password");
   if (!user) {
      return next(new CustomError(400, "Wrong email or password"));
   }

   const correctPassword = await bcrypt.compare(password, user.password);

   if (!correctPassword) {
      return next(new CustomError(400, "Wrong email or password"));
   }

   // 2. sign token
   const token = JWTGenerator(user._id);

   // 3. send token
   res.status(200).json({
      status: "success",
      token,
   });
};
