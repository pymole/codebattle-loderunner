const WebSocketClient = require('websocket').client;
const Board = require('./observer/LoderunnerBoard');

const url = 'wss://dojorena.io/codenjoy-contest/ws?user=dojorena340&code=4030082672378005857';
const boardRegex = /board=/;
const client = new WebSocketClient();

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
            const board = new Board(message.utf8Data.replace(boardRegex, ''));
            console.log(board.myPosition + '\n\n');
            connection.sendUTF('left')
        }
    });
});


client.connect(url);
