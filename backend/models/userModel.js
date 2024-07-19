import mongoose from "mongoose";
import Unit from "./unitModel.js";
import GraduationStatus from "./graduationStatusModel.js";
import Position from "./positionModel.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
    },
    birthDate: {
      type: Date,
    },
    identificationNumber: {
      type: Number,
    },
    maritalStatus: {
      type: Boolean,
    },
    registrationNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    graduationStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GraduationStatus",
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
    },
    isWorking: {
      type: Boolean,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "IK", "IM"],
      default: "IM",
    },
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
