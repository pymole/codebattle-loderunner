const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const getXY = require('../shared/utils').getXY;
const getIndex = require('../shared/utils').getIndex;
const hunterSymbols = require('../shared/hunter');

class HunterObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0; i < board.length; i++) {
            if(hunterSymbols.includes(board[i])) {
                const [x, y] = getXY(i, this.env.size);
                const hunter = new gameObjects.Hunter(x, y)
                this.env.hunters.set(getIndex(hunter.x, hunter.y, this.env.size), hunter);
            }
        }
    }
}

module.exports = HunterObservation;
