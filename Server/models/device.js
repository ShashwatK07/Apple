const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  color: [
    {
      type: String,
      required: true,
    },
  ],
  storageCapacity: [
    {
      type: Number,
      required: true,
    },
  ],
  osVersion: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Device", DeviceSchema);
