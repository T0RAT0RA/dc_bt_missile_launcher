var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var helpers = require('./helpers');

class Turret {
    constructor(address, channel) {
        this.address = address;
        this.channel = channel;

        this.head = 0x0a;
        this.tail = 0x0d;
        this.turn_turret = [0x30,0x35,0x30,0x34,0x31];
        this.is_connected = false;
    }

    connect() {
        if (this.is_connected) {
            return;
        }

        btSerial.connect(this.address, this.channel, this.onConnectionSuccess.bind(this), this.onConnectionFail.bind(this));
    }

    onConnectionFail() {
        console.log('Cannot connect.');
        this.is_connected = true;
    }

    onConnectionSuccess() {
        this.is_connected = true;
        console.log('Turret connected.');

        btSerial.on('data', this.onDataReceived.bind(this));

        btSerial.on('closed', this.onClosed.bind(this));
    }

    disconnect() {
        if (!this.is_connected) {
            return;
        }

        btSerial.close();
    }

    onClosed() {
        this.is_connected = false;
        console.log('Turret disconnected.');
    }

    onDataReceived(buffer) {
        //Mesage received all the time <Buffer 55 04 00 38 00 00 c4>
        console.log('Received: ', buffer);
    }

    checkIfConnected() {
        if (!this.is_connected) {
            console.log('Turret is not connected.');
            return false;
        }
        return true;
    }

    send(message) {
        console.log('Sending: ', message);
        btSerial.write(message, function(err, bytesWritten) {
            console.log('Sent: ', bytesWritten);
            if (err) {
                console.log('ERROR: ', err);
            };
        });
    }

    up() {
        if (!this.checkIfConnected()) { return false; }
        console.log('up');
        let msg_bytes = [
            [this.head, this.turn_turret, helpers.checksum(this.turn_turret), this.tail],

            [this.head],
            [this.turn_turret, helpers.checksum(this.turn_turret)],
            [this.tail],

            [this.turn_turret],
            [this.turn_turret, helpers.checksum(this.turn_turret)],
        ];

        for (let bytes of msg_bytes) { //Flatten array of bytes and convert into Buffer
            this.send(Buffer.from([].concat.apply([], bytes)));
        }
    }

    down() {
        if (!this.checkIfConnected()) { return false; }
        console.log('down');
    }

    left() {
        if (!this.checkIfConnected()) { return false; }
        console.log('left');
    }

    right() {
        if (!this.checkIfConnected()) { return false; }
        console.log('right');
    }

    fire() {
        if (!this.checkIfConnected()) { return false; }
        console.log('FIRE!');
    }
}


module.exports = Turret;
