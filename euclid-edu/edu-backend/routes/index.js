var express = require('express');
var router = express.Router();
const excel = require('./excel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/excel', excel);
module.exports = router;
