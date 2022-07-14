const EXPRESS = require("express");
const homeController = require ("../controllers/home_controller");
const ROUTER = EXPRESS.Router();

ROUTER.get("/index", homeController.index);
ROUTER.get("/login", homeController.login);
ROUTER.get("/register", homeController.register);


module.exports = ROUTER;