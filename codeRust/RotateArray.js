/*

Given an array of integers, rotate the array by 'n' elements.

N: negative : beginning to end: rotate right
N: positive: end to beginning: rotate left

input: array of ints
output: array of ints
constraint:
edge cases: no input, not array, not int, length of 1, n greater than length

Brute Force:
n > 0: remove the last element and insert at index 0, N times with pop() and unshift()
n < 0: remove the first element and insert at end, N times with shift() and push()

Time:
push/pop() is O(1)
shift/unshift() is O(n) because needs to shift elements over
so time complexity is N * Array.length = N * Array.length

Space:
O(1) no extra space needed, work on the input array

Another approach:

Calculate how many times total its to rotate
n = n % length
if (n < 0){
    n = n + length
}

*/

/*

time: 
slice: o(arr.length)
space: o(arr.length) for leftArr & rightArr
*/
let rotateArrayBySlice = (arr, n) => {
    if (!arr.length || arr.length === 1 || n === 0 || (n > arr.length && n % arr.length === 0)){
        return arr;
    }
    // move elements from end to beginning
    let rotateLeft = n > 0 ? true : false;
    // number of times to rotate elements
    let r = n;
    if (n > arr.length){
        r = Math.abs(arr.length - Math.abs(n));
    }
    let leftArr;
    let rightArr;
    if (rotateLeft){
        leftArr = arr.slice(arr.length-r, arr.length);
        rightArr = arr.slice(0, arr.length-r);
    } else {
        leftArr = arr.slice(0, r);
        rightArr = arr.slice(r, arr.length);
    }
    return leftArr.concat(rightArr);
}


// positive -> end to beginning
console.log(rotateArrayBySlice([0,1,2,3,4,5], 1));
// negative -> beginning to end
console.log(rotateArrayBySlice([0,1,2,3,4,5], -1));


// time: 1/2 arr.length -> O(arr.length)
// space: O(1)
let reverse_array = function(arr, start, end) {
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
};

// time: O(arr.length)
// space: O(1)
let rotate_array_in_place = function(arr, n) {
  let len = arr.length;

  // Let's normalize rotations
  // if n > array size or n is negative.
  n = n % len;
  if (n < 0) {
    // calculate the positive rotations needed.
    n = n + len;
  }
  // Let's partition the array based on rotations 'n'.
  // For example: 1, 2, 3, 4, 5 where n = 2.
  // -> 5, 4, 3, 2, 1
  // -> 4, 5, 3, 2, 1
  // -> 4, 5, 1, 2, 3

  reverse_array(arr, 0, len - 1);
  reverse_array(arr, 0, n - 1);
  reverse_array(arr, n, len - 1);
};

let input = [0,1,2,3,4,5,6];
rotate_array_in_place(input, 2);
console.log(input);

