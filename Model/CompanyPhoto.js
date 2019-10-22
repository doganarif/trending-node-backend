const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Photo = sequelize.define(
    "company_photo",
    {
      photo_url: {
        type: Sequelize.STRING
      }
    },
    { freezeTableName: true }
  ));
};
