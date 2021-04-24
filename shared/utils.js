const getXY = (index, size) => {
    const y = Math.ceil(index / size);
    const x = index % size;
    return [x,y]
}

module.exports.getXY = getXY;