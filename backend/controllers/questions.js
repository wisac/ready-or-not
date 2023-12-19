import formattedResponse from "../utils/formattedResponse.js";

const getAllQuestions = (req, res, next) => {
   console.log("IN ALL");
   try {
      const result = formattedResponse("success", [1234, 1234]);
      res.status(200).json(result);
   } catch (error) {
      
      res.status(404).json(formattedResponse("fail",error.message));
   }
};


const getQuestion = (req, res, next) => {
   console.log("IN ONE");
   try {
     
      res.status(200).json(formattedResponse("success",[1]));
   } catch (error) {
      res.status(404).json(formattedResponse("fail","Something bad happened"));
   }
};

// const createQuestion = (req, res, next) => {
//    try {
//       formattedResponse.success.data = [1];
//    } catch (error) {
//       formattedResponse.failure.message = error;
//       res.status(404).json(formattedResponse.failure);
//    }
// };

export default { getAllQuestions /*getQuestion, createQuestion */ };
