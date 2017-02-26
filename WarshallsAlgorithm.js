/*

Warshall’s algorithm is used to change adjacency matrix into transitive closure of the graph.

If you can get from vertex A to vertex B, and you can get from B to C, then you can get from A to C.

Derive a 2 steps path from 2 one-step paths.
Adjacency matrix shows all the possible 1-step path.
This algorithm will build on previously discovered multi-edge paths to create paths of arbitary length.
It can find path of more than 2 edges.

*/

var adjacencyMatrix = [
    [0,0,1,0,0],
    [1,0,0,0,1],
    [0,0,0,0,0],
    [0,0,0,0,1],
    [0,0,1,0,0]
];

var transitiveClosure = adjacencyMatrix.slice();

for (var y = 0; y < adjacencyMatrix.length; y++){
    for (var x = 0; x < adjacencyMatrix.length; x++){
        // if y -> x
        if (adjacencyMatrix[y][x]){
            for (var z = 0; z < adjacencyMatrix.length; z++){
                // if z -> y 
                if(adjacencyMatrix[z][y]){
                    // z -> y -> x
                    // z -> x
                    transitiveClosure[z][x] = 1;
                }
            }
        }
    }
}

console.log(transitiveClosure)