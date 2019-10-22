var express = require('express');
var router = express.Router();
const { Product } = require('../database');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', (req,res) => {
//
})

module.exports = router;
