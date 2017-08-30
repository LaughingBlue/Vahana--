var express = require('express');
var router = express.Router();

trasData = { title: 'Express', ServerIP: "192.168.1.197" };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', trasData);
});

module.exports = router;
