const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return (mahalle = sequelize.define(
    "mahalle",
    {
      mahalle_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      mahalle_title: {
        type: Sequelize.STRING
      },
      mahalle_key: {
        type: Sequelize.INTEGER,
        unique: true,
        index: true
      }
      //   ,
      //   mahalle_ilcekey: {
      //     type: Sequelize.INTEGER
      //   }
    },
    { freezeTableName: true, timestamps: false }
  ));
};
