var express = require("express");
var router = express.Router();
var { Company, Product } = require("../database");

router.get("/", (req, res) => {
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
