const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const {getXY} = require('../shared/utils');
const goldSymbol = require('../shared/gold');

class GoldObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0; i < board.length; i++) {
            if (goldSymbol.has(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                y = this.env.mapSize - y - 1;
                const gold = new gameObjects.Gold(x, y, goldSymbol.get(board[i]))
                this.env.gold.set(getIndex(x, y, this.env.mapSize), gold);
            }
        }
    }
}

module.exports = GoldObservation;
