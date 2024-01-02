import { Router } from "express";
import controller from "../controllers/courses.js";
import authenticator from "../controllers/authenticator.js";

const router = Router();

router
   .route("/:courseID")
   .get(controller.getCourse)
   .patch(controller.updateCourse)
   .delete(
      authenticator.protect,
      authenticator.permitOnly.bind(["admin"]),
      controller.deleteCourse
   );

router
   .route("/")
   .get(
      authenticator.protect,
      authenticator.permitOnly.bind(["admin"]),
      controller.getAllCourses
   )
   .post(
      authenticator.protect,
      authenticator.permitOnly.bind(["admin"]),
      controller.createCourse
   );

export default router;
