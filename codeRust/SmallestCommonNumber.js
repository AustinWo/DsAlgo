/*

Given three integer arrays sorted in ascending order, find the smallest number that is common in all three arrays.

Option 1:
Brute-force: 3 nested loops
time: n^3

*/

let a1 = [6,7,10,25,30,63,64]
let a2 = [-1, 4, 5, 6, 7, 8, 50];
let a3 = [1,6,10,14];

// time: a1 + a2 + a3 : linear
// space: 1
let commonSmallestNumber = (arr1, arr2, arr3) => {
    let maxIndex = Math.min(arr1.length, arr2.length, arr3.length)-1;
    let [i1,i2,i3] = [0, 0, 0];
    while (i1 <= maxIndex && i2 <= maxIndex && i3 <= maxIndex){
        let [first, second, third] = [arr1[i1], arr2[i2], arr3[i3]];
        if (first === second && second === third){
            return first;
        }
        let max = Math.max(first, second, third);
        if (first < max){
            i1++;
        }
        if (second < max){
            i2++;
        }
        if (third < max){
            i3++;
        }
    }
    return null;
}

console.log(commonSmallestNumber(a1, a2, a3));
