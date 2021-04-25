const {Wall, Pipe, Ladder, Point} = require('./game-objects');
const { getIndex } = require('../shared/utils');

class Node extends Point {
    constructor(x, y) {
        super(x, y);
        this.children = new Map();
    }

    addChild(node) {
        this.children.set(node, 0);
    }
}

class Environment {
    constructor() {
        this.mapSize = 0;

        this.walls = new Map();
        this.ladders = new Map();
        this.portals = new Map();
        this.pipes = new Map();
        this.gold = new Map();
        this.hunters = new Map();
        this.players = new Map();
        this.pills = new Map();
        this.pits = new Map();
        this.hero = {};
    }

    createGraph() {
        const graph = new Map();
        const visited = new Set();

        for (const wall of this.walls.values()) {
            const aboveWallY = wall.y + 1;
            // Отсекаем стены, которые находятся по краям и над которыми не пусто
            if (wall.x < 1 || this.mapSize - 1 <= wall.x ||
                aboveWallY < 1 || aboveWallY >= this.mapSize - 1 ||
                !this.isEmpty(getIndex(wall.x, aboveWallY, this.mapSize))) {
                // console.log('eleminated', wall.x, wall.y, );
                continue;
            }

            // console.log(wall);

            const aboveWallNode = this.aboveWallPattern(wall.x, aboveWallY, visited, graph);
            visited.add(aboveWallNode);
        }

        for (const player of this.players.values()) {
            const abovePlayerY = player.y + 1;
            if (!this.isEmpty(getIndex(player.x, abovePlayerY, this.mapSize))) {
                // console.log('eleminated', wall.x, wall.y, );
                continue;
            }

            // console.log(wall);

            const abovePlayerNode = this.aboveWallPattern(player.x, abovePlayerY, visited, graph);
            visited.add(abovePlayerNode);
        }

        for (const pipe of this.pipes.values()) {
            // console.log('pipe', pipe);
            const centerPipeNode = this.pipePattern(pipe.x, pipe.y, visited, graph);
            visited.add(centerPipeNode);
        }

        for (const ladder of this.ladders.values()) {
            // console.log('ladder', ladder);
            const centerLadderNode = this.ladderPattern(ladder.x, ladder.y, visited, graph);
            visited.add(centerLadderNode);
        }
        return graph;
    }

    aboveWallPattern(aboveWallX, aboveWallY, visited, graph) {
        // console.log(aboveWallX, aboveWallY);
        const centerNode = this.getOrCreateNode(aboveWallX, aboveWallY, graph);

        this.linkNodeToSideNodes(centerNode, aboveWallX - 1, aboveWallY, visited, graph);
        this.linkNodeToSideNodes(centerNode, aboveWallX + 1, aboveWallY, visited, graph);

        return centerNode;
    }

    pipePattern(pipeX, pipeY, visited, graph) {

        const pipeNode = this.aboveWallPattern(pipeX, pipeY, visited, graph);

        // Также можно спрыгнуть вниз
        this.linkNodeToSideNodes(pipeNode, pipeX, pipeY - 1, visited, graph);

        return pipeNode;
    }

    ladderPattern(ladderX, ladderY, visited, graph) {

        const centerNode = this.pipePattern(ladderX, ladderY, visited, graph);

        const aboveLadderY = ladderY + 1;
        const aboveLadderIndex = getIndex(ladderX, aboveLadderY, this.mapSize);

        // Соединяем лестницу с верхушкой, если там не солид
        if (!this.isSolid(aboveLadderIndex)) {
            const aboveLadderNode = this.getOrCreateNode(ladderX, aboveLadderY, graph);
            centerNode.addChild(aboveLadderNode);

            // Если наверху пустота, то сверху запускаем такой же паттерн, как и у труб
            if (!this.pipes.has(aboveLadderIndex) && !this.ladders.has(aboveLadderIndex) && !visited.has(aboveLadderNode)) {
                console.log('sosi hui')
                this.pipePattern(ladderX, aboveLadderY, visited, graph);
                visited.add(aboveLadderNode);
            }
        }

        return centerNode;
    }

    linkNodeToSideNodes(node, x, y, visited, graph) {
        // Боковые узлы - это те, с которых можно упасть. Право, лево, низ

        // Соединяемся с соседом, если там не стена
        const sideNodeIndex = getIndex(x, y, this.mapSize);

        if (!this.isSolid(sideNodeIndex)) {
            const sideNode = this.getOrCreateNode(x, y, graph);
            node.addChild(sideNode);
            // Если на стороне пустота, то падаем
            if (!this.pipes.has(sideNodeIndex) && !this.ladders.has(sideNodeIndex) && !visited.has(sideNode)) {
                this.fillFallNodes(x, y, visited, graph);

            }
        }
    }

    fillFallNodes(x, upY, visited, graph) {
        let upIndex = getIndex(x, upY, this.mapSize);
        let upNode = graph.get(upIndex);
        // console.log(visited.has(upNode));

        let downY = upY - 1;
        let downIndex = getIndex(x, downY, this.mapSize);

        // Если под узлом нет твердой поверхности и лестницы, а также узел не на трубе, то продолжаем опускаться
        while (!this.isSolid(downIndex) && !this.ladders.has(downIndex) && !this.pipes.has(upIndex)) {
            let downNode = this.getOrCreateNode(x, downY, graph);

            upNode.addChild(downNode);
            visited.add(upNode);

            upNode = downNode;
            upIndex = downIndex;

            downY--;
            downIndex = getIndex(x, downY, this.mapSize);
        }
        // console.log('fall end');
    }

    getOrCreateNode(x, y, graph) {
        // console.log(x, y);
        const index = getIndex(x, y, this.mapSize);

        if (graph.has(index)) {
            return graph.get(index);
        }

        const node = new Node(x, y);
        graph.set(index, node);

        return node;
    }

    isEmpty(index) {
        // console.log(getXY(index, this.mapSize), !this.walls.has(index), !this.pipes.has(index), !this.ladders.has(index));
        return !this.isSolid(index) && !this.pipes.has(index) && !this.ladders.has(index);
    }

    isSolid(index) {
        return this.walls.has(index) || this.players.has(index);
    }
}


// console.time('a');
// env.createGraph()
// for (const n of env.createGraph().values()) {
//     console.log(n);
// }
// console.timeEnd('a');

module.exports = {Node, Environment};
