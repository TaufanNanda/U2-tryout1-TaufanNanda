module.exports = (sequelize, Sequelize)=>{
    const ProductOut = sequelize.define("productouts", {
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
    return ProductOut;
}