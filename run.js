var Turret = require('./turret');

var turret = new Turret('00:11:67:E3:CD:CE', 3);

var keypress = require('keypress');
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

//stdin.setEncoding( 'utf8' );
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'c':
            console.log('Connecting turret...');
            turret.connect();
            break;
        case 'd':
            console.log('Disconnecting turret...');
            turret.disconnect();
            break;
        case 'up':
            turret.up();
            break;
        case 'down':
            turret.down();
            break;
        case 'left':
            turret.left();
            break;
        case 'right':
            turret.right();
            break;
        case 'space':
            turret.fire();
            break;
        default:
    }

    //Quit
    if (key && key.ctrl && key.name == 'c') {
        process.exit();
    }
});

console.log('Ready.');
