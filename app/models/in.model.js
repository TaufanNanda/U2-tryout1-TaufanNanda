module.exports = (sequelize, Sequelize)=>{
    const ProductIn = sequelize.define("productins", {
        product_id:{
            type: Sequelize.STRING
        },
        date:{
            type: Sequelize.DATE
        },
        total:{
            type: Sequelize.FLOAT
        }
    });
    return ProductIn;
}