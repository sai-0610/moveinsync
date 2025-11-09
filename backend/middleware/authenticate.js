const { verifyToken } = require("../config/auth");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = header.replace("Bearer ", "");

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;
  next();
};
