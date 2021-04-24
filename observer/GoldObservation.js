const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const {getXY} = require('../shared/utils');
const goldSymbol = require('../shared/gold');

class GoldObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0, real_i = board.length - 1; i < board.length; i++, real_i--) {
            if (goldSymbol.has(board[i])) {
                const [x, y] = getXY(real_i, this.env.mapSize);
                const gold = new gameObjects.Gold(x, y, goldSymbol.get(board[i]))
                this.env.gold.set(real_i, gold);
            }
        }
    }
}

module.exports = GoldObservation;
