const getXY = (index, size) => {
    const y = Math.ceil(index / size);
    const x = index % size;
    return [x,y]
}

function getIndex(x, y, size) {
    return y * size + x;
}

module.exports = {getXY, getIndex}
