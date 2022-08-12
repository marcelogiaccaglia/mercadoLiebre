const EXPRESS = require("express");
const usersController = require("../controllers/usersController");

const ROUTER = EXPRESS.Router();

ROUTER.get("/login", usersController.login);

ROUTER.get("/register", usersController.register);
ROUTER.post("/register/okUser", usersController.create);

ROUTER.get("/usersList", usersController.list);
ROUTER.get("/detail/:idUser", usersController.detail);

ROUTER.get("/edit/:idUser", usersController.edit);
ROUTER.put("/edit", usersController.upDate);

ROUTER.delete("/delete/:idUser", usersController.delete);

module.exports = ROUTER;
