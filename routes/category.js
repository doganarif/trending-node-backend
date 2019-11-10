var express = require("express");
var router = express.Router();

const { Category, Product, Card, Company, Photo, CompanyPhoto } = require("../database");

router.get("/", async function(req, res, next) {
  Category.findAll({
    where: {
      parent_id: null
    },
    include: [
      {
        model: Category
      },
      {
        model: Company
      }
    ]
  })
    .then(data => {
      if (data.length < 1) {
        res.json({
          status: "warning",
          message: "no categories listed"
        });
      }
      res.json({
        status: "success",
        data
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        status: "error",
        message: "check logs"
      });
    });
});

router.get("/products/:id", (req, res) => {
  Company.findAll({
    where: {
      parent_id: req.params.id
    },
    include: [
      {
        model: Card,
        as: "company_id"

      },
      {
        model: CompanyPhoto
      }
    ]
  })
    .then(data => {
      res.json({
        status: "success",
        data
      });
    })
    .catch(err => {
      res.end();
      console.log(err);
    });
});

router.get("/detail/:id", (req, res) => {
  Category.findAll({
    where: {
      parent_id: req.params.id
    },
    include: [
      {
        model: Category
      },
      {
        model: Company
      }
    ]
  }).then(data => {
    if (!data) {
      res.json({
        status: "warning",
        message: "No category Found"
      });
    }
    res.json({
      status: "success",
      data
    });
  });
});

module.exports = router;
