const multer = require("multer");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      req.fileValidationError = "file Required Or Unsupported file type";
      return cb(null, false, req.fileValidationError);
    }
  },
});
