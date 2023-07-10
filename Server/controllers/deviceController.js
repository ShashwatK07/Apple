const Device = require("../models/device");

module.exports.allDevice = async (req, res, next) => {
  try {
    const devices = await Device.find({});
    return res.status(200).json(devices);
  } catch (err) {
    console.error("Error retrieving devices:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.addDevice = async (req, res, next) => {
  try {
    const device = new Device({ ...req.body });
    await device.save();
    res.status(200).send("Device Added Successfully.");
  } catch (err) {
    console.error("Error adding device:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ error: "Device not found." });
    }
    return res.status(200).json(device);
  } catch (err) {
    console.error("Error retrieving device:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ error: "Device not found." });
    }
    Object.assign(device, { ...req.body });
    await device.save();
    res.status(200).send("Device Updated Successfully.");
  } catch (err) {
    console.error("Error updating device:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
