const deleteFile = require("../helpers/deleteFile");
const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");
const path = require("path");

//add product
const addProduct = async (req, res) => {
  const { name, description, sellingPrice, discountPrice, stock, category } =
    req.body;

  const imageLink = req.files.map(
    (img, i) => `http://localhost:${process.env.port}/${img.filename}`
  );

  console.log(req.body, req.files);

  try {
    const newProduct = new productModel({
      name,
      description,
      sellingPrice,
      discountPrice,
      stock,
      category,
      images: imageLink,
    });
    await newProduct.save();
    await categoryModel.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          products: newProduct._id,
        },
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      msg: " Product Created",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server ",
      error,
    });
  }
};

// Get All products
const getAllProducts = async (req, res) => {
  try {
    let products = await productModel.find().populate("category");
    res.status(200).send({
      success: true,
      msg: "All Products Fetched",
      data: products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
//get single product

const getSingelProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await productModel.findOne({ _id: id }).populate("category");
    res.status(200).send({
      success: true,
      msg: "All Products Fetched",
      data: product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

//update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateFields = {};
  const fields = [
    "name",
    "description",
    "sellingPrice",
    "discountPrice",
    "stock",
    "category",
    "store",
    "rating",
    "featured",
    "hotsell",
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  //handel image singelly
  if (req.files && req.files.length > 0) {
    const imageLink = req.files.map(
      (file) => `http://localhost:${process.env.port}/${file.filename}`
    );
    updateFields.images = imageLink;
  }
  try {
    let targetProduct = await productModel.findOneAndUpdate(
      { _id: id },
      { $set: updateFields }
    );
    if (updateFields.images) {
      let productImages = targetProduct.images;

      productImages.forEach(async (item) => {
        let imagePath = item.split("/");
        let oldImagePath = imagePath[imagePath.length - 1];
        try {
          await deleteFile(
            `${path.join(__dirname, "../upload-image")}/${oldImagePath}`
          );
        } catch (fileDeleteErr) {
          return res.status(500).send({
            success: false,
            msg: "Internal Server Error",
            fileDeleteErr,
          });
        }
      });
    }
    res.status(200).send({
      success: true,
      msg: "product is Updated",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let targetProducts = await productModel.findOneAndDelete({ _id: id });
    let targetImageArray = targetProducts.images;

    targetImageArray.forEach(async (targetImage) => {
      let array = targetImage.split("/");
      let image = array[array.length - 1];

      try {
        await deleteFile(`${path.join(__dirname, "../upload-image")}/${image}`);
      } catch (error) {
        return res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          error,
        });
      }
    });
    //safe play for success msg
    res.status(200).send({
      success: true,
      msg: "product deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
module.exports = {
  updateProduct,
  addProduct,
  getAllProducts,
  getSingelProduct,
  deleteProduct,
};
