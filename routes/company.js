var express = require("express");
var router = express.Router();
var { Company, Product, Card, Comment, CompanyPhoto } = require("../database");

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

// router.get("/:id", (req, res) => {
//   Company.findAll({
//     where: {
//       id: req.params.id
//     },
//     include: [
//       {
//         model: Product
//       }
//     ]
//   }).then(data => {
//     res.json({
//       status: "success",
//       data
//     });
//   });
// });

router.get("/:id", (req, res) => {
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
module.exports = router;
