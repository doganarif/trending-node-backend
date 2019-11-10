var express = require("express");
var router = express.Router();
const {
  Product,
  Photo,
  Card,
  User,
  Company,
  Comment,
  sequelize,
  CompanyPhoto
} = require("../database");

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/detail/:id", (req, res) => {
  Company.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: CompanyPhoto
      },
      {
        model: Card,
        as: "company_id"
      },
      {
        model: Comment,
        attributes: [
          "id",
          "title",
          "descriptiom",
          "rating",
          "user_id",
          "company_id"
        ],
        group: "venue_id",
        include: [
          {
            model: User,
            attributes: ["username"]
          }
        ]
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.json({
          status: "warning",
          message: "No product found"
        });
      }
      res.json(data);
    })
    .catch(err => {
      res.end();
      console.log(err);
    });
});

router.get("/featured", (req, res) => {
  Company.findAll({
    where: {
      is_featured: true
    },
    include: [
      {
        model: CompanyPhoto
        // as: "company_id"
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

module.exports = router;
