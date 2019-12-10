const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Category = sequelize.define(
    "Kategori",
    {
      title: {
        type: Sequelize.STRING
      },
      descriptiom: {
        type: Sequelize.TEXT
      }
    },
    { freezeTableName: true , timestamps: false}
  ));
};
