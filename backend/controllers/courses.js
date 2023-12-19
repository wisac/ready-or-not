import Course from "../models/course.js";
import formattedResponse from "../utils/formattedResponse.js";

// get all questions
const getAllCourses = async (req, res, next) => {
   try {
      const courses = await Course.find();

      res.status(200).json(formattedResponse("success", courses));
   } catch (error) {
      res.status(404).json(formattedResponse("error", error));
   }
};

const getCourse = async (req, res, next) => {
   try {
      const { courseCode } = req.params;
      console.log(courseCode);
      const course = await Course.findOne({ courseCode });

      if (!course) throw Error(`No course exist with the course code: ${courseCode}`);

      res.status(200).json(formattedResponse("success", course));
   } catch (error) {
      res.status(404).json(formattedResponse("fail", error.message));
   }
};

const updateCourse = (req, res, next) => {
   res.json({ courses: ["updated"] });
};

const deleteCourse = (req, res, next) => {
   res.json({ courses: ["del"] });
};

const createCourse = async (req, res, next) => {
   try {
      const newCourse = await Course.create(req.body);

      res.status(200).json(formattedResponse("success", newCourse));
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
