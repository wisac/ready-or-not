import Course from "../models/courses.js";
import ApiFeatures from "../utils/apiFeatures.js";
import CustomError from "../utils/customError.js";
import formattedResponse from "../utils/formattedResponse.js";

// get all questions
const getAllCourses = async (req, res, next) => {
   try {
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

      res.status(200).json(formattedResponse("success", courses));
   } catch (error) {
      res.status(404).json(formattedResponse("error", error.message));
   }
};

// get one course
const getCourse = async (req, res, next) => {
   try {
      const { courseID } = req.params;
      console.log(courseID);
      const course = await Course.findByIdAndUpdate(courseID).populate(
         "numQuestions"
      );

      if (!course) {
         return next(
            new CustomError(404, `No course exist with ID ${courseID}`)
         );
      }

      res.status(200).json(formattedResponse("success", course));
   } catch (error) {
      res.status(404).json(formattedResponse("fail", error.message));
   }
};

// update course
const updateCourse = async (req, res, next) => {
   try {
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
            new CustomError(
               404,
               `No course exist with the course ID: ${courseID}`
            )
         );
      }

      res.status(200).json(formattedResponse("success", modifiedCourse));
   } catch (error) {
      res.status(404).json(formattedResponse("fail", error.message));
   }
};

// delete course
const deleteCourse = async (req, res, next) => {
   try {
      const { courseID } = req.params;
      console.log(courseID);
      const removedCourse = await Course.findByIdAndDelete(courseID);

      if (!removedCourse) {
         return next(
            CustomError(404, `No course exist with the course ID ${courseID}`)
         );
      }

      res.status(204).json(formattedResponse("success", removedCourse));
   } catch (error) {
      res.status(404).json(formattedResponse("fail", error.message));
   }
};

// create course
const createCourse = async (req, res, next) => {
   try {
      const newCourse = await Course.create(req.body);

      res.status(201).json(formattedResponse("success", newCourse));
   } catch (error) {
      res.status(404).json(formattedResponse("error", error.message));
   }
};

export default {
   getAllCourses,
   getCourse,
   updateCourse,
   deleteCourse,
   createCourse,
};
