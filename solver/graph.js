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


// let walls = new Set(walls.forEach(wall => [wall.x, wall.y] ));
// let pipes = new Set(pipes.forEach(pipe => [pipe.x, pipe.y] ));
// let ladderMap = new Set(ladders.forEach(ladder => [ladder.x, ladder.y] ));


function createGraph(walls, pipes, ladders, mapSize) {
    let nodeMap = new Map();
    
    for (const wall of walls) {
        let center = [wall[0], wall[1] + 1];
        if (walls.has(center)) {
            continue;
        }
        
        let centerNode, created = getOrCreateNode(...center, nodeMap);
        
        let left = [wall[0] - 1, wall[1] + 1];
        linkNodeToSideNodes(centerNode, left, nodeMap, walls);
        let right = [wall[0] + 1, wall[1] + 1];
        linkNodeToSideNodes(centerNode, right, nodeMap, walls);
    }

    for (const pipe of pipes) {
        let centerNode, created = getOrCreateNode(...pipe, nodeMap);
        
        let left = [wall[0] - 1, wall[1] + 1];
        linkNodeToSideNodes(centerNode, left, nodeMap, walls);
        let right = [wall[0] + 1, wall[1] + 1];
        linkNodeToSideNodes(centerNode, right, nodeMap, walls);
    }
}


function getOrCreateNode(pos, nodeMap) {
    if (nodeMap.has(pos)) {
        return nodeMap.get(pos), false;
    }
    
    node = new Node(...pos);
    nodeMap.set(pos, node);
    
    return node, true;
}

function isFree(pos, walls, pipes, ladders) {
    return !walls.has(pos) && !pipes.has(pos) && !ladders.has(pos)
}

function linkNodeToSideNodes(node, sidePos, walls, pipes, ladders, nodeMap) {
    
    // Смотри в бок, если там пусто
    if (!walls.has(sidePos) && !pipes.has(sidePos) && !ladders.has(sidePos)) {
        let sideNode, created = getOrCreateNode(...sidePos, nodeMap);
        node.addChild(sideNode);
        
        if (!created) {
            fillFallNodes(sidePos, walls, nodeMap);
        }
    }
}


function fillFallNodes(pos, walls, nodeMap) {
    let upNode = nodeMap.get(pos);
    let pos = [pos[0], pos[1] - 1];

    while (!walls.has(pos)) {
        let downNode, created = getOrCreateNode(pos);
        
        upNode.addChild(downNode);

        if (!created) {
            break;
        }

        pos = [pos[0], pos[1] - 1];
        upNode = downNode;
    }
}

function getIndexFromPos(x, y, size) {
    return y * size + x;
}
