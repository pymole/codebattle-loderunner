const Observation = require('./observation');
const staticObjects = require('../shared/staticObjects');
const gameObjects = require('../solver/game-objects');
const playerSymbols = require('../shared/otherPlayer');
const hunterSymbols = require('../shared/hunter');
const goldSymbol = require('../shared/gold');
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
            }

            if (staticObjects.ladder.includes(board[i])) {
                let [x, y] = getXY(i, this.env.mapSize);
                const ladder = new gameObjects.Ladder(x, y);
                this.env.ladders.set(i, ladder);
            }

            if (staticObjects.pipe.includes(board[i])) {
                let [x, y] = getXY(i, this.env.mapSize);
                const pipe = new gameObjects.Pipe(x, y);
                this.env.pipes.set(i, pipe);
            }

            if (playerSymbols.includes(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                const player = new gameObjects.Hero(x, y);
                this.env.players.set(i, player);
            }

            if(hunterSymbols.includes(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                const hunter = new gameObjects.Hunter(x, y);
                this.env.hunters.set(i, hunter);
            }

            if (goldSymbol.has(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                const gold = new gameObjects.Gold(x, y, goldSymbol.get(board[i]))
                this.env.gold.set(i, gold);
            }
        }

        return true;
    }
}

module.exports = StaticObservation;
