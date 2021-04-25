// Индекс указывает на борду, которая приходит, с началом координат слева сверху,
// а начало координат этого решения указывает на левый нижний угол.
const commands = require('../shared/commands');

function getXY(index, size) {
    const y = size - Math.floor(index / size) - 1;
    const x = index % size;
    return [x, y];
}

function getIndex(x, y, size) {
    // Выдает индекс борды из внутренних координат
    return (size - y - 1) * size + x;
}

function getCommand(hero, target) {
    if (hero.x > target.x) return commands.left;
    else if (hero.x < target.x) return commands.right;
    else if (hero.y < target.y) return commands.up;
    else return commands.down;
}

module.exports = {getXY, getIndex, getCommand}
