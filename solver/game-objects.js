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


class Hero {
    
}


class Hunter {

}


class Gold {

}


class Pill {

}


class Teleport {

}

module.exports = {Point, Wall, Pipe, Ladder};
