const deleteFile = require("../helpers/deleteFile");
const bannerModel = require("../model/banner.model");
const path = require("path");

/*Get all Banners*/
const getAllBanners = async (req, res) => {
  try {
    let banners = await bannerModel.find({});
    res.status(200).send({
      success: true,
      msg: "All Banner Fetched",
      data: banners,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};
//Add new banner
const addNewBanner = async (req, res) => {
  const { description } = req.body;
  const { filename } = req.file;

  if (filename) {
    try {
      let newBanner = await bannerModel.create({
        image: `http://localhost:5000/${filename}`,
        description,
      });

      await newBanner.save();
      res.status(201).send({
        success: false,
        msg: "New Banner Created",
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
      msg: "Credential error!",
    });
  }
};

//delete banner
const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    let targetBanner = await bannerModel.findOneAndDelete({ _id: id });

    let categoryImage = targetBanner.image.split("/");
    let targetImage = categoryImage[categoryImage.length - 1];

    try {
      await deleteFile(
        `${path.join(__dirname, "../upload-image")}/${targetImage}`
      );

      res.status(200).send({
        success: true,
        msg: "Banner deleted",
        targetBanner,
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
module.exports = { getAllBanners, addNewBanner, deleteBanner };
