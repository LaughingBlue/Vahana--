try {    
    var Gpio = require('pigpio').Gpio,
        led = new Gpio(18, { mode: Gpio.OUTPUT }),//12/13/18/19
        dutyCycle = 0;
    var express = require('express');
    var router = express.Router();
    var app = express();

    var ServerIP = require('underscore')
    .chain(require('os').networkInterfaces())
    .values()
    .flatten()
    .find({family: 'IPv4', internal: false})
    .value()
    .address;
    console.log('Server IP='+ServerIP);

} catch (err) {
    console.log(err);
}

router.get('/', function(req, res) {
    var data = {
        serverip : ServerIP
    }
	res.render('View-index', data);
});

function streaming_on() {
  exec = require('child_process').exec;
  web_vs = exec('python3 ./web-vs-server.py', shell = false);
  wvs_pid = web_vs.pid + 1;
  console.log('pid=' + wvs_pid);

  // 將pid of Web Video Streaming存入檔案中
  fs = require('fs');
  fs.writeFileSync('./wvs-pid.txt', wvs_pid);

  // 將on存入Web Video Streaming的狀態檔中
  fs = require('fs');
  fs.writeFileSync('./wvs-status.txt', 'on');
  console.log('The pid and status of web video streaming is saved!');
}

function streaming_off() {
  // 讀取pid of Web Video Streaming
  fs = require('fs');
  wvs_pid = fs.readFileSync('./wvs-pid.txt', 'utf8');

  // 透過pid關閉(殺掉)Web Video Streaming
  exec = require('child_process').exec;
  exec('sudo kill ' + wvs_pid);
  console.log('The ' + wvs_pid + ' process is killed!');

  // 將off存入Web Video Streaming的狀態檔中
  fs = require('fs');
  fs.writeFileSync('./wvs-status.txt', 'off');
}