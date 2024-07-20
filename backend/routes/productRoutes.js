import express from "express";
import Product from "../models/productModel.js";
import {
  getProductById,
  getProducts,
  updateProduct,
  createSampleProduct,
  updateProductAndUser,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(createSampleProduct);
router.route("/userDebits").put(updateProductAndUser);
router.route("/:id").get(getProductById).put(updateProduct);

export default router;
