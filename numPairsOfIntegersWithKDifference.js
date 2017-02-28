/*

Q: Given an array of distinct integer values, count the number of pairs of integers that have difference k.
Given [1,7,5,9,2,12,3], the diference is k = 2, there are 4 pairs with difference of 2: [7,5] [1,3] [3,5] [7,9]

1) Brute force: all pairs? Time complexity: O(N^2)
2) Sort the array and binary search int+k & int-k? Time complexity: O(N lg N) + O(lg N) = O(N lg N)
2) Put each int into the map. Iterate through the array once.
Time complexity: O(N)
Space complexity: O(N)
where N is arr.length
*/

let numPairs = (arr, k) => {
    let map = new Map();
    let count = 0;
    arr.forEach( int => {
        if (!map.has(int)){
            map.set(int, true);
        }
        if (map.has(int+k)){
            count++;
        }
        if (map.has(int-k)){
            count++;
        }
    });
    return count;
};

console.log(numPairs([1,7,5,9,12,3], 2))