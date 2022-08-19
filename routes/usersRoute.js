/* All Require */
const { Router } = require("express");
const EXPRESS = require("express");
const usersController = require("../controllers/usersController");

/* Router Express */
const ROUTER = EXPRESS.Router();

/* Routers Method */
ROUTER.get("/login", usersController.login);
ROUTER.post("/login", usersController.access);

ROUTER.get("/register", usersController.register);
ROUTER.post("/register/okUser", usersController.create);

ROUTER.get("/usersList", usersController.list);
ROUTER.get("/search", usersController.search);
ROUTER.get("/detail/:idUser", usersController.detail);

ROUTER.get("/edit/:idUser", usersController.edit);
ROUTER.put("/edit", usersController.upDate);

ROUTER.delete("/delete/:idUser", usersController.delete);

module.exports = ROUTER;
