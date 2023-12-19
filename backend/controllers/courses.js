import Course from "../models/course.js";
import ApiFeatures from "../utils/apiFeatures.js";
import formattedResponse from "../utils/formattedResponse.js";

// get all questions
const getAllCourses = async (req, res, next) => {
   try {
      const queryString = { ...req.query };

      const features = new ApiFeatures(Course.find(), queryString)
      .filter()
      .sort()
         .limitFields()
         .paginate();
      const courses = await features.query;
      console.log(courses)

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
      const course = await Course.findByIdAndUpdate(courseID);

      if (!course) {
         throw Error(`No course exist with the course code: ${courseID}`);
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
         throw Error(`No course exist with the course ID: ${courseID}`);
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
         throw Error(`No course exist with the course ID ${courseID}`);
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
