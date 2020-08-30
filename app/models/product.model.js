module.exports = (sequelize, Sequelize)=>{
    const Product = sequelize.define("products", {
        name:{
            type: Sequelize.STRING
        },
        stock:{
            type: Sequelize.FLOAT
        },
        price:{
            type: Sequelize.FLOAT
        },
        id_user:{
            type: Sequelize.STRING
        },
        photo:{
            type: Sequelize.STRING
        },
        published:{
            type: Sequelize.BOOLEAN
        }
    });
    return Product;
}