const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (MainCategory = sequelize.define(
    "maincategory",
    {
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
