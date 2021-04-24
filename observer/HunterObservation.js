const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');
const {getXY} = require('../shared/utils');
const hunterSymbols = require('../shared/hunter');

class HunterObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        for (let i = 0, real_i = board.length - 1; i < board.length - 1; i++, real_i--) {
            if(hunterSymbols.includes(board[i])) {
                const [x, y] = getXY(real_i, this.env.mapSize);
                const hunter = new gameObjects.Hunter(x, y);
                this.env.hunters.set(real_i, hunter);
            }
        }
    }
}

module.exports = HunterObservation;
