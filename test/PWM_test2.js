try {
  var Gpio = require('pigpio').Gpio,
    led = new Gpio(18, { mode: Gpio.OUTPUT }),//12/13/18/19 hardware pwm
    dutyCycle = 0;
} catch (err) {
  console.log(err);
}

console.log("START!");
direction = 1;

setInterval(function () {
  led.pwmWrite(dutyCycle);
  console.log(dutyCycle);

  if (dutyCycle === 0) {
    direction = 1;
  } else if (dutyCycle === 255) {
    direction = -1;
  }
  dutyCycle += direction;
}, 5);

process.on("SIGINT", function () {
  led.pwmWrite(0);
  console.log("Caught interrupt signal");
  process.exit();
});
