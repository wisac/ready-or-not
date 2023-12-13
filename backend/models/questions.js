import mongoose, { Schema } from "mongoose";

const questionsSchema = new mongoose.Schema({
   courseID: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      require: true,
   },
   quesiton: {
      type: String,
      required: true,
      options: [String],
   },
});
