import mongoose from "mongoose";

const graduationStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const GraduationStatus = mongoose.model(
  "GraduationStatus",
  graduationStatusSchema
);

export default GraduationStatus;
