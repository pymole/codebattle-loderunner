const { Point } = require('./game-objects.js');


class Node extends Point {
    constructor(x, y) {
        super(x, y);
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}


function createGraph(walls, pipes, ladders, mapSize) {
    const nodeMap = new Map();
    const visited = new Set();
    
    for (const wall of walls) {
        const aboveY = wall.y + 1;
        if (wall.x < 1 || mapSize - 1 <= wall.x || aboveY < 0 || aboveY >= mapSize - 2 ||
            !isEmpty(getIndex(center), walls, pipes, ladders)) {
            continue;
        }

        console.log('wall', wall);
        
        const centerNode = aboveWallPattern(center, walls, pipes, ladders, visited, nodeMap);
        visited.add(centerNode);
    }

    for (const pipe of pipes) {
        console.log('pipe', wall);
        const centerNode = pipePattern(pipe, walls, pipes, ladders, visited, nodeMap);
        visited.add(centerNode);
    }

    for (const ladder of ladders) {
        console.log('ladder', wall);
        const centerNode = ladderPattern(ladder, walls, pipes, ladders, visited, nodeMap);
        visited.add(centerNode);
    }

    return nodeMap;
}


function aboveWallPattern(center, walls, pipes, ladders, visited, nodeMap) {
    const centerNode = getOrCreateNode(center, nodeMap);
    
    const left = [center[0], center[1] + 1];
    linkNodeToSideNodes(centerNode, left, walls, pipes, ladders, visited, nodeMap);

    const right = [center[0], center[1] + 1];
    linkNodeToSideNodes(centerNode, right, walls, pipes, ladders, visited, nodeMap);

    return centerNode;
}


function pipePattern(center, walls, pipes, ladders, visited, nodeMap) {

    const centerNode = aboveWallPattern(center, walls, pipes, ladders, visited, nodeMap);

    // Также можно спрыгнуть вниз
    const down = [center[0], center[1] - 1];
    linkNodeToSideNodes(centerNode, down, walls, pipes, ladders, visited, nodeMap);

    return centerNode;
}

function ladderPattern(center, walls, pipes, ladders, visited, nodeMap) {

    const centerNode = pipePattern(center, walls, pipes, ladders, visited, nodeMap);
    
    const aboveLadder = [center[0], center[1] + 1];
    
    // Соединяем лестницу с верхушкой, если там не стена
    if (!walls.has(aboveLadder)) {
        const aboveLadderNode = getOrCreateNode(aboveLadder, nodeMap);
        centerNode.addChild(aboveNode);
        
        // Если наверху пустота, то сверху запускаем такой же паттерн, как и у труб
        if (!pipes.has(aboveLadder) && !ladders.has(aboveLadder) && !visited.has(aboveLadderNode)) {
            pipePattern(aboveLadder, walls, pipes, ladders, visited, nodeMap)
            visited.add(aboveLadderNode);
        }
    }

    return centerNode;
}


function linkNodeToSideNodes(node, sidePos, walls, pipes, ladders, visited, nodeMap) {
    
    // Соединяемся с соседом, если там не стена
    if (!walls.has(sidePos)) {
        const sideNode = getOrCreateNode(sidePos, nodeMap);
        node.addChild(sideNode);
        // Если на стороне пустота, то падаем
        if (!pipes.has(sidePos) && !ladders.has(sidePos) && !visited.has(node)) {
            fillFallNodes(sidePos, walls, pipes, ladders, visited, nodeMap);
            visited.add(sidePos);
        }
    }
}


function getOrCreateNode(x, y, mapSize, nodeMap) {
    index = getIndex(x, y, mapSize);

    if (nodeMap.has(index)) {
        return nodeMap.get(index);
    }
    
    node = new Node(x, y);
    nodeMap.set(index, node);
    
    return node;
}

function isEmpty(index, walls, pipes, ladders) {
    return !walls.has(index) && !pipes.has(index) && !ladders.has(index)
}


function fillFallNodes(pos, walls, pipes, ladders, visited, nodeMap) {
    let upNode = nodeMap.get(pos);
    let downPos = [pos[0], pos[1] - 1];

    // Если под узлом нет земли и лестницы, а также узел не на трубе, то продолжаем опускаться
    while (!walls.has(downPos) && !ladders.has(downPos)) {
        let downNode = getOrCreateNode(pos, nodeMap);
        
        upNode.addChild(downNode);

        if (visited.has(downPos) || pipes.has(downPos)) {
            break;
        }

        visited.add(downPos);
        
        pos = downPos;
        downPos = [pos[0], pos[1] - 1];
        upNode = downNode;
    }
}

function getIndex(x, y, size) {
    return y * size + x;
}


console.log([1, 2] in (new Set([[1, 2]])));

// pipes = new Set([[2, 3], [3, 3]]);
// ladders = new Set([[1, 1], [1, 2], [1, 3]]);
// walls = new Set([
//     [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
//     [0, 3], [4, 3],
//     [0, 2], [4, 2],
//     [0, 1], [4, 1],
//     [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
// ]);


// for (const n of createGraph(walls, pipes, ladders, 5).values()) {
//     console.log(n.x, n.y, n.children);
//     break;
// }