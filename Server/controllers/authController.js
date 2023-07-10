const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const check = await User.findOne({ email: email });
    if (!check) {
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hash });
      await user.save();
      res.status(200).send("User added successfully");
    } else {
      res.status(403).send("User Already exists");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("Invalid Credentials");
    } else {
      const pass = await bcrypt.compare(req.body.password, user.password);
      if (!pass) {
        res.status(400).send("Invalid Credentials");
      } else {
        const token = jwt.sign({ id: user._id }, "OnePiece");
        res
          .cookie("token", token, { maxAge: 900000, httpOnly: true })
          .status(200)
          .send("User Verified");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
