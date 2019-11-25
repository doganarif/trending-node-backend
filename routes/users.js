var express = require("express");
var router = express.Router();
const { User } = require("../database");
const randomKey = require("random-key");
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
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({
    where: {
      email,
      password
    }
  }).then(usr => {
    if (usr) {
      res.json({
        status: "success",
        key: usr.user_key
      });
    } else {
      res.json({
        status: "error",
        message:
          "Kullanıcı Bulunamadı, E Posta Adresinizi ve Şifrenizi Kontrol Edin."
      });
    }
  });
});

router.post("/register", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username;
  const user_key = randomKey.generate(20);

  User.findOne({
    where: {
      [Op.or]: [{ email }, { username }]
    }
  }).then(usr => {
    console.log(usr);
    if (!usr) {
      User.create({
        email,
        password,
        username,
        user_key
      }).then(createdUser => {
        res.json({
          status: "success",
          key: createdUser.user_key
        });
      });
    } else {
      res.json({
        status: "error",
        message: "Email veya Kullanıcı Adı Kayıtlı"
      });
    }
  });
});

router.get(
  "/profile",
  Passport.authenticate("bearer", { session: false }),
  (req, res) => {
    res.json({
      status: "success",
      user: req.user.username
    });
  }
);

module.exports = router;
