/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import bcrypt from "bcrypt";
import User from "../models/users.js";
import { JWTGenerator, JWTVerifier } from "../utils/JWTService.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

const signup = asyncWrapper(async (req, res, next) => {
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
});

const login = asyncWrapper(async (req, res, next) => {
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
});

const protect = asyncWrapper(async (req, res, next) => {
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
         new CustomError(401, "You were automatically signed out. Please sign in again.")
      );
   }

   // 5.
   req.user = user;
   next();
});

const restrictedTo = (req, res, next) => {
   
}

export default { signup, login, protect };
