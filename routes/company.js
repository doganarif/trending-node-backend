var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var { Company, Product } = require("../database");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:id", (req, res) => {
  Company.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

module.exports = router;
