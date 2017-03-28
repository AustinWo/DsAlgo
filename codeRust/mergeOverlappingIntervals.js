/*
Given an array (list) of intervals as input where each interval has a start and end timestamps. Input array is sorted by starting timestamps. You are required to merge overlapping intervals and return output array (list).

Consider below input array. Intervals (1, 5), (3, 7), (4, 6), (6, 8) are overlapping so should be merged to one big interval (1, 8). Similarly intervals (10, 12) and (11, 15) are also overlapping intervals and should be merged to (10, 15).

input: sorted array of arrays with 2 elements each
output: a merged array of arrays with overlapping intervals

time: O(N) where N is the length of the input array
space: O(N) where N is the length of the input array because the return merged array could be as big as the input array
*/
const mergeIntervals = (arrayOfIntervals) => {
    if (arrayOfIntervals.length <= 1){
        return arrayOfIntervals;
    }
    let merged = [arrayOfIntervals[0]];
    for (var i = 1; i < arrayOfIntervals.length; i++){
        lastMerged = merged[merged.length-1];
        currentInterval = arrayOfIntervals[i];
        if (lastMerged[1] >= currentInterval[0]){
            // overlap
            let start = Math.min(lastMerged[0], currentInterval[0]);
            let end = Math.max(lastMerged[1], currentInterval[1]);
            merged[merged.length-1] = [start, end];
        } else {
            merged.push(currentInterval);
        }
    }
    return merged;
}

let input = [[1,5],[3,7],[8,9],[10,12],[11,12]];
console.log(mergeIntervals(input));
