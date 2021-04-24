const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const {getXY} = require('../shared/utils');
const playerSymbols = require('../shared/otherPlayer');

class PlayerObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0, real_i = board.length - 1; i < board.length; i++, real_i--) {
            if (playerSymbols.includes(board[i])) {
                const [x, y] = getXY(real_i, this.env.mapSize);
                const player = new gameObjects.Hero(x, y);
                this.env.players.set(real_i, player);
            }
        }
    }
}

module.exports = PlayerObservation;
