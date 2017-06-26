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
        .find({ family: 'IPv4', internal: false })
        .value()
        .address;
    console.log('Server IP=' + ServerIP);

} catch (err) {
    console.log('MODULE LOADING ERR:\n' + err);
}

router.get('/', function (req, res) {
    var data = {
        serverip: ServerIP
    }
    res.render('View-index', data);
});

function streaming_on() {
    exec = require('child_process').exec;
    web_vs = exec('python3 ./PiCam-Streamer.py', shell = false);
    pcs_pid = web_vs.pid + 1;
    console.log('pid=' + pcs_pid);

    // 將pid of Web Video Streaming存入檔案中
    fs = require('fs');
    fs.writeFileSync('./PiCam-Streamer-pid', pcs_pid);

    // 將on存入Web Video Streaming的狀態檔中
    fs = require('fs');
    fs.writeFileSync('./PiCam-Streamer-status', 'on');
    console.log('The pid and status of web video streaming is saved!');
}

function streaming_off() {
    // 讀取pid of Web Video Streaming
    fs = require('fs');
    pcs_pid = fs.readFileSync('./PiCam-Streamer-pid', 'utf8');

    // 透過pid關閉(殺掉)Web Video Streaming
    exec = require('child_process').exec;
    exec('sudo kill ' + pcs_pid);
    console.log('The ' + pcs_pid + ' process is killed!');

    // 將off存入Web Video Streaming的狀態檔中
    fs = require('fs');
    fs.writeFileSync('./PiCam-Streamer-status', 'off');
}

function move_on(directionAngle, outputPower) {
    if (directionAngle >= 345 || directionAngle <= 15) { //E

    } else if (directionAngle > 15 && directionAngle < 75) { //between E~N

    } else if (directionAngle >= 75 && directionPnAngle <= 105) { //N

    } else if (directionAngle > 105 && directionAngle < 165) { //between N~W

    } else if (directionAngle >= 165 && directionAngle <= 195) { //W

    } else if (directionAngle > 195 && directionAngle < 255) { //between W~S

    } else if (directionAngle >= 255 && directionAngle <= 285) { //S

    } else if (directionAngle > 285 && directionAngle < 345) { //between S~E

    }
}

function forceGC() {
    if (global.gc)
        global.gc();
    else
        console.warn('[Garbage Collection] NOT AVAILABLE ! Restart Vahana-KAI core as `node --expose-gc start.js`.');
}
