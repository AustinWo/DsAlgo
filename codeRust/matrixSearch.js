/*

We are given a 2D array where elements in any individual row or column are sorted. In such a matrix, we have to search (find the position of) a given key. Following example further elaborates the problem.

*/

let matrix = [
    [1,2,4,9,13,19],
    [2,3,5,11,18,23],
    [3,6,8,16,21,25],
    [4,9,11,20,25,32],
    [7,14,15,25,33,40]
];

// if found, return the index [row, col]
// else, return null
const matrixSearch = (matrix, key) => {
    let row = 0;
    let col = matrix[0].length-1;
    while (row <= matrix.length-1 && col >= 0){
        var current = matrix[row][col]
        if (current === key){
            return [row, col];
        } else if (current > key){
            col--;
        } else  {
            row++;
        }
    }
    return null;
}

console.log(matrixSearch(matrix, 15));

/*

walk thru

r = 0
c = 5

cur = 19
cur > k
c --

r = 0
c = 4
cur = 13
cur < k
r++

r = 1
c = 4
cur = 18
cur > k
c--

r = 1
c = 3
cur =  11
cur < k
r++

r = 2
c = 3
cur = 16
cur > k
c--

r = 2
c = 2
cur = 8
cur < k
r++

r = 3
c = 2
cur = 11
cur < k
r++

r = 4
c = 2
cur = 15 **** found

start from top right, until out of bound of matrix
    if current is key, return
    if current is greater than key, go left
    if current is less than key, go down
return null

*/
