var express = require('express');
var router = express.Router();

trasData = { ServerIP: "'192.168.1.197'" };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', trasData);
});

module.exports = router;
