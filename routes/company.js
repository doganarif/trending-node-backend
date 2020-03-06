var express = require("express");
var router = express.Router();
var {
  Company,
  Card,
  Comment,
  Sehir,
  CompanyPhoto,
  User,
  Category,
  Ilce
} = require("../database");
const Passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const Sequelize = require("sequelize");

// ** PASSPORT **

Passport.use(
  new BearerStrategy(function(token, done, next) {
    User.findOne({
      where: {
        user_key: token
      }
    }).then(user => {
      if (!user) return done(null, false);

      return done(null, user, { scope: "all" });
    });
  })
);
// ** PASSPORT **

router.get("/", (req, res) => {
  Company.findAll({
    attributes: [
      "id",
      ["title", "kurum_adi"],
      "phone",
      "photo",
      "website",
      ["address", "Adres"],
      "description",
      "is_featured"
    ],
    limit: 300,
    include: [
      {
        model: Sehir,
        attributes: [["sehir_title", ""]],
        // through: { attributes: ["sehir_title"] }
        nested: false
      },
      {
        model: Ilce,
        attributes: [["ilce_title", ""]],
        // through: { attributes: ["sehir_title"] }
        nested: false
      }
    ]
  })
    .then(data => {
      res.json({
        status: "success",
        data
      });
    })
    .catch(e => {
      console.log(e);
      res.end();
    });
});

router.post("/add_company", (req, res) => {
  // console.log(req.body);
  const {
    name,
    kategori,
    il,
    ilce,
    description,
    address,
    featured,
    phone,
    photo,
    website
  } = req.body;
  const is_featured = featured[0];
  console.log(website, "ASDASDDSA");
  Company.create({
    title: name,
    phone,
    address,
    description,
    is_featured,
    parent_id: 1,
    sehirId: 34,
    ilceId: 2004,
    photo,
    website
  })
    .then(data => {
      res.json({
        status: "success"
      });
    })
    .catch(e => {
      console.log(e);
      res.json({
        status: "error"
      });
    });
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

router.post(
  "/comment",
  Passport.authenticate("bearer", { session: false }),
  (req, res) => {
    const title = req.body.title;
    const descriptiom = req.body.desc;
    const user_id = req.user.id;
    const company_id = req.body.company_id;
    Comment.create({
      title,
      descriptiom,
      user_id,
      company_id
    }).then(cmt => {
      res.json({
        status: "success",
        data: cmt
      });
    });
  }
);
module.exports = router;
