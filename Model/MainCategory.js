const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (MainCategory = sequelize.define(
    "maincategory",
    {
      UUID: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      }
    },
    { freezeTableName: true }
  ));
};
