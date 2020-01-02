var express = require("express");
var router = express.Router();
const { Ilce, Sehir, Sokak, Mahalle, Card } = require("../database");

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

router.get("/get_sehir_panel", (req, res) => {
  Sehir.findAll({
    attributes: [
      ["sehir_title", "text"],
      ["sehir_key", "value"]
    ]
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

router.get("/get_ilce_panel/:id", (req, res) => {
  console.log(req.params.id, "ASDADSASDDADDS");
  Ilce.findAll({
    where: {
      ilce_sehirkey: req.params.id
    },
    attributes: [
      ["ilce_title", "text"],
      ["ilce_key", "value"]
    ]
  }).then(data => {
    res.json({
      status: "success",
      data
    });
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

router.post("/add_card", (req, res) => {
  const { name, icon } = req.body;

  Card.create({
    title: name,
    icon
  }).then(data => {
    res.json({
      status: "success",
      data
    });
  });
});

router.get("/get_cards", (req, res) => {
  Card.findAll({
    attributes: [
      ["title", "Kart Açıklaması"],
      ["icon", "Kart Ikonu"]
    ]
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
