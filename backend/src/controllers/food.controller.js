const foodModel = require("../models/food.model");
const uploadFile = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const registerFood = async (req, res) => {
  try {
    const foodPartner = req.partner;
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }
    const { buffer } = req.file;

    const video = await uploadFile(buffer, uuid());

    const food = await foodModel.create({
      title,
      description,
      video: video.url,
      foodPartner: foodPartner._id,
    });

    res.status(201).json({
      success: true,
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const foodReels = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerFood,
  foodReels,
};
