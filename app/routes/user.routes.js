module.exports = app => {
    const users = 
    require("../controllers/user.controllers");

    let router = 
    require("express").Router();

    //create a new post
    router.post("/signup",users.signup );
    router.post("/signin",users.signin );
    router.get("/", users.findAll);
    router.delete("/:id", users.delUser);


    app.use("/api/v1/user", router);
}