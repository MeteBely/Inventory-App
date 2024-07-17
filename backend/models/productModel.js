import mongoose from "mongoose";

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
          required: true,
        },
        submitterPersonal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        returnProductDate: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
