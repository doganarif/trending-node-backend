var express = require("express");
var router = express.Router();
const { Product, Photo } = require("../database");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Photo
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

module.exports = router;
