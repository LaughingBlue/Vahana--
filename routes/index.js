var express = require('express');
var router = express.Router();

var sip = require('underscore')
.chain(require('os').networkInterfaces())
.values()
.flatten()
.find({family: 'IPv4', internal: false})
.value()
.address;
console.log('Server IP='+sip);
transData = { ServerIP: sip };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', transData);
});

module.exports = router;
