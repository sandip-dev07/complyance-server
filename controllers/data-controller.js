const Data = require("../models/Data");
const handleError = require("../utils/error-response");

// Get Data by Country
exports.getDataByCountry = async (req, res) => {
  try {
    const query = { country: req.user.country };

    const data = await Data.find(query).populate("createdBy", "username");

    res.json({ data });
  } catch (error) {
    handleError(res, error);
  }
};

// Create Data (Admin)
exports.createData = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const newData = new Data({
      name,
      country: req.user.country,
      createdBy: req.user.id,
    });

    const savedData = await newData.save();
    const populatedData = await savedData.populate("createdBy", "username");

    res.status(201).json(populatedData);
  } catch (error) {
    handleError(res, error);
  }
};

// Update Data (Admin)
exports.updateData = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const updatedData = await Data.findOneAndUpdate(
      {
        _id: req.params.id,
        country: req.user.country,
      },
      { name },
      { new: true, runValidators: true }
    ).populate("createdBy", "username");

    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(updatedData);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete Data (Admin)
exports.deleteData = async (req, res) => {
  try {
    const deletedData = await Data.findOneAndDelete({
      _id: req.params.id,
      country: req.user.country,
    });

    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json({
      message: "Data deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    handleError(res, error);
  }
};
