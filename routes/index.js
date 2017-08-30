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
serverip_array = sip.split('.');
trasData = {serverip0: serverip_array[0], serverip1: serverip_array[1], serverip2: serverip_array[2], serverip3: serverip_array[3]};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', trasData);
});

module.exports = router;
