/* All required */
const EXPRESS = require ("express");
const homeRoute = require ("./routes/home_route")

/* Express */
const APP = EXPRESS();

/* View Engine */
APP.set("view engine", "ejs");

APP.use(EXPRESS.static(__dirname + "/public"));


APP.use("/", homeRoute);

APP.get("/products/:idProducts", function(req, res){
    let paramsProducts = req.params.idProducts;
    res.send("Detalles del producto " + paramsProducts)
});

APP.listen(3000,() => console.log("servidor corriendo"));