const Observation = require('./observation');
const {Point, Hunter} = require('../solver/game-objects');
const {getXY, getIndex} = require('../shared/utils');
const playerSymbols = require('../shared/otherPlayer');
const hunterSymbols = require('../shared/hunter');

class PlayerObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        const newHunters = new Map();
        for (let hunter of this.env.hunters.values()) {
            const centerPointIndex = getIndex(hunter.x, hunter.y, this.env.mapSize)
            const leftPointIndex = getIndex(hunter.x - 1, hunter.y, this.env.mapSize)
            const rightPointIndex = getIndex(hunter.x + 1, hunter.y, this.env.mapSize)
            const UpPointIndex = getIndex(hunter.x, hunter.y + 1, this.env.mapSize)
            const DownPointIndex = getIndex(hunter.x, hunter.y - 1, this.env.mapSize)
            console.log(hunter);

            const indexes = [centerPointIndex, leftPointIndex, rightPointIndex, UpPointIndex, DownPointIndex]
            let indexesUpdated = [];

            indexes.map((index) => {
                if(hunterSymbols.includes(board[index])) indexesUpdated.push(index);
            })




            indexesUpdated.map((hunter) => {
                let [x, y] = getXY(hunter, this.env.mapSize);
                const newHunter = new Hunter(x, y);
                newHunters.set(indexesUpdated, newHunter);
            })
        }

        this.env.hunters = newHunters;
    }
}

module.exports = PlayerObservation;
