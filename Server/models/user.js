const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchased: [
    {
      date: {
        type: Date,
      },
      device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
