const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const getXY = require('../shared/utils').getXY;
const getIndex = require('../shared/utils').getIndex;
const goldSymbol = require('../shared/gold');

class GoldObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0; i < board.length; i++) {
            if(goldSymbol.has(board[i])) {
                const [x, y] = getXY(i, this.env.size);
                const gold = new gameObjects.Gold(x, y, goldSymbol.get(board[i]))
                this.env.gold.set(getIndex(gold.x, gold.y, this.env.size), gold);
            }
        }
    }
}

module.exports = GoldObservation;
