module.exports = app => {
    const auth = 
    require('../middleware/auth');
    const productouts = 
    require("../controllers/out.controllers");

    let router = 
    require("express").Router();

    //create a new productout
    router.post("/", productouts.create);
    router.get("/", productouts.findAll);
    router.delete("/:id", productouts.delProductOut);

    app.use("/api/v1/out", auth.isAuth,router);
}