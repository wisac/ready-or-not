/* eslint-disable consistent-return */
import Question from "../models/questions.js";
import ApiFeatures from "../utils/apiFeatures.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import formattedResponse from "../utils/formattedResponse.js";

import { courseExist } from "./courses.js";

// get all questions
const getAllQuestions = asyncWrapper(async (req, res, next) => {
   console.log("IN ALL");

   const queryString = req.query;

   const features = new ApiFeatures(
      Question.find().populate("course", "courseCode title "),
      queryString
   )
      .sort()
      .filter()
      .limitFields()
      .paginate();
   const questions = await features.query;

   res.status(200).json(formattedResponse("success", questions));
});

// update existing question

const updateQuestion = asyncWrapper(async (req, res, next) => {
   const { questionID } = req.params;
   const newData = req.body;
   const courseID = newData.course;

   // only accept question which has existing course
   if (courseID) {
      const course = await courseExist(courseID);
      if (!course) {
         return next(
            new CustomError(400, `No course exist with the ID :${courseID}`)
         );
      }
   }

   const modifiedQuestion = await Question.findByIdAndUpdate(
      questionID,
      newData,
      {
         runValidators: true,
      }
   );

   if (!modifiedQuestion) {
      return next(
         new CustomError(404, `No question found with the ID ${questionID}`)
      );
   }
   res.status(200).json(formattedResponse("success", modifiedQuestion));
});

// get one question
const getQuestion = asyncWrapper(async (req, res, next) => {
   const { questionID } = req.params;

   const question = await Question.findById(questionID);
   console.log("IN ONE");
   if (!question) {
      return next(
         new CustomError(404, `No question found with the ID ${questionID}`)
      );
   }

   res.status(200).json(formattedResponse("success", question));
});

// create new question
const createQuestion = asyncWrapper(async (req, res, next) => {
   const newQuestion = await Question.create(req.body);
  

   res.status(201).json(formattedResponse("success", newQuestion));
});

// delete question
const deleteQuestion = asyncWrapper(async (req, res, next) => {
   const { questionID } = req.params;
   const removedQuestion = await Question.findByIdAndDelete(questionID);
   if (!removedQuestion) {
      return next(
         new CustomError(404, `No question found with the ID ${questionID}`)
      );
   }
   res.status(204).json(formattedResponse("success", removedQuestion));
});

// suggest correction
const suggestCorrection = asyncWrapper(async (req, res, next) => {
   const { questionID } = req.params;
   const newSuggestion = req.body;

   const question = await Question.findById(questionID);
   question.suggestedCorrections.push(newSuggestion);
   const modifiedQuestion = await question.save();

   res.status(200).json(formattedResponse("success", modifiedQuestion));
});

export default {
   getAllQuestions,
   getQuestion,
   createQuestion,
   updateQuestion,
   deleteQuestion,
   suggestCorrection,
};
