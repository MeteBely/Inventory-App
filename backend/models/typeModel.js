import mongoose from "mongoose";

const typeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Type = mongoose.model("Type", typeSchema);

export default Type;
