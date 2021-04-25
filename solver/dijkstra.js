const {Node} = require('./environment.js');
const {getIndex} = require('../shared/utils.js');


function dijkstra(startNode, targetNodes) {
    const visited = new Set();
    let paths = [[[startNode], 0]];
    
    while (paths) {
        let [path, cost] = paths.pop();
        currentNode = path[path.length - 1];
        if (targetNodes.has(currentNode)) {
            return path;
        }

        visited.add(currentNode);
        
        for (const [child, transitionCost] of currentNode.children.entries()) {
            if (visited.has(child)) continue;

            newPath = [...path, child];
            newCost = cost + transitionCost + 1;

            paths.push([newPath, newCost]);
        }

        paths.sort((a, b) => b[1] - a[1]);
    }
}


function spreadCost(graph, startNode, mapSize, costFunc, maxDepth) {
    const nodes = [[startNode, 0]];
    const visited = new Set();

    while (nodes) {
        const [node, level] = nodes.pop();
        visited.add(node);
        
        for (const [x, y] of sides(node.x, node.y)) {
            const sideNode = graph.get(getIndex(x, y, mapSize));

            if (sideNode && sideNode.children.has(node) && depth <= maxDepth) {
                const currentCost = sideNode.children.get(node);
                sideNode.children.set(node, costFunc(currentCost, depth));

                if (!visited.has(sideNode)) {
                    nodes.push([sideNode, level + 1]);
                }
            }
        }
    }
}


function* sides(x, y) {
    yield x - 1, y;
    yield x + 1, y;
    yield x, y - 1;
    yield x, y + 1;
}

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
// n3 = new Node(2, 0);
// n4 = new Node(3, 0);
