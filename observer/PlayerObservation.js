const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const {getXY, getIndex} = require('../shared/utils');
const playerSymbols = require('../shared/otherPlayer');

class PlayerObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0, ; i < board.length; i++) {
            if (playerSymbols.includes(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                y = this.env.mapSize - y - 1;
                const player = new gameObjects.Hero(x, y);
                this.env.players.set(getIndex(x, y, this.env.mapSize), player);
            }
        }
    }
}

module.exports = PlayerObservation;
