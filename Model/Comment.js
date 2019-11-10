const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Comment = sequelize.define(
    "comment",
    {
      title: {
        type: Sequelize.STRING
      },
      descriptiom: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.TINYINT,
        allowNull: true
      }
    },
    { freezeTableName: true }
  ));
};
