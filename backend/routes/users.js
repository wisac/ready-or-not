import express from "express";
import controller from "../controllers/users.js";
import auth from "../controllers/auth.js";

const router = express.Router();

router.get("/", controller.getAllUsers);

router.post("/signup", auth.signup);
router.post("/login", auth.login);

export default router
