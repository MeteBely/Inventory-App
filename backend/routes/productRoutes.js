import express from "express";
import Product from "../models/productModel.js";
import {
  getProductById,
  getProducts,
  updateProduct,
  createSampleProduct,
  updateProductAndUser,
} from "../controllers/productController.js";
import { adminOrIK, adminOrIM, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getProducts)
  .post(protect, adminOrIM, createSampleProduct);
router.route("/userDebits").put(protect, adminOrIK, updateProductAndUser);
router
  .route("/:id")
  .get(protect, getProductById)
  .put(protect, adminOrIM, updateProduct);

export default router;
