const deleteFile = require("../helpers/deleteFile");
const categoryModel = require("../model/category.model");
const path = require("path");

const getAllCategory = async (req, res) => {
  let allCategory = await categoryModel.find();

  try {
    res.status(200).send({
      success: true,
      msg: "Category Fatch Successfully",
      data: allCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
const singleCategory = async (req, res) => {
  const { id } = req.params;
  let targetCategory = await categoryModel.findOne({ _id: id });

  try {
    res.status(200).send({
      success: true,
      msg: "Category Fatch Successfully",
      data: targetCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
const createNew = async (req, res) => {
  const { name, description } = req.body;
  const { filename } = req.file;

  if (name && filename) {
    try {
      let newCategory = new categoryModel({
        name,
        description,
        image: `http://localhost:5000/${filename}`,
      });
      await newCategory.save();
      res.status(201).send({
        success: true,
        msg: "Category Created",
        newCategory,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        error,
      });
    }
  } else {
    res.status(404).send({
      success: false,
      msg: "Please fill up your filds",
    });
  }
};
const categoryUpdate = async (req, res) => {
  const { id } = req.params;
  const updateFields = {};
  const fields = ["name", "description"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  if (req.file !== undefined) {
    let updateImage = `http://localhost:5000/${req.file.filename}`;
    updateFields.image = updateImage;
  }
  try {
    let targetCategory = await categoryModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateFields,
      }
    );
    if (updateFields.image) {
      let image = targetCategory.image.split("/");
      let oldImage = image[image.length - 1];
      try {
        await deleteFile(
          `${path.join(__dirname, "../upload-image")}/${oldImage}`
        );
        res.status(200).send({
          success: true,
          msg: "Category Updated",
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          error,
        });
      }
    } else {
      res.status(200).send({
        success: true,
        msg: "Category Updated",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

//some issue in deleteCetegory
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    let targetCategory = await categoryModel.findOneAndDelete({ _id: id });

    let categoryImage = targetCategory.image.split("/");
    let targetImage = categoryImage[categoryImage.length - 1];

    try {
      await deleteFile(
        `${path.join(__dirname, "../upload-image")}/${targetImage}`
      );

      res.status(200).send({
        success: true,
        msg: "Category deleted",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getAllCategory,
  singleCategory,
  categoryUpdate,
  createNew,
  deleteCategory,
};
