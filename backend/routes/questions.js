import express from "express";
import controller from "../controllers/questions.js";

const router = express.Router();

router
   .route("/")
   .get(controller.getAllQuestions)
   .post(controller.createQuestion);

router
   .route("/:questionID")
   .get(controller.getQuestion)
   .patch(controller.updateQuestion)
   .delete(controller.deleteQuestion);

   router.patch("/corrections/:questionID",controller.suggestCorrection)

export default router;
