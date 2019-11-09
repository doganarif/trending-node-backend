const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Ilce = sequelize.define(
    "ilce",
    {
      ilce_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      ilce_title: {
        type: Sequelize.STRING
      },
      ilce_key: {
        type: Sequelize.INTEGER,
        unique: true,
        index: true
      }
      //   ,
      //   ilce_sehirkey: {
      //     type: Sequelize.INTEGER
      //   }
    },
    { freezeTableName: true, timestamps: false }
  ));
};
