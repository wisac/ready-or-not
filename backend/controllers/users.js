import User from "../models/users.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import formattedResponse from "../utils/formattedResponse.js";

const getAllUsers = asyncWrapper(async (req, res, next) => {
   const users = await User.find();
   res.status(200).json(formattedResponse("success", users));
});

export default {
   getAllUsers,
};
