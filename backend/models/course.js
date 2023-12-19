import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
   {
      courseCode: {
         type: String,
         required: [true, "Course code is required"],
         trim: true,
         unique: true,
         uppercase: true,
         maxLength: [7, "A course code should be 7 characters long"],
         minLength: [7, "A course code should be 7 characters long"],
         match: [
            /^[A-Za-z]{4}[0-9]{3}$/,
            "Course code must begin with a 4 alphabets and 3 numbers",
         ],
         
      },
      title: {
         type: String,
         required: [true, "Course must have a title"],
         trim: true,
         maxLength: [40, "Course title cannot be more than 40 characters"],
      },
      level: {
         type: Number,
         enum: {
            values: [100, 200, 300, 400],
            message: "Course can belong to level 100, 200, 300 or 400",
         },
      },
      numQuestions: {
         type: Number,
         default: 0,
      },
   },
   {
      // toJSON: { virtuals: true },
      // toObject: { virtuals: true },
   }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
