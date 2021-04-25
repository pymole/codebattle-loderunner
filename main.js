const WebSocketClient = require('websocket').client;
const StaticObservation = require('./observer/StaticObservation')
const GoldObservation = require('./observer/GoldObservation');
const PlayerObservation = require('./observer/PlayerObservation');

const Environment = require('./solver/environment').Environment

const url = 'wss://dojorena.io/codenjoy-contest/ws?user=dojorena340&code=4030082672378005857';
const boardRegex = /board=/;
const client = new WebSocketClient();

const env = new Environment()
const staticObserver = new StaticObservation(env);
const goldObservation = new GoldObservation(env);
const playerObservation = new PlayerObservation(env);

let isFirstMassage = true;

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
        const board = message.utf8Data.substr(6);
        if(isFirstMassage) staticObserver.observe(board);
        else {

        }
        // goldObservation.observe(board);
        // playerObservation.observe(board);
        connection.sendUTF('left')
        isFirstMassage = false;
        console.log(env.hunters);
    });
});

client.connect(url);
