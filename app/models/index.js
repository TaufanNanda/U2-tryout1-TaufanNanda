const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = 
new Sequelize(dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.min,
        idle: dbConfig.pool.min
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// create table
db.productouts = require("./out.model")(sequelize,Sequelize);
db.productins = require("./in.model")(sequelize,Sequelize);
db.products = require("./product.model")(sequelize,Sequelize);
db.user = require("./user.model")(sequelize,Sequelize);

module.exports = db;