const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".pdf" && ext !== ".docx" && ext !== ".doc") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
