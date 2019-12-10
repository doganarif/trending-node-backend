const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (CardProduct = sequelize.define(
    "KartUrun",
    {
     //
    },
    { freezeTableName: true , timestamps: false}
  ));
};
