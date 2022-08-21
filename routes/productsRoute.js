/* All Require */
const EXPRESS = require("express");
const MULTER = require("multer");
const PATH = require("path");
const productsController = require("../controllers/productsController");

/* Router Express */
const ROUTER = EXPRESS.Router();

/* Method of Multer */
const storage = MULTER.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imagesProduct");
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
ROUTER.get("/", productsController.index);
ROUTER.get("/products", productsController.list);
ROUTER.get("/search", productsController.search);

ROUTER.get("/products/:idProduct", productsController.detail);
//En detalle la pestaña con el nombre del producto, el cuerpo del detalle debe contener nombre, imagen, descripcion, precio real, descuento, precio final (sin descuento% mostrar precio real), separador de miles, con botones de editar y borrar (cada uno vista de la accion)

ROUTER.get("/create", productsController.create);
ROUTER.post("/okStore", upload.any(), productsController.store);

ROUTER.get("/edit/:idProduct", productsController.edit);
ROUTER.put("/edit", upload.any(), productsController.upDate);

ROUTER.delete("/delete/:idProduct", productsController.delete);

module.exports = ROUTER;
