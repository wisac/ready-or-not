import express from "express";
import controller from "../controllers/users.js";
import auth from "../controllers/auth.js";

const router = express.Router();

router.get("/", controller.getAllUsers);

router.post("/", auth.signup);

export default router
