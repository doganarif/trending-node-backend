const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Town = sequelize.define(
    "town",
    {
      title: {
        type: Sequelize.STRING
      }
    },
    { freezeTableName: true }
  ));
};
