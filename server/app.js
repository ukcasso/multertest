const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");
const port = 3030;


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) {
    cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

app.post("/upload", upload.single("img"), function(req, res, next) {
  console.log(req.file.filename)
  res.send({
    fileName: req.file.filename
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})