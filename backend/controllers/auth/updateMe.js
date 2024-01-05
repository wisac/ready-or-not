import User from "../../models/users.js";
import CustomError from "../../utils/customError.js";
import filterObj from "../../utils/filterObj.js";
import formattedResponse from "../../utils/formattedResponse.js";

export default async (req, res, next) => {
   // 1. Prevent password update
   if (req.body.password || req.body.confirmPassword) {
      return next(
         new CustomError(
            400,
            "This route does not accept password update. Use '/api/v1/users/0/change-password' to update password"
         )
      );
   }
   // 2. Allow only relevant field updates (email, name, picture etc)
   const updatableFields = ["name", "email", "picture"];
   const newData = filterObj(req.body, updatableFields);

   // 3. update user
   const modifiedUser = await User.findByIdAndUpdate(req.user._id, newData, {
      runValidators: true,
   }).select("-password");
   
   // 4. send response
   res.status(200).json(formattedResponse("success",modifiedUser))
};