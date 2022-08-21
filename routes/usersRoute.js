/* All Require */
const EXPRESS = require("express");
const MULTER = require("multer");
const PATH = require("path");
const usersController = require("../controllers/usersController");

/* Router Express */
const ROUTER = EXPRESS.Router();

/* Method of Multer */
const storage = MULTER.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imagesUser");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + PATH.extname(file.originalname)
    );
  },
});

const upload = MULTER({ storage: storage });

/* Routers Method */
ROUTER.get("/login", usersController.login);
ROUTER.post("/login", usersController.access);

ROUTER.get("/register", usersController.register);
ROUTER.post("/register/okUser", upload.any(), usersController.create);

ROUTER.get("/usersList", usersController.list);
ROUTER.get("/search", usersController.search);
ROUTER.get("/detail/:idUser", usersController.detail);

ROUTER.get("/edit/:idUser", usersController.edit);
ROUTER.put("/edit", upload.any(), usersController.upDate);

ROUTER.delete("/delete/:idUser", usersController.delete);

module.exports = ROUTER;
