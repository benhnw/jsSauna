"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const events_1 = require("events");
let Gpio;
try {
    Gpio = require("onoff").Gpio;
}
catch (err) {
    util_1.log("onoff is not installed! using fake relay now!");
}
class Relay extends events_1.EventEmitter {
    constructor(pin) {
        super();
        this.pin = pin;
        this.turnedOn = false;
        if (Gpio)
            this.gpio = new Gpio(this.pin, "out");
    }
    turnOn() {
        if (this.turnedOn)
            return;
        this.turnedOn = true;
        if (!this.gpio)
            return this.emit("change", this.turnedOn);
        ;
        try {
            this.gpio.writeSync(1);
            this.emit("change", this.turnedOn);
        }
        catch (err) {
            this.turnedOn = false;
            throw err;
        }
    }
    turnOff() {
        if (!this.turnedOn)
            return;
        this.turnedOn = false;
        if (!this.gpio)
            return this.emit("change", this.turnedOn);
        try {
            this.gpio.writeSync(0);
            this.emit("change", this.turnedOn);
        }
        catch (err) {
            this.turnedOn = true;
            throw err;
        }
    }
}
exports.default = Relay;
//# sourceMappingURL=Relay.js.map