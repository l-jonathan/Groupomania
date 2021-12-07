// Import multer
const multer = require("multer");

// Definition of image extension
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Multer configuration
const storage = multer.diskStorage({
  // Image storage
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // Generating a new image file name
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// Multer export
module.exports = multer({ storage }).single("image");
