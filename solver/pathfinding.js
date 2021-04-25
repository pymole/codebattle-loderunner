const {getIndex} = require('../shared/utils.js');


function dijkstra(startNode, targetNodes) {
    const visited = new Set();
    let paths = [[[startNode], 0]];

    while (paths.length > 0) {
        let [path, cost] = paths.pop();
        const currentNode = path[path.length - 1];
        if (targetNodes.has(currentNode)) {
            return path;
        }

        visited.add(currentNode);

        for (const [child, transitionCost] of currentNode.children.entries()) {
            if (visited.has(child)) continue;

            const newPath = [...path, child];
            const newCost = cost + transitionCost + 1;

            paths.push([newPath, newCost]);
        }

        paths.sort((a, b) => a[1] - b[1]);
    }
    throw new Error();
}


function spreadCost(graph, startNode, mapSize, maxDepth, costFunc) {
    const nodes = [[startNode, 0]];
    const visited = new Set();

    while (nodes.length > 0) {
        const [node, depth] = nodes.pop();
        visited.add(node);

        for (const [x, y] of sides(node.x, node.y)) {
            const sideNode = graph.get(getIndex(x, y, mapSize));

            if (sideNode && sideNode.children.has(node) && depth <= maxDepth) {
                const currentCost = sideNode.children.get(node);
                sideNode.children.set(node, costFunc(currentCost, depth, maxDepth));

                if (!visited.has(sideNode)) {
                    nodes.push([sideNode, depth + 1]);
                }
            }
        }
    }
}


function* sides(x, y) {
    yield [x - 1, y];
    yield [x + 1, y];
    yield [x, y - 1];
    yield [x, y + 1];
}

module.exports = {dijkstra}

// console.log(!![]);

// n1 = new Node(0, 0);
// n2 = new Node(1, 0);
// n3 = new Node(2, 0);
// n4 = new Node(3, 0);

// n1.addChild(n4);
// n1.children.set(n4, 3);
// n1.addChild(n2);
// n2.addChild(n3);
// n3.addChild(n4);


// console.log(dijkstra(n1, new Set([n4])));



// TEST 2

// n1 = new Node(0, 0);
// n2 = new Node(1, 0);
// n3 = new Node(0, 1);
// n4 = new Node(1, 1);
// n5 = new Node(2, 1);


// n2.addChild(n1);
// n3.addChild(n1);
// n4.addChild(n3);
// n4.addChild(n2);
// n5.addChild(n4);


// graph = new Map();

// for (const n of [n1, n2, n3, n4, n5]) {
//     graph.set(getIndex(n.x, n.y, 3), n);
// }

// function spreadHunter(currentCost, depth, maxDepth) {
//     return currentCost + maxDepth - depth;
// }

// spreadCost(graph, n1, 3, spreadHunter, 2);

// console.log(graph);
