const EXPRESS = require("express");
const homeController = require("../controllers/homeController");
const ROUTER = EXPRESS.Router();

ROUTER.get("/", homeController.index);

module.exports = ROUTER;
