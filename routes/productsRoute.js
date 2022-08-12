const EXPRESS = require("express");
const productsController = require("../controllers/productsController");

const ROUTER = EXPRESS.Router();

ROUTER.get("/", productsController.index);

/* Ruteos a programar
ROUTER.get("/products", productsController.list);
ROUTER.get("/products/:idProduct", productsController.detail);

    //En detalle la pestaña con el nombre del producto, el cuerpo del detalle debe contener nombre, imagen, descripcion, precio real, descuento, precio final (sin descuento% mostrar precio real), separador de miles, con botones de editar y borrar (cada uno vista de la accion)
    
ROUTER.get("/products/create", productsController.create);
ROUTER.post("/products/okStore", productsController.store);
ROUTER.get("/products/edit/:idProduct", productsController.edit); 
ROUTER.put("/products", productsController.upDate);
ROUTER.delete("/products/:idProduct", productsController.delete);*/

module.exports = ROUTER;
