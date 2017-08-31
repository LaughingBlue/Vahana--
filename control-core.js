/*
try {
} catch (err) {
    console.log('MODULE LOADING ERR:\n' + err);
}
*/
//avoid hardware PWM GPIO 12/13/18/19(pins 32/33/12/35) 
var Gpio = require('pigpio').Gpio,
    motorL1 = new Gpio(4, { mode: Gpio.OUTPUT }),
    motorL2 = new Gpio(17, { mode: Gpio.OUTPUT }),
    motorR1 = new Gpio(27, { mode: Gpio.OUTPUT }),
    motorR2 = new Gpio(22, { mode: Gpio.OUTPUT }),
    dutyCycle = 0;

const MAX_DUTYCYCLE = 255;
const OUPUTPOWER_COEF = 50;

module.exports = function(){

    this.streaming_on = function() {
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

    this.streaming_off = function() {
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

    var targetPower;
    const DIR_RANGE = 60;

    this.move_on = function(directionAngle, powerDomain) {
        directionAngle = Math.round(directionAngle);
        //powerDomain = Math.round(powerDomain);
        targetPower = Math.round(MAX_DUTYCYCLE * powerDomain);
        if(powerDomain == 0){
            motorL1.pwmWrite(0);
            motorL2.pwmWrite(0);
            motorR1.pwmWrite(0);
            motorR2.pwmWrite(0);
            console.log('stop');
        } else if (directionAngle >= 345 || directionAngle <= 15) { //E
            motorL1.pwmWrite(targetPower);
            motorL2.pwmWrite(0);
            motorR1.pwmWrite(0);
            motorR2.pwmWrite(targetPower);
            console.log('E targetPower=' + targetPower);
        } else if (directionAngle > 15 && directionAngle < 75) { //between E~N
            directionAngle -= 15;
            motorL1.pwmWrite(targetPower);
            motorL2.pwmWrite(0);
            motorR1.pwmWrite(Math.round(targetPower * (directionAngle / DIR_RANGE)));
            motorR2.pwmWrite(0);
            console.log('between E~N targetPower=' + targetPower + ' ' + Math.round(targetPower * (directionAngle / DIR_RANGE)));
        } else if (directionAngle >= 75 && directionAngle <= 105) { //N
            motorL1.pwmWrite(targetPower);
            motorL2.pwmWrite(0);
            motorR1.pwmWrite(targetPower);
            motorR2.pwmWrite(0);
            console.log('N targetPower=' + targetPower);
        } else if (directionAngle > 105 && directionAngle < 165) { //between N~W
            directionAngle = Math.abs(directionAngle - 165);
            motorL1.pwmWrite(Math.round(targetPower * (directionAngle / DIR_RANGE)));
            motorL2.pwmWrite(0);
            motorR1.pwmWrite(targetPower);
            motorR2.pwmWrite(0);
            console.log('between N~W targetPower=' + targetPower + ' ' + Math.round(targetPower * (directionAngle / DIR_RANGE)));
        } else if (directionAngle >= 165 && directionAngle <= 195) { //W
            motorL1.pwmWrite(0);
            motorL2.pwmWrite(targetPower);
            motorR1.pwmWrite(targetPower);
            motorR2.pwmWrite(0);
            console.log('W targetPower=' + targetPower);
        } else if (directionAngle > 195 && directionAngle < 255) { //between W~S
            directionAngle = Math.abs(directionAngle - 255);
            motorL1.pwmWrite(0);
            motorL2.pwmWrite(Math.round(targetPower * (directionAngle / DIR_RANGE)));
            motorR1.pwmWrite(0);
            motorR2.pwmWrite(targetPower);
            console.log('between W~S targetPower=' + targetPower + ' ' + Math.round(targetPower * (directionAngle / DIR_RANGE)));
        } else if (directionAngle >= 255 && directionAngle <= 285) { //S
            motorL1.pwmWrite(0);
            motorL2.pwmWrite(targetPower);
            motorR1.pwmWrite(0);
            motorR2.pwmWrite(targetPower);
            console.log('S targetPower=' + targetPower);
        } else if (directionAngle > 285 && directionAngle < 345) { //between S~E
            directionAngle = Math.abs(directionAngle - 345);
            motorL1.pwmWrite(0);
            motorL2.pwmWrite(targetPower);
            motorR1.pwmWrite(0);
            motorR2.pwmWrite(Math.round(targetPower * (directionAngle / DIR_RANGE)));
            console.log('between S~E targetPower=' + targetPower + ' ' + Math.round(targetPower * (directionAngle / DIR_RANGE)));
        }
    }

    this.resetPWM = function(){
        motorL1.pwmWrite(0);
        motorL2.pwmWrite(0);
        motorR1.pwmWrite(0);
        motorR2.pwmWrite(0);
    }

    this.forceGC = function () {
        if (global.gc)
            global.gc();
        else
            console.warn('[Garbage Collection] NOT AVAILABLE ! Restart Vahana-KAI core as `node --expose-gc start.js`.');
    }
}
