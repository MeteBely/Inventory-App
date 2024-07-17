import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["M", "F"],
    },
    birthDate: {
      type: Date,
      required: true,
    },
    identificationNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    maritalStatus: {
      type: Boolean,
      required: true,
    },
    registrationNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    graduationStatus: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "GraduationStatus",
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Unit",
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Position",
    },
    isWorking: {
      type: Boolean,
      required: true,
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
