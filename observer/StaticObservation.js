const Observation = require('./observation');
const staticObjects = require('../shared/staticObjects');
const gameObjects = require('../solver/game-objects');
const { getXY, getIndex } = require('../shared/utils');


class StaticObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        this.env.mapSize = Math.sqrt(board.length);
        
        for (let i = 0; i < board.length; i++) {
            // У нас перевернутая карта (y = 0 - это внизу)
            
            if (board[i] === '#' || board[i] === '☼') {
                let [x, y] = getXY(i, this.env.mapSize);
                const wall = new gameObjects.Wall(x, y, board[i] === '#');
                this.env.walls.set(i, wall);
                continue;
            }

            if (staticObjects.ladder.includes(board[i])) {
                let [x, y] = getXY(i, this.env.mapSize);
                const ladder = new gameObjects.Ladder(x, y);
                this.env.ladders.set(i, ladder);
                continue;
            }

            if (staticObjects.pipe.includes(board[i])) {
                let [x, y] = getXY(i, this.env.mapSize);
                const pipe = new gameObjects.Pipe(x, y);
                this.env.pipes.set(i, pipe);
            }
        }

        return true;
    }
}

module.exports = StaticObservation;
