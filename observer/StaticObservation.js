const Observation = require('./observation');
const staticObjects = require('../shared/staticObjects');
const gameObjects = require('../solver/game-objects');
const getXY = require('../shared/utils').getXY;
const getIndex = require('../shared/utils').getIndex;

class StaticObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        this.env.size = Math.sqrt(board.length);
        for(let i = 0; i < board.length; i++) {
            if(board[i] === '#' || board[i] === '☼') {
                const [x, y] = getXY(i, this.env.size);
                const wall = new gameObjects.Wall(x, y, board[i] === '#')
                this.env.walls.set(getIndex(wall.x, wall.y, this.env.size), wall)
            }

            if(staticObjects.ladder.includes(board[i])) {
                const [x, y] = getXY(i, this.env.size);
                const ladder = new gameObjects.Ladder(x, y)
                this.env.ladder.set(getIndex(ladder.x, ladder.y, this.env.size), ladder)
            }

            if(staticObjects.pipe.includes(board[i])) {
                const [x, y] = getXY(i, this.env.size);
                const pipe = new gameObjects.Pipe(x, y)
                this.env.pipe.set(getIndex(pipe.x, pipe.y, this.env.size), pipe)
            }
        }
        return true;
    }
}

module.exports = StaticObservation;
