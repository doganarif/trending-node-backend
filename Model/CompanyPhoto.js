const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Photo = sequelize.define(
    "Firma_Resim",
    {
      photo_url: {
        type: Sequelize.STRING
      }
    },
    { freezeTableName: true, timestamps: false }
  ));
};
