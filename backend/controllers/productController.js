import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import Type from "../models/typeModel.js";

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

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate([
    { path: "type", select: "name" },
    { path: "brand", select: "name" },
  ]);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate([
    { path: "type", select: "name" },
    { path: "brand", select: "name" },
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
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found with this id");
  }
});

const createSampleProduct = asyncHandler(async (req, res) => {
  const highestSerialProduct = await Product.findOne()
    .sort("-serialNumber")
    .exec();
  const newSerialNumber = highestSerialProduct
    ? highestSerialProduct.serialNumber + 1
    : 1;

  const product = new Product({
    serialNumber: newSerialNumber,
    dateOfEntry: new Date(),
  });

  product.validateBeforeSave = false;

  const sampleProduct = await product.save();
  res.status(201).json(sampleProduct);
});

export { getProductById, getProducts, updateProduct, createSampleProduct };
