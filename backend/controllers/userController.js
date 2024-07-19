import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

const findOrCreate = async (Model, name) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    }

    let item = await Model.findOne({ name });

    if (!item) {
      item = new Model({ name });
      await item.save();
    }
    return item._id;
  } catch (error) {
    console.error("Error in findOrCreate: ", error);
    throw new Error("Error in findOrCreate");
  }
};

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate([
    { path: "unit", select: "name" },
    { path: "position", select: "name" },
  ]);
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate([
    { path: "unit", select: "name" },
    { path: "position", select: "name" },
    { path: "graduationStatus", select: "level" },
  ]);

  if (user) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUsers, getUserById };