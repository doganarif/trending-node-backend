const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Category = sequelize.define(
    "category",
    {
      UUID: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      descriptiom: {
        type: Sequelize.TEXT
      },
      parent_id: {
        type: Sequelize.STRING
      }
    },
    { freezeTableName: true }
  ));
};
