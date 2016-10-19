var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var helpers = require('./helpers');

let address = '00:11:67:E3:CD:CE';
let channel = 3;

btSerial.connect(address, channel, function() {
    console.log('Connected.');

    let messages = [
        // Buffer.from([0x0a, 0x30,0x35,0x30,0x34,0x31,0x46,0x41, 0x0d]),
        //
        // Buffer.from([0x0a]),
        // Buffer.from([0x30,0x35,0x30,0x34,0x31,0x46,0x41]),
        // Buffer.from([0x0d]),
        //
        // Buffer.from([0x0a, 0x30,0x35,0x30,0x34,0x31,0x46,0x41, 0x0d].reverse()),
        //
        // Buffer.from([0x0a]),
        // Buffer.from([0x30,0x35,0x30,0x34,0x31,0x46,0x41].reverse()),
        // Buffer.from([0x0d]),


        Buffer.from([0x30,0x35,0x30,0x34,0x31,0x46,0x41]),
        // Buffer.from([0x30,0x35,0x30,0x34,0x31,0x46,0x41].reverse()),
    ];

    for (let message of messages) {
        console.log('Sending: ', message);
        btSerial.write(message, function(err, bytesWritten) {
            console.log('Written: ', bytesWritten);
            if (err) {
                console.log('ERROR: ', err);
            };
        });
    }

    //Mesage received all the time <Buffer 55 04 00 38 00 00 c4>
    btSerial.on('data', function(buffer) {
        console.log('Received: ', buffer);
    });
}, function () {
    console.log('Cannot connect.');
});

//Is it needed??
btSerial.close();
