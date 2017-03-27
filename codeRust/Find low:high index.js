/*

Given a sorted array of integers, return the low and high index of the given key. Return -1 if not found. The array length can be in millions with lots of duplicates.
In the following example, low and high indices would be:

Key: 1, Low=0 and High=0

Key: 2, Low=1 and High=1

Key: 5, Low=2 and High=9

key: 20, Low=10 and High=10


input: sortedArr of ints, key
output: index of first & indes of last
constraint:
edge cases: 1 element, 2 element, empty, key not given, key not int
*/

// return index of first occurance
// if not found return -1
let findFirst = (sortedArr, key, left = 0, right = sortedArr.length-1) => {
    while (left <= right){
        let m = Math.floor(left + (right-left)/2);
        if (sortedArr[m] === key){
            if (m > 0 && sortedArr[m-1] === key){
                // keep searching
                let nextSearchResult = findFirst(sortedArr, key, left, m-1)
                if (nextSearchResult !== -1){
                    return nextSearchResult
                }
            }
            return m;
        } else if (sortedArr[m] < key){
            // search on right
            left = m+1;
        } else {
            right = m-1;
        }
    }
    return -1;
}

// return index of first occurance
// if not found return -1
let findLast = (sortedArr, key, left = 0, right = sortedArr.length-1) => {
    while (left <= right){
        let m = Math.floor(left + (right-left)/2);
        if (sortedArr[m] === key){
            if (m > 0 && sortedArr[m+1] === key){
                // keep searching
                let nextSearchResult = findLast(sortedArr, key, m+1, right)
                if (nextSearchResult !== -1){
                    return nextSearchResult
                }
            }
            return m;
        } else if (sortedArr[m] < key){
            // search on right
            left = m+1;
        } else {
            right = m-1;
        }
    }
    return -1;
}


let binarySearch = (sortedArr, key, left = 0, right = sortedArr.length-1) => {
    while (left <= right){
        let m = Math.floor(left + (right-left)/2);
        if (sortedArr[m] === key){
            return m;
        } else if (sortedArr[m] < key){
            // search on right
            left = m+1;
        } else {
            right = m-1;
        }
    }
    return -1;
}
/*

time: lg(sortedArr.length) * 2 = lg(sortedArr.length)
space: O(1) since we do iteratively, O(lg sortedArr.length) for call stack if recursively

*/
let input = [0,0,0,0,1,5,5,5,5,5,5,5,6,6,6,6,8,8,8,8];
console.log(input.length);
// console.log(findFirstAndLastIndex(input, 0));

let findFirstAndLastIndex = (sortedArr, key) => {
    let first = binarySearch(sortedArr, key);
    let last = first;
    let firstContinueSearching = true;
    while (first !== -1 && first > 0 && sortedArr[first-1] === sortedArr[first] && firstContinueSearching){
        let continueResult = binarySearch(sortedArr, key, 0, first-1);
        if (continueResult === -1){
            firstContinueSearching = false;
        } else {
            first = continueResult;
        }
    }
    let lastContinueSearching = true;
    while (last !== -1 && last > 0 && sortedArr[last-1] === sortedArr[last] && lastContinueSearching){
        let continueResult = binarySearch(sortedArr, key, last+1, sortedArr.length-1);
        if (continueResult === -1){
            lastContinueSearching = false;
        } else {
            last = continueResult;
        }
    }
    return [first, last];
}


console.log(findFirstAndLastIndex(input, 6));

let find_low_index = function(arr, key) {
  let low = 0;
  let high = arr.length - 1;
  let mid = Math.floor(high / 2);

  while (low <= high) {

    let mid_elem = arr[mid];

    if (mid_elem < key) {
      low = mid + 1;
    } else {
        // keep looking left even arr[key] === mid_elem
      high = mid - 1;
    }

    mid = low + Math.floor((high - low) / 2);
  }
  
  if (arr[low] === key) {
    return low;
  }

  return -1;
};

console.log(find_low_index([-1,0,0,0], 0))

let find_high_index = function(arr, key) {
  let low = 0;
  let high = arr.length - 1;
  let mid = Math.floor(high / 2);

  while (low <= high) {
    let mid_elem = arr[mid];

    if (mid_elem <= key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }

    mid = low + Math.floor((high - low) / 2);
  }

  if (arr[high] === key) {
    return high;
  }

  return -1;
};
