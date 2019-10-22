var express = require("express");
var router = express.Router();

const { Category, Product } = require("../database");

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
        model: Product
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

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category
      },
      {
        model: Product
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
