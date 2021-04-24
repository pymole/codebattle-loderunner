class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Wall extends Point {
    constructor(x, y, isDestructible) {
        super(x, y);
        this.isDestructible = isDestructible;
    }
}


class Pipe extends Point {
    constructor(x, y) {
        super(x, y);
    }
}


class Ladder extends Point {
    constructor(x, y) {
        super(x, y);
    }
}


class Hero extends Point {
    constructor(x, y) {
        super(x, y);
    }
}


class Hunter extends Point  {
    constructor(x, y) {
        super(x, y);
    }
}


class Gold extends Point  {
    constructor(x, y, type) {
        super(x, y);
        this.type = type;
    }
}


class Pill extends Point  {
    constructor(x, y) {
        super(x, y);
    }
}


class Teleport extends Point  {
    constructor(x, y) {
        super(x, y);
    }
}

module.exports = {Point, Wall, Pipe, Ladder, Hero, Hunter, Gold, Pill, Teleport};