import formattedResponse from "../utils/formattedResponse.js";

const getAllQuestions = (req, res, next) => {
   try {
      formattedResponse.success.data.questions = [2, 3];
      res.status(200).json(formattedResponse.success);
   } catch (error) {
      formattedResponse.failure.message = error;
      res.status(404).json(formattedResponse.failure);
   }
};

const getQuestion = (req, res, next) => {
   try {
      formattedResponse.success.data = ["3433424"];
      res.status(200).json(formattedResponse.success);
   } catch (error) {
      formattedResponse.failure.message = error;
      res.status(404).json(formattedResponse.failure);
   }
};

const createQuestion = (req, res, next) => {
   try {
      formattedResponse.success.data = [1];
   } catch (error) {
      formattedResponse.failure.message = error;
      res.status(404).json(formattedResponse.failure);
   }
};

export default { getAllQuestions, getQuestion, createQuestion };
