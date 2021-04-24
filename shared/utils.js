// Индекс указывает на борду, которая приходит, с началом координат слева сверху,
// а начало координат этого решения указывает на левый нижний угол.

function getXY(index, size) {
    const y = size - Math.floor(index / size) - 1;
    const x = index % size;
    return [x, y];
}

function getIndex(x, y, size) {
    // Выдает индекс борды из внутренних координат
    return (size - y - 1) * size + x;
}

module.exports = {getXY, getIndex}
