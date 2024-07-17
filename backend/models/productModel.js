import mongoose from "mongoose";
import typeModel from "./typeModel.js";
import brandModel from "./brandModel.js";

const productSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Type",
    },
    dateOfEntry: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    model: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
