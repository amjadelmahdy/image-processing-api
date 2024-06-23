import multer from "multer";
import path from "path";
const full = path.join(__dirname, "..", "..", "upload", "full");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, full);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export default storage;
