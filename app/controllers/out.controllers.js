const db = require("../models/index");
// const slack = require("../slack/it.slack");
const jwt = require('jsonwebtoken');
const ProductOut = db.productouts;
const Op = db.Sequelize.Op;
require("dotenv").config()

//productout
exports.create = (req, res) => {
    
    var user = 
    (jwt.verify
        (req.headers.token, 
            process.env.SECRET_JWT));
    console.log("user "+user.id);

    //Validate request
    if (!req.body.product_id  ) {
        res.status(400).send(
            {
                message: "Content can not be empty"
            }
        );
        return;
    }
    //Create productout
    const productout = {
        product_id: req.body.product_id,
        date: req.body.date,
        total: req.body.total

    }
    ProductOut.create(productout)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 
                "some error occured while creating the ProductOut"
            })
        });
// slack.sendMessage("nanda","it",
//     "Nama Barang: "+productout.product_id);
};

//retrive all
exports.findAll = (req, res) => {
    const limit = parseInt(req.query.limit);

    ProductOut.findAll({ limit: limit })
        .then((data) => {
            res.send({
                message:"Succes get data",
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
                    || "Some error occured while find productout"
            })
        });
};

//Delete ProductOut
exports.delProductOut = (req, res) => {
    const id = req.params.id;
    
    ProductOut.destroy({ where: {id: id} })
        .then(() => {
            res.send({
                message: `Succes delete data with id = ${id}`,
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