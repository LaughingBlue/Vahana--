try{
var Gpio = require('pigpio').Gpio,
  led = new Gpio(18, {mode: Gpio.OUTPUT}),
  dutyCycle = 0;
}catch(err){
	console.log(err);
}

console.log("START!");
direction = 1;

setInterval(function () {
  led.pwmWrite(dutyCycle);
	console.log(dutyCycle);
  
  if (dutyCycle === 0) {
    direction = 1;
  }else if(dutyCycle === 255){
    direction = -1;
  }
  dutyCycle += direction;
}, 5);
