const WebSocketClient = require('websocket').client;
const StaticObservation = require('./observer/StaticObservation')

const Environment = require('./solver/environment').Environment
const url = 'wss://dojorena.io/codenjoy-contest/ws?user=dojorena489&code=3820819539230199797';
const client = new WebSocketClient();

const env = new Environment()
const staticObserver = new StaticObservation(env);

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {

    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Connection Closed');
    });
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            const board = message.utf8Data.substr(6);
            staticObserver.observe(board);
            connection.sendUTF('left')
        }
    });
});

client.connect(url);
