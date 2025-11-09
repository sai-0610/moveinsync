const multer = require("multer");
const path = require("path");

// Storage location + filename settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure backend/uploads/ exists
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// Only allow PDF & images
function fileFilter(req, file, cb) {
  const allowed = ["application/pdf", "image/png", "image/jpeg"];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Unsupported file type"), false);
  }

  cb(null, true);
}

module.exports = multer({ storage, fileFilter });
