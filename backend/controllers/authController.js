const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/auth");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = generateToken(user._id);
  res.json({ token });
};
