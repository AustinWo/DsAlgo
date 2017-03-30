/*

Given an array of positive numbers from 1 to n, such that all numbers from 1 to n are present except one. Find the missing number.

input: array of pisitive numbers from 1 to n, excep one. not sorted.
output: missing number

Edge cases: empty array, really large array, array with only 1 element, array with 2 elements. negative, wrong data type

*/

let input = [1,2,4,5] // n is 5,  missing 3
let input2 = [3,5,2,6,1] // n is 6,  missing 4

// time: linear O(arr.length)
// space: constant O(1)
const findMissingNumber = (arr) => {
    let n = arr.length+1;
    let sum = (Math.pow(n, 2) + n) / 2;
    for (let i = 0; i < arr.length; i++){
        sum -= arr[i];
    }
    return sum;
}

console.log(findMissingNumber(input))
console.log(findMissingNumber(input2))
