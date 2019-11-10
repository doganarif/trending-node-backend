var express = require("express");
var router = express.Router();
const { Ilce, Sehir, Sokak, Mahalle } = require("../database");

router.get("/get_sehir", function(req, res) {
  Sehir.findAll() 
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.end();
      console.log(err);
    });
});

router.get("/get_ilce/:id", (req, res) => {
  Ilce.findAll({
    where: {
      ilce_sehirkey: req.params.id
    }
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

router.get("/get_mahalle/:id", (req, res) => {
  Mahalle.findAll({
    where: {
      mahalle_ilcekey: req.params.id
    }
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

router.get("/get_sokak/:id", (req, res) => {
  Sokak.findAll({
    where: {
      sokak_cadde_mahallekey: req.params.id
    }
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

module.exports = router;
