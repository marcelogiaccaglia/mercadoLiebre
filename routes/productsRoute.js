/* All Require */
const EXPRESS = require("express");
const productsController = require("../controllers/productsController");

/* Router Express */
const ROUTER = EXPRESS.Router();

/* Routers Method */
ROUTER.get("/", productsController.index);
ROUTER.get("/products", productsController.list);
ROUTER.get("/search", productsController.search);

ROUTER.get("/products/:idProduct", productsController.detail);
//En detalle la pestaña con el nombre del producto, el cuerpo del detalle debe contener nombre, imagen, descripcion, precio real, descuento, precio final (sin descuento% mostrar precio real), separador de miles, con botones de editar y borrar (cada uno vista de la accion)

ROUTER.get("/create", productsController.create);
ROUTER.post("/okStore", productsController.store);

ROUTER.get("/edit/:idProduct", productsController.edit);
ROUTER.put("/edit", productsController.upDate);
ROUTER.delete("/delete/:idProduct", productsController.delete);

module.exports = ROUTER;
