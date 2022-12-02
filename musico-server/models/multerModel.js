
const multer = require("multer"); 
const path = require("path");
const fs = require("fs");


// multer setup
const storage = multer.diskStorage({
  destination: "../musico-client/public/uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});



function checkFileType(file, cb) {
  const filetypes = /mp3|wav/;
  

  if (file.mimetype==="audio/mp3" || file.mimetype==="audio/mpeg") {
    return cb(null, true);
  } else {
    cb("Error! Only audios are valid.");
  }
}


module.exports = upload;