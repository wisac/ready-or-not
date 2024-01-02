/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import User from "../../models/users.js";
import { JWTGenerator } from "../../utils/JWTService.js";
import CustomError from "../../utils/customError.js";

export default async (req, res, next) => {
   // 1. extract data
   const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
      passwordMatched: function () {
         return this.password === this.confirmPassword;
      },
   };

   // 2. check if passwords are matching
   if (!data.passwordMatched()) {
      return next(
         new CustomError(
            400,
            "Passwords do not match. Please provide matching passwords."
         )
      );
   }

   // 3. save data
   const newUser = await User.create(data);

   // 4. generate data
   const token = JWTGenerator(newUser._id);

   console.log(newUser);
   res.status(201).json({
      status: "success",
      token,
   });
};
