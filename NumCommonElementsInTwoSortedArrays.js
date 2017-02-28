/*

Given 2 sorted arrays, find the number of elements in common.
The arrays are same length and each has all distinct elements.
CTCI pg 73

1) Brute force, compare every pair. Time complexity O(N)
2) Put the elements in a hash table. Space complexity would be O(N)
3) Use the fact that the arrays are already sorted. Do linear search. Pick up where the last idex was left off.
time complexity: O(N)
space complexity: O(1)

*/
function numOfCommonElements(arr1, arr2){
    let count = 0;
    let arr2CurrentIndex = 0;
    for (let i = 0; i < arr1.length; i++){
        while (arr2[arr2CurrentIndex] < arr1[i]){
            arr2CurrentIndex++;
        }
        if(arr1[i] === arr2[arr2CurrentIndex]){
            count++;
            arr2CurrentIndex++;
        }
    }
    return count;
}

console.log(numOfCommonElements([13,27,35,40,49,55,59], [17,35,39,40,55,58,60]));