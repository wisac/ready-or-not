import express from "express";
import controller from "../controllers/users.js";
import authenticator from "../controllers/authenticator.js";

const router = express.Router();

router.get("/", controller.getAllUsers);
router.patch("/:id", controller.updateUser);

router.post("/signup", authenticator.signup);
router.post("/login", authenticator.login);
router.post("/0/forgot-password", authenticator.forgotPassword);
router.patch("/0/reset-password/:token", authenticator.resetPassword);
router.patch(
   "/0/change-Password",
   authenticator.protect,
   authenticator.changePassword
);
router.patch("/0/update-me",authenticator.protect,authenticator.updateMe)

export default router;
