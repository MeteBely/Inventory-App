import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Unit from "../models/unitModel.js";
import Position from "../models/positionModel.js";
import GraduationStatus from "../models/graduationStatusModel.js";
import generateToken from "../utils/generateToken.js";

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

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

//Giriş yapmış kişi içindir, cookie'deki jwt'yi temizler.
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Successfully logged out",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).populate([
      { path: "unit", select: "name" },
      { path: "position", select: "name" },
    ]);

    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate([
      { path: "unit", select: "name" },
      { path: "position", select: "name" },
      { path: "graduationStatus", select: "level" },
      {
        path: "inventory",
        populate: [
          { path: "type", select: "name" }, // type alanını popüle eder
          { path: "brand", select: "name" }, // brand alanını popüle eder
        ],
      },
    ]);

    if (user) {
      return res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const {
      name,
      surname,
      gender,
      birthDate,
      maritalStatus,
      registrationNumber,
      identificationNumber,
      graduationStatus,
      unit,
      position,
      isWorking,
    } = req.body;

    const graduationStatusWithId = await GraduationStatus.findOne({
      level: graduationStatus,
    });

    const unitId = await findOrCreate(Unit, unit);
    const positionId = await findOrCreate(Position, position);

    if (user) {
      user.name = name;
      user.surname = surname;
      user.gender = gender;
      user.birthDate = birthDate;
      user.maritalStatus = maritalStatus;
      user.identificationNumber = identificationNumber;
      user.registrationNumber = registrationNumber;
      user.graduationStatus = graduationStatusWithId._id;
      user.unit = unitId;
      user.position = positionId;
      user.isWorking = isWorking;
      const updatedUser = await user.save();
      res.status(201).json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found with this id");
    }
  } catch (error) {
    console.log(error);
  }
});

const createSampleUser = asyncHandler(async (req, res) => {
  try {
    const highestRegistrationUser = await User.findOne()
      .sort("-registrationNumber")
      .exec();

    const newRegistrationNumber = highestRegistrationUser
      ? highestRegistrationUser.registrationNumber + 1
      : 1;

    const user = new User({
      registrationNumber: newRegistrationNumber,
      role: "IM",
    });

    const sampleUser = await user.save();

    res.status(201).json(sampleUser);
  } catch (error) {
    console.error("Hata oluşturulurken bir hata oluştu:", error);
    res
      .status(500)
      .json({ message: "User oluşturulurken bir hata oluştu", error });
  }
});

export {
  getUsers,
  getUserById,
  updateUser,
  createSampleUser,
  authUser,
  logoutUser,
};
