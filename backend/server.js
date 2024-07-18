import express from "express";
import connectDB from "./config/db.js";
const app = express();
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.PORT || 5000;
import productRoutes from "./routes/productRoutes.js";

connectDB();

//Body Parser
app.use(express.json()); //req.body --> raw için
app.use(express.urlencoded({ extended: true })); //req.body --> urlencoded için.
// app.use(cookieParser()); //req.cookie --> cookie için.

app.get("/", (req, res) => {
  res.send("Api running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
