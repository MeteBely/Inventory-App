import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import Type from "../models/typeModel.js";
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

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate([
    { path: "type", select: "name" },
    { path: "brand", select: "name" },
    {
      path: "takeInf",
      populate: [
        { path: "userPersonel", select: "name surname registrationNumber" },
      ],
    },
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
  try {
    const product = new Product({
      dateOfEntry: new Date(),
      status: "Depoda",
    });

    const sampleProduct = await product.save();

    res.status(201).json(sampleProduct);
  } catch (error) {
    console.error("Hata oluşturulurken bir hata oluştu:", error);
    res
      .status(500)
      .json({ message: "Ürün oluşturulurken bir hata oluştu", error });
  }
});

const updateProductAndUser = asyncHandler(async (req, res) => {
  const { action, productId, userId, takenProductDate, returnProductDate } =
    req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (action === "add") {
      // Ürünü kullanıcıya ekle
      product.status = "Personelde";
      product.takeInf.push({
        userPersonel: userId,
        takenProductDate,
        // submitterPersonal: userId, // Submitter bilgisi de userId olarak ayarlandı
      });

      user.inventory.push(productId);

      await product.save();
      await user.save();

      res.send("Product added to User successfully");
    } else if (action === "remove") {
      // Ürünü kullanıcıdan kaldır
      product.status = "Depoda";

      let lastTakeInf = null;
      for (let i = product.takeInf.length - 1; i >= 0; i--) {
        if (product.takeInf[i].userPersonel.toString() === userId) {
          lastTakeInf = product.takeInf[i];
          break;
        }
      }

      if (lastTakeInf) {
        lastTakeInf.returnProductDate = returnProductDate;
      }

      user.inventory = user.inventory.filter(
        (userProductId) => userProductId.toString() !== productId.toString()
      );

      await product.save();
      await user.save();

      res.send("Product removed from User successfully");
    } else {
      res.status(400).send("Invalid action");
    }
  } catch (error) {
    console.error("Error updating Product and User:", error);
    res.status(500).send("An error occurred while updating Product and User");
  }
});

export {
  getProductById,
  getProducts,
  updateProduct,
  createSampleProduct,
  updateProductAndUser,
};
