/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import User from "../models/users.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

const signup = asyncWrapper(async (req, res, next) => {
   // 1. extract data
   const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
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

   // 3. 

   console.log("Passed");
   console.log(data)
});


export default {
   signup
}