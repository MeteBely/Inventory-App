import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Kullanıcının giriş yapmış olmasını kontrol eder, yoksa error fırlatır.
const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); //diğer middlewarelerde kullanacağız bu user'i.
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized! token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized! No token found!");
  }
});

//protect middleware'den sonra çalışır, giriş yapmış kullanıcının admin veya IM olup olmadığını kontrol eder. Admin ve IM ise endpoint'e yönlendirir.
const adminOrIM = (req, res, next) => {
  if ((req.user && req.user.role == "admin") || req.user.role == "IM") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin or IM");
  }
};

const adminOrIK = (req, res, next) => {
  if ((req.user && req.user.role == "admin") || req.user.role == "IK") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin or IK");
  }
};

export { adminOrIM, protect, adminOrIK };
