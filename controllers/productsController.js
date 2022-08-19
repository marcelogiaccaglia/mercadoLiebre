/* NPM Require */
const fs = require("fs");

/* Reading Data Base from JSON */
let productBD = JSON.parse(
  fs.readFileSync("data/productBD.json", { encoding: "utf-8" })
);

let productsController = {
  index: (req, res) => {
    res.render("productsViews/index");
  },
  list: (req, res) => {
    res.render("productsViews/productsList", { productBD: productBD });
  },
  search: (req, res) => {
    /* Search with Query */
    let query = req.query.search;
    let productSearch = [];
    for (let i = 0; i < productBD.length; i++) {
      if (productBD[i].name.includes(query)) {
        productSearch.push(productBD[i]);
      }
    }
    console.log(productSearch);
    res.render("productsViews/productSearch", {
      productSearch: productSearch,
    });
  },
  detail: (req, res) => {
    let productParam = parseInt(req.params.idProduct);
    let productSelect;
    /* Finding the same Id product with GET*/
    for (let i = 0; i < productBD.length; i++) {
      if (productParam === productBD[i].id) {
        productSelect = productBD[i];
      }
    }
    res.render("productsViews/productDetail", { productSelect: productSelect });
  },
  create: (req, res) => {
    res.render("productsViews/productCreate");
  },
  store: (req, res) => {
    /* New product with POST */
    let newProduct = {
      id: null,
      name: req.body.name,
      price: parseInt(req.body.price),
      discount: parseInt(req.body.discount),
      finalPrice: parseInt(req.body.finalPrice),
      photo: req.body.photo,
      detail: req.body.detail,
      code: parseInt(req.body.code),
    };

    /* Giving a new Id to new product */
    let newIdProduct;
    for (let i = 0; i <= productBD.length; i++) {
      newIdProduct = i + 1;
    }
    newProduct.id = newIdProduct;

    /* New sequence of all .id */
    for (let i = 0; i < productBD.length; i++) {
      productBD[i].id = i + 1;
    }

    /* Push the new product and writing a new JSON */
    productBD.push(newProduct);
    let createBD = JSON.stringify(productBD);
    fs.writeFileSync("data/productBD.json", createBD);

    res.redirect("/products/products");
  },
  edit: (req, res) => {
    /* Finding the same Id product with GET*/
    let productIdEdit = parseInt(req.params.idProduct);
    let productEdit;
    /* With the Id, finding a product to edit*/
    for (let i = 0; i < productBD.length; i++) {
      if (productIdEdit === productBD[i].id) {
        productEdit = productBD[i];
      }
    }
    res.render("productsViews/productEdit", { productEdit: productEdit });
  },
  upDate: (req, res) => {
    let position;
    /* Finding the position and Id product with PUT/POST*/
    for (let i = 0; i < productBD.length; i++) {
      if (parseInt(req.body.id) === productBD[i].id) {
        position = i;
      }
    }
    /* Editing product */
    productBD[position].name = req.body.name;
    productBD[position].price = parseInt(req.body.price);
    productBD[position].discount = parseInt(req.body.discount);
    productBD[position].finalPrice = parseInt(req.body.finalPrice);
    productBD[position].detail = req.body.detail;
    productBD[position].code = parseInt(req.body.code);

    /* Writing a new JSON */
    let editBDtoJSON = JSON.stringify(productBD);
    fs.writeFileSync("data/productBD.json", editBDtoJSON);

    res.redirect("/products/products");
  },
  delete: (req, res) => {
    /* Finding the position and Id product with DELETE/POST*/
    let productIdDelete = parseInt(req.params.idProduct);
    let productDelete;
    for (let i = 0; i < productBD.length; i++) {
      if (productIdDelete === productBD[i].id) {
        productDelete = i;
      }
    }
    /* Delete product */
    productBD.splice(productDelete, 1);

    /* New sequence of all .id */
    for (let i = 0; i < productBD.length; i++) {
      productBD[i].id = i + 1;
    }
    /* let newUserBD = usersBD.forEach((e, i) => {
      console.log(e[i].nombre);
    }); */

    /* Writing a new JSON */
    let deleteIdtoJson = JSON.stringify(productBD);
    fs.writeFileSync("data/productBD.json", deleteIdtoJson);

    res.redirect("/products/products");
  },
};

module.exports = productsController;
