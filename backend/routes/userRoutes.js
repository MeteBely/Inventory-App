import express from "express";
import {
  getUserById,
  getUsers,
  updateUser,
  createSampleUser,
  authUser,
  logoutUser,
} from "../controllers/userController.js";
import { protect, adminOrIK, adminOrIM } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, adminOrIK, getUsers)
  .post(protect, adminOrIK, createSampleUser);

router.route("/login").post(authUser);

router.route("/logout").post(protect, logoutUser);

router
  .route("/:id")
  .get(protect, adminOrIK, getUserById)
  .put(protect, adminOrIK, updateUser);

export default router;
