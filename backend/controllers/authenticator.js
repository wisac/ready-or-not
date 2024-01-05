import asyncWrapper from "../utils/asyncWrapper.js";
import login from "./auth/login.js";
import signup from "./auth/signup.js";
import protect from "./auth/protect.js";
import permitOnly from "./auth/permitOnly.js";
import forgotPassword from "./auth/forgotPassword.js";
import resetPassword from "./auth/resetPassword.js";
import changePassword from "./auth/changePassword.js";
import updateMe from "./auth/updateMe.js";

export default {
   signup: asyncWrapper(signup),
   login: asyncWrapper(login),
   protect: asyncWrapper(protect),
   permitOnly,
   forgotPassword: asyncWrapper(forgotPassword),
   resetPassword: asyncWrapper(resetPassword),
   changePassword: asyncWrapper(changePassword),
   updateMe: asyncWrapper(updateMe)
};
