import { Router } from "express";
import controller from "../controllers/courses.js";

const router = Router();

router
   .route("/:courseID")
   .get(controller.getCourse)
   .patch(controller.updateCourse)
   .delete(controller.deleteCourse);

router
   .route("/")
   .get(controller.getAllCourses)
   .post(controller.createCourse);
   


export default router;
