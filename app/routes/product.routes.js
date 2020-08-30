module.exports = app => {
    const auth = 
    require('../middleware/auth');
    const products = 
    require("../controllers/product.controllers");

    let router = 
    require("express").Router();

    //create a new product
    router.post("/", products.create);
    router.get("/", products.findAll);
    router.delete("/:id", products.delProduct);
    
    router.put("/image-photo/:id/:title", products.uploadImageProduct);


    app.use("/api/v1/product", auth.isAuth,router);
}