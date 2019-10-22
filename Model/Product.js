const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (Product = sequelize.define(
    "product",
    {
      title: {
        type: Sequelize.STRING
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
