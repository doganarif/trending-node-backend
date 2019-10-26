var express = require("express");
var router = express.Router();
const { Product, Photo, Card, User, Company, Comment } = require("../database");

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/detail/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Photo
      },
      {
        model: Card
      },
      {
        model: Company
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ["username"]
          }
        ]
      }
    ]
  }).then(data => {
    if (!data) {
      res.json({
        status: "warning",
        message: "No product found"
      });
    }
    res.json(data);
  });
});

router.get("/featured", (req, res) => {
  Product.findAll({
    where: {
      is_featured: true
    },
    include: [
      {
        model: Photo
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
