var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require("../models/index");
const User = db.user;
//register
exports.signup = function (req, res) {
    //Validate request
    if (!req.body.email || !req.body.password) {
        res.status(400).send(
            {
                message: "Content can not be empty"
            }
        );
        return;
    }
    //Create user
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(
        req.body.password, salt);

    const user = {
        full_name: req.body.full_name,
        username: req.body.username,
        phone_number: req.body.phone_number,
        role: req.body.role,
        password: hash,
        email: req.body.email
    }
    User.create(user) // insert into users
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "some error occured while creating the Post"
            })
        });
};

//login
exports.signin = function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;

    User.findOne({ where: { email: email } })
        .then((data) => {
            var hasil = bcrypt.compareSync(pass, data.password);
            console.log(hasil);

            if (hasil == true) {
                var secret = process.env.SECRET_JWT;
                var expiresIn = "30 days";//123 30d 24h 30 days

                jwt.sign(
                    { id: data.id}, 
                    secret, 
                    { algorithm: 'HS256', expiresIn: expiresIn },
                    function (err, token) {
                        if (err) {
                            res.json({
                                "results":
                                {
                                    "status": false,
                                    "msg": 'Error occurred while generating token'
                                }
                            });
                        } else {
                            if (token != false) {
                                res.header();
                                res.json({
                                    "results":
                                    {
                                        "status": true,
                                        "token": token,
                                        "user": { id: data.id }
                                    }
                                });
                                res.end();
                            } else {
                                res.json({
                                    "results":
                                    {
                                        "status": false,
                                        "msg": 'Could not create token'
                                    },
                                });
                                res.end();
                            }
                        }
                    });
            } else {
                res.send({
                    message: "Email atau Password anda salah"
                });
            }
        }).catch((err) => {
            res.status(500).send({
                err: 
                err.message,
                message:
                    "Error retrieving post with id = "
            });
        });
};

//retrive all
exports.findAll = (req, res) => {
    const limit = parseInt(req.query.limit);

        User.findAll({ limit: limit })
            .then((data) => {
                res.send({
                    message:"Succes get user data",
                    status: "success",
                    data :{
                        data,
                        "totalItems": 8,
                        "totalPages": 3,
                        "currentPage": 1
                    }
                });
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message 
                        || "Some error occured while find post"
                })
            });
};

//Delete User
exports.delUser = (req, res) => {
    const id = req.params.id;
    
    User.destroy({ where: {id: id} })
        .then(() => {
            res.send({
                message: `Succes delete user data with id = ${id}`,
                status: "success"
            });
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message 
                    || "Some error occured while find post"
            })
        });
};