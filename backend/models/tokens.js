/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const tokenSchema = mongoose.Schema({
   name: { type: String, default: "password reset token" },
   userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   value: {
      type: String,
      required: true,
   },
   expiresAt: {
      type: Date,
      required: true,
   },
});

tokenSchema.pre("save", function (next) {
   this.value = crypto.createHash("sha256").update(this.value).digest("hex");
   next();
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
