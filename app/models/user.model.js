module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("users", {
        full_name:{
            type: Sequelize.STRING
        },
        username:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        phone_number:{
            type: Sequelize.STRING
        },
        role:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        }
    });
    return User;
}