var express = require("express");
var router = express.Router();
const { City, Town, Category, Product, sequelize } = require("../database");
/* GET home page. */
const Sequelize = require("sequelize");
router.get("/", function(req, res, next) {
  res.end();
});

router.get("/get_cities", (req, res) => {
  City.findAll().then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

router.get("/get_town/:id", (req, res) => {
  const city_id = req.params.id;

  Town.findAll({
    where: {
      city_id
    }
  }).then(data => {
    if (data.length < 1) {
      res.json({
        status: "error",
        message: "no record found"
      });

      return;
    }
    res.json({
      status: "success",
      data
    });
  });
});
module.exports = router;
