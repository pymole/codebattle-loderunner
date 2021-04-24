const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const getXY = require('../shared/utils').getXY;
const getIndex = require('../shared/utils').getIndex;
const playerSymbols = require('../shared/otherPlayer');

class PlayerObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0; i < board.length; i++) {
            if(playerSymbols.includes(board[i])) {
                const [x, y] = getXY(i, this.env.size);
                const player = new gameObjects.Hero(x, y)
                this.env.players.set(getIndex(player.x, player.y, this.env.size), player);
            }
        }
    }
}

module.exports = PlayerObservation;
