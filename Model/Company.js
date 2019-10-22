const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Company = sequelize.define(
    "company",
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
