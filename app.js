const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// routes
const productRoutes = require("./routes/products.route");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", productRoutes);

// 404 route handler
app.use((req, res) => {
  res.status(404).json({ status: 404, message: "Route not found" });
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL)
  .then((result) => {
    console.log(`Server is running on ${port}...`);
    app.listen(port);
  })
  .catch((err) => console.log(err));
