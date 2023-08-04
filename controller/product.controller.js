const Product = require("../models/product.model");
const cloudinary = require("../utils/cloudinary");
const AppError = require("../utils/appError");

// GET All products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      status: 200,
      data: {
        products,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// POST Add a new product
exports.addProduct = async (req, res, next) => {
  try {
    const { title, price, description, category } = req.body;

    if (req.fileValidationError) {
      throw new AppError(req.fileValidationError, 400);
    }

    if (!title || !price || !description || !category || !req.file) {
      throw new AppError("Validation error", 400);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    const product = new Product({
      title,
      price,
      description,
      category,
      image: result.secure_url,
      image_publicid: result.public_id,
    });
    await product.save();
    res
      .status(200)
      .json({ status: 200, message: "Product added successfully" });
  } catch (error) {
    next(error);
  }
};

// GET Product by id
exports.getProductByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      throw new AppError("Product not found", 400);
    }

    res.json({
      status: 200,
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PUT Product by id
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, price, description, category } = req.body;

    const product = await Product.findById(id);

    if (req.fileValidationError) {
      throw new AppError(req.fileValidationError, 422);
    }

    if (!product) {
      throw new AppError("Product not found", 400);
    }

    if (req.file) {
      await cloudinary.uploader.destroy(product.image_publicid);

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      product.image = result.secure_url;
      product.image_publicid = result.public_id;
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;

    await product.save();

    res.json({
      status: 200,
      data: {
        message: "Product updated successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE Product by id
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      throw new AppError("Product not found", 400);
    }

    await cloudinary.uploader.destroy(product.image_publicid);
    await product.deleteOne();

    res.json({
      status: 200,
      data: {
        message: "Product deleted successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};
