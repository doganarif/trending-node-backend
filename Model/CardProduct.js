const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (CardProduct = sequelize.define(
    "cardproduct",
    {
     //
    },
    { freezeTableName: true }
  ));
};
