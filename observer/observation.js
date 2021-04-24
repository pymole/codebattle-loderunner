const staticObjects = require('../shared/staticObjects');
const getXY = require('../shared/utils').getXY;

class Observation {
    constructor(env) {
        this.env = env;
    }

    observe(board) {
        // Возвращает событие (строку или null в случае, когда событие не случилось),
        // а также флаг о прекращении наблюдения (true - прекращаем, false - продолжаем наблюдать).
    }
}


// Наследуемся от Observation и описываем все,
// что отслеживается на карте, как отдельный класс.


// Здесь хранятся все наблюдения, которые должны просчитаться на тике
// Если объект наблюдения возвращает флаг о прекращении, то удаляем его из списка наблюдений.

class StaticObservation extends Observation {
    constructor(env) {
        super(env);
        console.log(this.env);
    }

    observe(board) {
        this.env.size = Math.sqrt(board);
        this.env.bricks = new Set();
        this.env.walls = new Set();
        this.env.ladder = new Set();
        this.env.pipe = new Set();
        console.log(this.env);

        for(let i = 0; i < board.length; i++) {
            board[i] === '#' && this.env.bricks.add(getXY(i, this.env.size))
            board[i] === '☼' && this.env.walls.add(getXY(i, this.env.size))
            staticObjects.ladder.includes(board[i]) && this.env.ladder.add(getXY(i, this.env.size))
            staticObjects.pipe.includes(board[i]) && this.env.pipe.add(getXY(i, this.env.size))
        }
        return true;
    }
}

const observations = [];

module.exports.StaticObservation = StaticObservation;