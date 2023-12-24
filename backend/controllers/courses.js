import Course from "../models/courses.js";
import ApiFeatures from "../utils/apiFeatures.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import formattedResponse from "../utils/formattedResponse.js";

// get all questions
const getAllCourses = asyncWrapper(async (req, res, next) => {
   const queryString = { ...req.query };

   // build query
   const features = new ApiFeatures(
      Course.find().populate("numQuestions"),
      queryString
   )
      .filter()
      .sort()
      .limitFields()
      .paginate();

   // execute query
   const courses = await features.query;

   console.log("HERE");
   res.status(200).json(formattedResponse("success", courses));
});

// get one course
const getCourses = async (req, res, next) => {
   const { courseID } = req.params;
   console.log(courseID);
   const course = await Course.findByIdAndUpdate(courseID).populate(
      "numQuestions"
   );

   if (!course) {
      return next(new CustomError(404, `No course exist with ID ${courseID}`));
   }
   res.status(200).json(formattedResponse("success", course));
};

const getCourse = asyncWrapper(getCourses);

// update course
const updateCourse = asyncWrapper(async (req, res, next) => {
   const { courseID } = req.params;
   const courseUpdates = req.body;

   console.log(req.params);
   console.log(courseID, courseUpdates);
   const modifiedCourse = await Course.findByIdAndUpdate(
      courseID,
      courseUpdates,
      {
         new: true,
         runValidators: true,
      }
   );
   if (!modifiedCourse) {
      return next(
         new CustomError(404, `No course exist with the course ID: ${courseID}`)
      );
   }

   res.status(200).json(formattedResponse("success", modifiedCourse));
});

// delete course
const deleteCourse = asyncWrapper(async (req, res, next) => {
   const { courseID } = req.params;
   console.log(courseID);
   const removedCourse = await Course.findByIdAndDelete(courseID);

   if (!removedCourse) {
      return next(
         CustomError(404, `No course exist with the course ID ${courseID}`)
      );
   }

   res.status(204).json(formattedResponse("success", removedCourse));
});

const createCourse = asyncWrapper(async (req, res, next) => {
   const newCourse = await Course.create(req.body);

   res.status(201).json(formattedResponse("success", newCourse));
});

export default {
   getAllCourses,
   getCourse,
   updateCourse,
   deleteCourse,
   createCourse,
};
