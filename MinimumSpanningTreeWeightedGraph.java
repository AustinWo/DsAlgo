/*

Minimum Spanning Tree for Weighted Graph

Common mistakes

Forget to use 'new' when instantiating
Forget to throws Exception in method, in main
For get to decrement size when remove element from array
Confuse SIZE (max size) with size
PQ is in descending order: remove at the last element(smallest is shortest distance)
PQ insert at the right place, find the appropriate index and shift elements over

Tips

Remove the last index and decrement size
return queueArray[--size]
Draw a picture to get the right index for loop when removing elements, shifting elements

*/

import java.util.Arrays;

class MinimumSpanningTreeWeightedGraph {
    public static void main(String[] args) throws Exception {
        Graph graph = new Graph();
        graph.addVert('A');
        graph.addVert('B');
        graph.addVert('C');
        graph.addVert('D');
        graph.addVert('E');
        graph.addVert('F');

        graph.addEdge(0,1,6);
        graph.addEdge(0,3,4);
        graph.addEdge(1,2,10);
        graph.addEdge(1,3,7);
        graph.addEdge(1,4,7);
        graph.addEdge(2,3,8);
        graph.addEdge(2,4,5);
        graph.addEdge(2,5,6);
        graph.addEdge(3,4,12);
        graph.addEdge(4,5,7);

        graph.mstw();
    }
}

// contains the Edges 
class PriorityQueue {
    public final int SIZE;
    public Edge[] queueArray;
    public int size;

    public PriorityQueue(){
        SIZE = 20;
        queueArray = new Edge[SIZE];
        size = 0;
    }

    public void insert(Edge item){
        int i;
        for (i = 0; i < size; i++){
            if (queueArray[i].distance <= item.distance){
                break;
            }
        }
        for (int j = size; j > i; j--){
            queueArray[j] = queueArray[j-1];
        }
        queueArray[i] = item;
        size++;
    }

    public Edge removeMin(){
        return queueArray[--size];
    }

    // remove at index n. index is the index of vertex.
    public void removeN(int n){
        // move elements left
        for (int i = n; i < size-1; i++){
            queueArray[i] = queueArray[i+1];
        }
        size--;
    }

    public Edge peekMin(){
        return queueArray[size-1];
    }

    public Edge peekN(int n){
        return queueArray[n];
    }

    public int size(){
        return size;
    }

    public boolean isEmpty(){
        return size == 0;
    }

    // find item with specified destVert value
    public int find(int findDex){
        for (int i = 0; i < size; i++){
            if (queueArray[i].destinationVert == findDex){
                return i;
            }
        }
        return -1;
    }
}

class Vertex {
    public char label;
    public boolean isInTree; // default to false

    public Vertex(char lab){
        label = lab;
    }
}

// Connects currentVert to destinationVert with weight
class Edge {
    public int sourceVert;
    public int destinationVert;
    public int distance;
    
    public Edge(int c, int dv, int d){
        sourceVert = c;
        destinationVert = dv;
        distance = d;
    }
}

// Weighted graph
class Graph {
    private Vertex[] listVertices;
    private int[][] adjacencyMatrix;
    private int numVerts;
    private int MAX_VERTS = 6;
    private int INFINITY = 1000000;
    private int currentVert;
    private int nVerticesInTree;
    private PriorityQueue PQ;

    public Graph(){
        listVertices = new Vertex[MAX_VERTS];
        adjacencyMatrix = new int[MAX_VERTS][MAX_VERTS];
        // set adjacency default values to INFINITY
        for (int i = 0; i < MAX_VERTS; i++){
            for (int j = 0; j < MAX_VERTS; j++){
                adjacencyMatrix[i][j] = INFINITY;
            }
        }
        PQ = new PriorityQueue();
    }

    public void addVert(char lab) throws Exception {
        if (numVerts < MAX_VERTS){
            listVertices[numVerts++] = new Vertex(lab);
        } else {
            throw new Error("Graph is full");
        }
    }

    public void addEdge(int from, int to, int distance){
        adjacencyMatrix[from][to] = distance;
        adjacencyMatrix[to][from] = distance;
    }

    public void displayVertex(int i){
        System.out.print(listVertices[i].label);
        System.out.print(" " + listVertices[i].isInTree);
        System.out.println();
    }

    // display minimum spanning tree
    public void mstw(){
        currentVert = 0;

        while (nVerticesInTree < numVerts-1){ // while there are still vertices to add to mst

            listVertices[currentVert].isInTree = true;
            nVerticesInTree++;

            // insert edges adjacent to currentVert into PQ
            for (int i = 0; i < numVerts; i++){
                if (i == currentVert){ // same as itself
                    continue;
                }
                if (listVertices[i].isInTree){ // already in the mst
                    continue;
                }
                int distance = adjacencyMatrix[currentVert][i];
                if (distance == INFINITY){ // skip if no edge
                    continue; 
                }
                putInPQ(i, distance); // put in PQ (maybe)
            }
            if (PQ.size() == 0){ // no vertices in PQ
                System.out.println("Graph not connected");
                return;
            }
            // remove edge with minimum distance from PQ
            Edge edge = PQ.removeMin();
            int sourceVert = edge.sourceVert;
            currentVert = edge.destinationVert;

            // display Edge from source to current
            System.out.println(listVertices[sourceVert].label);
            System.out.println(listVertices[currentVert].label);
            System.out.println("=====");
        }

        // flip flag back
        for (int i = 0; i < numVerts; i++){
            listVertices[i].isInTree = false;
        }
    }

    public void putInPQ(int newVert, int newDist){
        // is there another edge with the same destination vertext?
        int queueIndex = PQ.find(newVert);
        if (queueIndex != -1){
            Edge tempEdge = PQ.peekN(queueIndex); // get edge
            int oldDistance = tempEdge.distance;
            if (oldDistance > newDist){ // new edge is shorter, use new edge
                PQ.removeN(queueIndex); // remove old edge
                Edge edge = new Edge(currentVert, newVert, newDist);
                PQ.insert(edge);
            } // else no action, leave the old vertex there
        } else {
            // no edge with same destination vertex found
            Edge edge = new Edge(currentVert, newVert, newDist);
            PQ.insert(edge);
        }
    }
}