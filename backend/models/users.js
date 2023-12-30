/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, "A user must have a name"],
      trim: true,
   },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: [
         true,
         "This email is already associated with an account. Please provide a new email or sign into your existing account.",
      ],
      trim: true,
      lowercase: true,
      validate: {
         validator: validator.isEmail,
         message: "Please provide a valid email",
      },
   },
   password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 6,
   },
   // confirmPassword: {
   //    type: String,
   //    required: true,
   //    validate: {
   //       // works for save and create only
   //       validator: function (field) {
   //          return this.password === field;
   //       },
   //       message: "Passwords do not match",
   //    },
   // },
   favouriteCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
   },
   passwordChangedAt: Date,
}, {
   timeStamps: true
});

// encrypt password
userSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
   }
   next()
})

const User = mongoose.model("User", userSchema);

export default User;
