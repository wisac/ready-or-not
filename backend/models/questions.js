import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema(
   {
      course: {
         type: Schema.Types.ObjectId,
         ref: "Course",
         require: true,
      },
      question: {
         type: String,
         required: true,
      },
      options: {
         type: [String],
         require: [true, "A question must have options"],
      },
      answer: {
         type: String,
         require: [true, "An question must have an answer"],
         trim: true,
      },
      year: {
         type: Number
      }
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: {
         virtuals: true,
      },
   }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
