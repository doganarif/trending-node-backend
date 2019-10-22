const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Subcategory = sequelize.define(
    "subcategory",
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
      },
    },
    { freezeTableName: true }
  ));
};
