const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      user_key: {
        type: Sequelize.STRING
      }
    },
    { freezeTableName: true }
  ));
};
