const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Company = sequelize.define(
    "Firma",
    {
      title: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      price: {
        type: Sequelize.STRING
      }
    },
    { freezeTableName: true }
  ));
};
