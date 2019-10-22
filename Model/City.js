const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (City = sequelize.define(
    "city",
    {
      title: {
        type: Sequelize.STRING
      }
    },
    { freezeTableName: true }
  ));
};
