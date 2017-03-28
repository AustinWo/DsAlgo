/*
Move zeros to left

Given an integer array, move all elements containing '0' to the left while maintaining the order of other elements in the array.
Description

input:  [1,10,20,0,59,63,0,88,0]
output: [0,0,0,1,10,20,59,63,88]

Brute Force

iterate thru the input array
if 0 is found, if the previous val is not 0, swap until previous value is 0 or until reach index 0

time complexity: O(N^2) where N is the array length

*/

let input = [1,10,20,0,59,63,0,88,0];

/*

time complexity: O(N)
space complexity: O(N)

*/
const moveZerosToLeft = (inputArray) => {
    let zeros = [];
    let nonZeros = [];
    inputArray.forEach(val => {
        if (val === 0){
            zeros.push(0);
        } else {
            nonZeros.push(val);
        }
    });
    return zeros.concat(nonZeros);
}

console.log(moveZerosToLeft(input))

/*

Use counting
Use reader / writer

time: O(N)
space: O(1)

*/

const moveZerosToLeft2  = (inputArray) => {
    let readFromIndex = inputArray.length-1;
    let writeToIndex = inputArray.length-1;
    while (readFromIndex >= 0){
        if (inputArray[readFromIndex] === 0){
            readFromIndex--;
            continue;
        } else {
            inputArray[writeToIndex] = inputArray[readFromIndex];
            writeToIndex--;
            readFromIndex--;
        }
    }
    while (writeToIndex >= 0){
        inputArray[writeToIndex--] = 0;
    }
    return inputArray;
}

console.log(moveZerosToLeft2([input]));
