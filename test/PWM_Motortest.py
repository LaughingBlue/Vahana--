#! /usr/bin/python

import RPi.GPIO as gpio

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)
gpio.setup(7, gpio.OUT)
gpio.setup(11, gpio.OUT)
gpio.setup(13, gpio.OUT)
gpio.setup(15, gpio.OUT)

while True:
    cmd = raw_input("Enter your command ('q' to exit):")
    if cmd == 'q':
        break
    if cmd == 'go' or cmd =='g':
        gpio.output(7, True)
        gpio.output(11, False)
        gpio.output(13, True)
        gpio.output(15, False)
    elif cmd == 'stop' or cmd =='s':
        gpio.output(7, False)
        gpio.output(11, False)
        gpio.output(13, False)
        gpio.output(15, False)
    elif cmd == 'back' or cmd =='b':
        gpio.output(7, False)
        gpio.output(11, True)
        gpio.output(13, False)
        gpio.output(15, True)
    elif cmd == 'right' or cmd =='r':
        gpio.output(7, True)
        gpio.output(11, False)
        gpio.output(13, False)
        gpio.output(15, True)
    elif cmd == 'left' or cmd =='l':
        gpio.output(7, False)
        gpio.output(11, True)
        gpio.output(13, True)
        gpio.output(15, False)
    else:
        gpio.output(7, False)
        gpio.output(11, False)
        gpio.output(13, False)
        gpio.output(15, False)