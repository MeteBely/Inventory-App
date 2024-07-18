import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import Type from "../models/typeModel.js";

const findOrCreate = async (Model, name) => {
  let item = await Model.findOne({ name });

  if (!item) {
    item = new Model({ name });
    await item.save();
  }

  return item._id;
};

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate([
    { path: "type", select: "type" },
    { path: "brand", select: "brand" },
  ]);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate([
    { path: "type", select: "type" },
    { path: "brand", select: "brand" },
  ]);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { type, dateOfEntry, brand, model, serialNumber, status } = req.body;

  const brandId = await findOrCreate(Brand, brand);
  const typeId = await findOrCreate(Type, type);

  if (product) {
    product.type = typeId;
    product.dateOfEntry = dateOfEntry;
    product.brand = brandId;
    product.model = model;
    product.serialNumber = serialNumber;
    product.status = status;
    const updatedMealKit = await mealKit.save();
    res.status(201).json(updatedMealKit);
  } else {
    res.status(404);
    throw new Error("Product not found with this id");
  }
});

export { getProductById, getProducts, updateProduct };
