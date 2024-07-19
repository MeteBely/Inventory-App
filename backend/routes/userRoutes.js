import express from "express";
import {
  getUserById,
  getUsers,
  updateUser,
  createSampleUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers).post(createSampleUser);
router.route("/:id").get(getUserById).put(updateUser);

export default router;
