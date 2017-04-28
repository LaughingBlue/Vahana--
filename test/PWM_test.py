import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
PWM_PIN = 12
GPIO.setup(PWM_PIN, GPIO.OUT)

pwm = GPIO.PWM(PWM_PIN, 500)
pwm.start(0)

try:
    while True:
        duty_s = raw_input("Enter Brightness (0 to 100):")
        duty = int(duty_s)

        if duty >= 0 and duty <=100 :
            pwm.ChangeDutyCycle(duty)

except KeyboardInterrupt:
    print "Exception: KeyboardInterrupt"

finally:
    pwm.stop()
    GPIO.cleanup()          

