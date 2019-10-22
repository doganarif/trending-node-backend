const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Category = sequelize.define(
    "category",
    {
      title: {
        type: Sequelize.STRING
      },
      descriptiom: {
        type: Sequelize.TEXT
      }
    },
    { freezeTableName: true }
  ));
};
