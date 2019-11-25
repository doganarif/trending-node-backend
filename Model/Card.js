const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Card = sequelize.define(
    "Kart",
    {
      title: {
        type: Sequelize.STRING
      },
      descriptiom: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN,
        dafault: false
      },
      icon: {
        type: Sequelize.TEXT
      }
    },
    { freezeTableName: true }
  ));
};
