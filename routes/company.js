var express = require("express");
var router = express.Router();
var { Company, Card, Comment, CompanyPhoto, User } = require("../database");
const Passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
