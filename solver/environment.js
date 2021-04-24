const {Wall, Pipe, Ladder, Point} = require('./game-objects');


class Node extends Point {
    constructor(x, y) {
        super(x, y);
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}



class Environment {
    constructor() {
        this.map = [];
        this.size = 0;
        this.walls = new Set();
        this.bricks = new Set();
        this.ladder = new Set();
        this.pipe = new Set();
    }
    
    ladderPattern(ladderX, ladderY, visited, nodeMap) {
    
        const centerNode = this.pipePattern(ladderX, ladderY, visited, nodeMap);
        
        const aboveLadderY = ladderY + 1;
        const aboveLadderIndex = getIndex(ladderX, aboveLadderY);

        // Соединяем лестницу с верхушкой, если там не стена
        if (!walls.has(aboveLadderIndex)) {
            const aboveLadderNode = this.getOrCreateNode(ladderX, aboveLadderY, nodeMap);
            centerNode.addChild(aboveNode);
            
            // Если наверху пустота, то сверху запускаем такой же паттерн, как и у труб
            if (!pipes.has(aboveLadderIndex) && !ladders.has(aboveLadderIndex) && !visited.has(aboveLadderNode)) {
                this.pipePattern(ladderX, aboveLadderY, visited, nodeMap);
                visited.add(aboveLadderNode);
            }
        }
    
        return centerNode;
    }
    
    linkNodeToSideNodes(node, x, y, visited, nodeMap) {
        // Боковые узлы - это те, с которых можно упасть. Право, лево, низ

        // Соединяемся с соседом, если там не стена
        const sideNodeIndex = getIndex(x, y);
        
        if (!this.walls.has(sideNodeIndex)) {
            const sideNode = this.getOrCreateNode(x, y, nodeMap);
            node.addChild(sideNode);
            // Если на стороне пустота, то падаем
            if (!this.pipes.has(sideNodeIndex) && !this.ladders.has(sideNodeIndex) && !visited.has(sideNodeIndex)) {
                this.fillFallNodes(x, y, visited, nodeMap);
                visited.add(sideNode);
            }
        }
    }
    
    fillFallNodes(x, upY, visited, nodeMap) {
        let upIndex = getIndex(x, upY, this.mapSize);
        let upNode = nodeMap.get(upIndex);
        
        let downY = upY - 1;
        let downIndex = getIndex(x, downY, this.mapSize);
        
        // Если под узлом нет земли и лестницы, а также узел не на трубе, то продолжаем опускаться
        while (!this.walls.has(downIndex) && !this.ladders.has(downIndex) && !this.pipes.has(upIndex)) {
            let downNode = this.getOrCreateNode(x, downY, nodeMap);
            
            upNode.addChild(downNode);
            visited.add(upNode);
            
            upNode = downNode;
            upIndex = downIndex;

            downY--;
            downIndex = getIndex(x, downY, this.mapSize);
        }
    }

    getOrCreateNode(x, y, nodeMap) {
        console.log(x, y);
        const index = getIndex(x, y, this.mapSize);
    
        if (nodeMap.has(index)) {
            return nodeMap.get(index);
        }
        
        const node = new Node(x, y);
        nodeMap.set(index, node);
        
        return node;
    }
    
    isEmpty(index) {
        return !this.walls.has(index) && !this.pipes.has(index) && !this.ladders.has(index);
    }
}


function getIndex(x, y, size) {
    return y * size + x;
}


// env = new Environment();
// env.mapSize = 5;
// env.pipes = new Map([[2, 3], [3, 3]].map(
//     p => [getIndex(...p, env.mapSize), new Pipe(...p)]
//     ));
// env.ladders = new Map([[1, 1], [1, 2], [1, 3]].map(
//     p => [getIndex(...p, env.mapSize), new Ladder(...p)]));
// env.walls = new Map([
//     [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
//     [0, 3], [4, 3],
//     [0, 2], [4, 2],
//     [0, 1], [4, 1],
//     [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
// ].map(p => [getIndex(...p, env.mapSize), new Wall(...p, false)]));


// for (const n of env.createGraph().values()) {
//     console.log(n.x, n.y, n.children);
//     break;
// }
