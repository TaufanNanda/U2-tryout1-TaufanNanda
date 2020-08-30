const db = require("../models/index");
// const slack = require("../slack/it.slack");
const jwt = require('jsonwebtoken');
const Product = db.products;
const Op = db.Sequelize.Op;
require("dotenv").config()

//product
exports.create = (req, res) => {
    
    var user = 
    (jwt.verify
        (req.headers.token, 
            process.env.SECRET_JWT));
    console.log("user "+user.id);

    //Validate request
    if (!req.body.name  ) {
        res.status(400).send(
            {
                message: "Content can not be empty"
            }
        );
        return;
    }
    //Create product
    const product = {
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price,
        id_user: req.body.id_user,
        photo: "-",
        published: req.body.published ? 
        req.body.published : false

    }
    Product.create(product)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 
                "some error occured while creating the Product"
            })
        });
// slack.sendMessage("nanda","it",
//     "Nama Barang: "+product.name);
};

//put upload image
exports.uploadImageProduct = async (req, res) => {
    const id = req.params.id;
    const name = req.params.name;

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field 
            let photo = req.files.photo;
            var renamePhoto = + id
                + "-"
                + name
                + (photo.name).substring((photo.name).indexOf("."))

            Product.update({
                photo: renamePhoto

            }, {
                where: { id: id }
            }).then((result) => {
                if (result == 1) {
                    photo.mv('./uploads/' + renamePhoto);
                    //send response
                    res.send({
                        status: true,
                        message: 
                        'Photo product File is uploaded',
                        data: {
                            name: photo.name,
                            rename : renamePhoto,
                            mimetype: photo.mimetype,
                            size: photo.size
                        }
                    });
                } else {
                    res.send({
                        message: 
                        `Cannot update Product with id = ${id}`
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    message: `Error updating product id = ${id}`
                })
            })

        }
    } catch (err) {
        res.status(500).send(err);
    }
};

//retrive all
exports.findAll = (req, res) => {
    const limit = parseInt(req.query.limit);
   
    Product.findAll({ limit: limit })
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
                    || "Some error occured while find product"
            })
        });
};

//Delete Product
exports.delProduct = (req, res) => {
    const id = req.params.id;
    
    Product.destroy({ where: {id: id} })
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