const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (TownCategory = sequelize.define(
    "town_category",
    {
     // 
    },
    { freezeTableName: true }
  ));
};
