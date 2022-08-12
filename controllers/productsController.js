let productsBD = require("../data/productBD");

let productsController = {
  index: (req, res) => {
    res.render("productsViews/index");
  },
};

module.exports = productsController;
