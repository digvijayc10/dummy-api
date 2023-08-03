const Product = require("../models/product.model");

// GET All products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      status: 200,
      data: {
        products,
      },
    });
  } catch (error) {
    console.log("ERROR  ", error);
    res.status(500).json({ status: 500, message: "Internal Server error" });
  }
};

// POST Add a new product
exports.addProduct = async (req, res) => {
  const { title, price, description, image, category } = req.body;

  if (!title || !price || !description || !image || !category) {
    res.status(400).json({ status: 400, message: "Unprocessable Entity" });
  }

  const product = new Product({
    title,
    price,
    description,
    image,
    category,
  });

  try {
    await product.save();
    res
      .status(200)
      .json({ status: 200, message: "Product added successfully" });
  } catch (error) {
    console.log("ERROR ", error);
    res.status(500).json({ status: 500, message: "Internal Server error" });
  }
};

// GET Product by id
exports.getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    res.json({
      status: 200,
      data: {
        product,
      },
    });
  } catch (error) {
    console.log("ERROR  ", error);
    res.status(500).json({ status: 500, message: "Internal Server error" });
  }
};

// PUT Product by id
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, description, image, category } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    product.title = title;
    product.description = description;
    product.image = image;
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
    console.log("ERROR  ", error);
    res.status(500).json({ status: 500, message: "Internal Server error" });
  }
};

// DELETE Product by id
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    res.json({
      status: 200,
      data: {
        message: "Product deleted successfully",
      },
    });
  } catch (error) {
    console.log("ERROR  ", error);
    res.status(500).json({ status: 500, message: "Internal Server error" });
  }
};
