module.exports = app => {
    const auth = 
    require('../middleware/auth');
    const productins = 
    require("../controllers/in.controllers");

    let router = 
    require("express").Router();

    //create a new productin
    router.post("/", productins.create);
    router.get("/", productins.findAll);
    router.delete("/:id", productins.delProductIn);

    app.use("/api/v1/in", auth.isAuth,router);
}