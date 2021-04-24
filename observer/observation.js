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


const observations = [];

module.exports = Observation;
