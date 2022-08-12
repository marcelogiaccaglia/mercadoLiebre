/* All required */
const EXPRESS = require("express");
const METHODOVERRIDE = require("method-override");
const homeRoute = require("./routes/homeRoute");
const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");

/* Express */
const APP = EXPRESS();

/* View Engine */
APP.set("view engine", "ejs");

/* Express use */
APP.use(EXPRESS.static(__dirname + "/public"));
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use(EXPRESS.json());
APP.use(METHODOVERRIDE("_method"));

/* Routes */
APP.use("/", homeRoute);
APP.use("/users", usersRoute);
APP.use("/products", productsRoute);

APP.get("/products/:idProducts", function (req, res) {
  let paramsProducts = req.params.idProducts;
  res.send("Detalles del producto " + paramsProducts);
});

APP.use((req, res, next) => {
  res.status(404).send("La pagina no existe");
});

/* Server with NODEjs */
APP.listen(3000, () => console.log("servidor corriendo"));
