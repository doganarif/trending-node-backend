var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

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
  }).then(data => {
    console.log(data);
    res.send(data);
  })
  .catch((err) => {
    console.log(err)
    res.json({
      status: 'error',
      message: 'check logs'
    })
  })
});

router.get("/:id", (req, res) => {
  const town_id = req.params.id;

  TownCategory.findAll({
    where: {
      town_id
    },
    attributes: ["cat_id"],
    raw: true
  }).then(data => {
    const category_ids = data.map(i => {
      return i.cat_id;
    });

    Category.findAll({
      where: {
        id: {
          [Op.in]: category_ids
        }
      }
    }).then(data => {
      res.send(data);
    });
  });
});

router.get("/sub/:id", (req, res) => {
  const cat_id = req.params.id;

  Subcategory.findAll({
    where: {
      cat_id
    }
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

module.exports = router;
