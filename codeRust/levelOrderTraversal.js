function BinaryTree (val){
    this.val = val;
    this.left = null;
    this.right = null;
}

var one = new BinaryTree(1);
var two_one = new BinaryTree(2.1);
var two_two = new BinaryTree(2.2);
var three_one = new BinaryTree(3.1);
var three_two = new BinaryTree(3.2);
var three_three = new BinaryTree(3.3);
var three_four = new BinaryTree(3.4);


one.left = two_one;
one.right = two_two;
two_one.left = three_one;
two_one.right = three_two;
two_two.left = three_three;
two_two.right = three_four;

// recursive
// time: N
// space: N
BinaryTree.prototype.levelTraverse = function(queue = [], valsToLog = [], nextLevel = []){
    if (!queue.length){
        queue.push(this);
        console.log(this.val);
    }
    while (queue.length){
        var next = queue.shift();
        if (next.left){
            valsToLog.push(next.left.val);
            nextLevel.push(next.left);
        }
        if (next.right){
            valsToLog.push(next.right.val);
            nextLevel.push(next.right);
        }
    }
    if (valsToLog.length){
        console.log(...valsToLog)
    }
    if (nextLevel.length){
        this.levelTraverse.call(nextLevel[0], nextLevel);    
    }
}

// one.levelTraverse();

// iterative
// time: N
// space: N
function traverse(root){
    if (!root){
        return;
    }
    var queue = [root];
    console.log(root.val);
    var nextQueue = [];
    while (queue.length){
        var next = queue.shift();
        if (next.left){
            nextQueue.push(next.left);
        }
        if (next.right){
            nextQueue.push(next.right);
        }
        if (!queue.length){
            var nextQueueVals = nextQueue.map(node => {
                return node.val;
            });
            if (nextQueueVals.length){
                console.log(...nextQueueVals);
            }
            queue = nextQueue; // assign queue to next level
            nextQueue = []; // reset the queue
        }
    }
}

traverse(one);

// iterative
// use null to indicate end of each level
// time: N
// space: N
function traverse2(root){
    if (!root){
        return;
    }
    var queue = [root, null];
    console.log(root.val);
    while (queue.length){
        var next = queue.shift();
        if (next && next.left){
            queue.push(next.left);
        }
        if (next && next.right){
            queue.push(next.right);
        }
        if (next === null){
            var queueVals = queue.map(node => {
                if (node !== null){
                    return node.val;
                }
            });
            if (queueVals.length){
                console.log(...queueVals);
            }
            if (queue.length){
                queue.push(null);
            }
        }
    }
}

// traverse2(one);

// codeRust
// iterative
// time: N
// space: N
// but in JS this solution doesnt print each level on new line
let level_order_traversal_1 = function(root) {
  if (!root) {
    return;
  }

  let queues = [
    [],
    []
  ];
  let current_queue = queues[0];
  let next_queue = queues[1];

  current_queue.push(root);
  let level_number = 0;

  while (current_queue.length > 0) {
    let temp = current_queue.shift();
    console.log(temp.val + ",");
    if (temp.left) {
      next_queue.push(temp.left);
    }

    if (temp.right) {
      next_queue.push(temp.right);
    }

    if (current_queue.length === 0) {
      level_number++;
      current_queue = queues[level_number % 2]; //  swap current_queue with next_queue
      next_queue = queues[(level_number + 1) % 2];
    }
  }
};

// level_order_traversal_1(one)
