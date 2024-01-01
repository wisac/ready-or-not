import { Router } from "express";
import controller from "../controllers/courses.js";
import auth from "../controllers/auth.js";

const router = Router();

router
   .route("/:courseID")
   .get(controller.getCourse)
   .patch(controller.updateCourse)
   .delete(
      auth.protect,
      auth.restrictedTo.bind(["admin"]),
      controller.deleteCourse
   );

router
   .route("/")
   .get(auth.protect, controller.getAllCourses)
   .post(
      auth.protect,
      auth.restrictedTo.bind(["admin"]),
      controller.createCourse
   );

export default router;
