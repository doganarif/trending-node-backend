const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Sehir = sequelize.define(
    "sehir",
    {
      sehir_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      sehir_title: {
        type: Sequelize.STRING
      },
      sehir_key: {
        type: Sequelize.INTEGER,
        unique: true,
        index: true
      }
    },
    { freezeTableName: true, timestamps: false }
  ));
};
