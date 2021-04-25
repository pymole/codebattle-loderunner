const Observation = require('./observation');
const gameObjects = require('../solver/game-objects');


const {
    ladderSymbols,
    pipeSymbols,
    playerSymbols,
    hunterSymbols,
    heroSymbols,
    goldSymbols,
    portalSymbol,
    pillSymbol,
    wallsSymbols,
    pitSymbols,
} = require('../shared/gameSymbols')

const { getXY, getIndex } = require('../shared/utils');


class StaticObservation extends Observation {
    constructor(env) {
        super(env);
    }

    observe(board) {
        this.env.mapSize = Math.sqrt(board.length);
        this.env.walls.clear();
        this.env.pits.clear();
        this.env.ladders.clear();
        this.env.portals.clear();
        this.env.pipes.clear();
        this.env.players.clear();
        this.env.hunters.clear();
        this.env.gold.clear();
        this.env.pills.clear();

        for (let i = 0; i < board.length; i++) {
            // У нас перевернутая карта (y = 0 - это внизу)
            if (wallsSymbols.includes(board[i])) {
                let [x, y] = getXY(i, this.env.mapSize);
                const wall = new gameObjects.Wall(x, y, board[i] === '#');
                this.env.walls.set(i, wall);
            }

            if (ladderSymbols.includes(board[i])) {
                let [x, y] = getXY(i, this.env.mapSize);
                const ladder = new gameObjects.Ladder(x, y);
                this.env.ladders.set(i, ladder);
            }

            if (pipeSymbols.includes(board[i])) {
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

            if (goldSymbols.has(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                const gold = new gameObjects.Gold(x, y, goldSymbols.get(board[i]))
                this.env.gold.set(i, gold);
            }

            if (heroSymbols.includes(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                const hero = new gameObjects.Hero(x, y)
                this.env.hero = hero;
            }

            if (board[i] == portalSymbol) {
                const [x, y] = getXY(i, this.env.mapSize);
                const portal = new gameObjects.Teleport(x, y)
                this.env.portals.set(i, portal);
            }

            if (pitSymbols.includes(board[i])) {
                const [x, y] = getXY(i, this.env.mapSize);
                const pit = new gameObjects.Pit(x, y)
                this.env.pits.set(i, pit);
            }
        }

        return true;
    }
}

module.exports = StaticObservation;
