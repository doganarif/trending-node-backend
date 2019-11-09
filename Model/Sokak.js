const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Sokak = sequelize.define(
    "sokak_cadde",
    {
      sokak_cadde_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      sokak_cadde_title: {
        type: Sequelize.STRING
      }
      //   ,
      //   sokak_cadde_mahallekey: {
      //     type: Sequelize.INTEGER
      //   }
    },
    { freezeTableName: true, timestamps: false }
  ));
};
