var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var { Product, Company } = require("../database");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:id", (req, res) => {
  const sub_cat_id = req.params.id;
  Product.findAll({
    where: {
      sub_cat_id
    }
  }).then(data => {
    const company_ids = data.map(item => {
      return item.company_id;
    });

    Company.findAll({
      where: {
        id: {
          [Op.in]: company_ids
        }
      }
    }).then(company_data => {
      res.json({
        status: "success",
        data: company_data
      });
    });
  });
});

router.get("/products/:id", (req, res) => {
  const company_id = req.params.id;
  Product.findAll({
    where: {
      company_id
    }
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

module.exports = router;
