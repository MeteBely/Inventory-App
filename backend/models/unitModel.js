import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;
