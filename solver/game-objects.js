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

class Pit extends Point {
    constructor(x, y, isDestructible) {
        super(x, y);
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
    constructor(x, y, value) {
        super(x, y);
        this.value = value;
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

module.exports = {Point, Wall, Pipe, Ladder, Hero, Hunter, Gold, Pill, Teleport, Pit};
