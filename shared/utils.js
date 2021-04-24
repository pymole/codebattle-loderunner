function getXY(index, size) {
    const y = Math.floor(index / size);
    const x = index % size;
    return [x, y]
}

function getIndex(x, y, size) {
    return y * size + x;
}

module.exports = {getXY, getIndex}
