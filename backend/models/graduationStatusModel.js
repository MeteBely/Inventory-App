import mongoose from "mongoose";

const graduationStatusSchema = new mongoose.Schema(
  {
    graduationStatus: {
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