const WebSocketClient = require('websocket').client;
const StaticObservation = require('./observer/StaticObservation')
const {getIndex, getCommand} = require('./shared/utils');
const {dijkstra} = require('./solver/pathfinding');
const {Environment} = require('./solver/environment');

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
            // Парсинг
            const board = message.utf8Data.substr(6);
            staticObserver.observe(board);

            // Обсчет
            const hero = env.hero;
            const graph = env.createGraph();

            const startNode = graph.get(getIndex(hero.x, hero.y, env.mapSize))
            const targets = new Set();


            for (let index of env.gold.keys()) {
                if (graph.has(index)) targets.add(graph.get(index));
            }

            console.log(hero, graph, env.ladders);
            const path = dijkstra(startNode, targets);

            if(path) {
                const {x, y} = path[1];

                const command = getCommand(hero, {x, y})
                connection.sendUTF(command)
            }
            connection.sendUTF('left')
        }
    });
});

client.connect(url);
