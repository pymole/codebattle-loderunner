class Environment {
    constructor() {
        this.map = [];
        this.size = 0;
        this.walls = new Set();
        this.bricks = new Set();
        this.ladder = new Set();
        this.pipe = new Set();
    }
}

module.exports = Environment;
