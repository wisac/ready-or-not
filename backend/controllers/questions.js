import Question from "../models/questions.js";
import ApiFeatures from "../utils/apiFeatures.js";
import formattedResponse from "../utils/formattedResponse.js";

const getAllQuestions = async (req, res, next) => {
   console.log("IN ALL");
   try {
      const queryString = req.query;
      
      const features = new ApiFeatures(
         Question.find(),
         queryString
      ).limitFields();
      const questions = await features.query;
    
      res.status(200).json(formattedResponse("success", questions));
      
   } catch (error) {
      res.status(404).json(formattedResponse("fail", error.message));
   }
};

const updateQuestion = async (req, res, next) => {
   try {
      const { questionID } = req.params;
      const modifiedQuestion = await Question.findByIdAndUpdate(questionID);

      if (!modifiedQuestion) {
         throw Error(`No question found with the ID ${questionID}`);
      }
      res.status(200).json(formattedResponse("success", modifiedQuestion));
   } catch (error) {
      res.status(404).json(formattedResponse("fail", error.message));
   }
};

const getQuestion = (req, res, next) => {
   console.log("IN ONE");
   try {
      res.status(200).json(formattedResponse("success", [1]));
   } catch (error) {
      res.status(404).json(formattedResponse("fail", "Something bad happened"));
   }
};

const createQuestion = async (req, res, next) => {
   try {
      const newQuestion = await Question.create(req.body);

      res.status(201).json(formattedResponse("success", newQuestion));
   } catch (error) {
      res.status(404).json(formattedResponse("fail", error.message));
   }
};

export default { getAllQuestions, getQuestion, createQuestion, updateQuestion };
