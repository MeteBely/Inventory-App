import mongoose from "mongoose";
import typeModel from "./typeModel.js";
import brandModel from "./brandModel.js";

const productSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
    },
    dateOfEntry: {
      type: Date,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    model: {
      type: String,
    },
    serialNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Depoda", "Ofiste", "Personelde"],
    },
    takeInf: [
      //Product'ı güncel ve daha önce kimlerin ne zaman vs. aldığı gibi bilgiler burada olacak.
      {
        userPersonel: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        takenProductDate: {
          type: Date,
        },
        submitterPersonal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        returnProductDate: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
