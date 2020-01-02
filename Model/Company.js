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
      website: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      photo: {
        type: Sequelize.TEXT,
        allowNull: true
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
    { freezeTableName: true, timestamps: false }
  ));
};
