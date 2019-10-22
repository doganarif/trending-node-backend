const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Category = sequelize.define(
    "category",
    {
      UUID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      descriptiom: {
        type: Sequelize.TEXT
      }
    },
    { freezeTableName: true }
  ));
};
