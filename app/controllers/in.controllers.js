const db = require("../models/index");
// const slack = require("../slack/it.slack");
const jwt = require('jsonwebtoken');
const ProductIn = db.productins;
const Op = db.Sequelize.Op;
require("dotenv").config()

//productin
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
    //Create productin
    const productin = {
        product_id: req.body.product_id,
        date: req.body.date,
        total: req.body.total

    }
    ProductIn.create(productin)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 
                "some error occured while creating the ProductIn"
            })
        });
// slack.sendMessage("nanda","it",
//     "Nama Barang: "+productin.product_id);
};

//retrive all
exports.findAll = (req, res) => {
    const limit = parseInt(req.query.limit);
   
    ProductIn.findAll({ limit: limit })
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
                    || "Some error occured while find productin"
            })
        });
};

//Delete ProductIn
exports.delProductIn = (req, res) => {
    const id = req.params.id;
    
    ProductIn.destroy({ where: {id: id} })
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