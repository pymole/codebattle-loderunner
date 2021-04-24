const Observation = require('./observation');
const staticObjects = require('../shared/staticObjects');
const gameObjects = require('../solver/game-objects');
const { getXY } = require('../shared/utils');


class StaticObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        this.env.mapSize = Math.sqrt(board.length);
        console.log('asdasd');
        for (let i = 0, real_i = board.length - 1; i < board.length; i++, real_i--) {
            // У нас перевернутая карта (y = 0 - это внизу)
            
            if (board[i] === '#' || board[i] === '☼') {
                const [x, y] = getXY(real_i, this.env.mapSize);
                const wall = new gameObjects.Wall(x, y, board[i] === '#');
                this.env.walls.set(real_i, wall);
                continue;
            }

            if (staticObjects.ladder.includes(board[i])) {
                const [x, y] = getXY(real_i, this.env.mapSize);
                const ladder = new gameObjects.Ladder(x, y);
                this.env.ladders.set(real_i, ladder);
                continue;
            }

            if (staticObjects.pipe.includes(board[i])) {
                const [x, y] = getXY(real_i, this.env.mapSize);
                const pipe = new gameObjects.Pipe(x, y);
                this.env.pipes.set(real_i, pipe);
            }
        }

        // console.log(this.env);

        return true;
    }
}

module.exports = StaticObservation;
