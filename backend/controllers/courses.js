const getAllCourses = (req, res, next) => {
   res.json({ courses: ["allCourses"] });
};

const getCourse = (req, res, next) => {
   res.json({ courses: ["one course"] });
};

const updateCourse = (req, res, next) => {
   res.json({ courses: ["updated"] });
};

const deleteCourse = (req, res, next) => {
   res.json({ courses: ["del"] });
};

const createCourse = (req, res, next) => {
   res.json({ courses: ["created"] });
};

export default {
   getAllCourses,
   getCourse,
   updateCourse,
   deleteCourse,
   createCourse,
};
