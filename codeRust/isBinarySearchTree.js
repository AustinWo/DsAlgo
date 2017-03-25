function BinaryTree (val){
    this.val = val;
    this.left = null;
    this.right = null;
}

var notBST = new BinaryTree(1);
var two_one = new BinaryTree(2.1);
var two_two = new BinaryTree(2.2);
var three_one = new BinaryTree(3.1);
var three_two = new BinaryTree(3.2);
var three_three = new BinaryTree(3.3);
var three_four = new BinaryTree(3.4);


notBST.left = two_one;
notBST.right = two_two;
two_one.left = three_one;
two_one.right = three_two;
two_two.left = three_three;
two_two.right = three_four;

var BST = new BinaryTree(5);
var BST_two_one = new BinaryTree(3);
var BST_two_two = new BinaryTree(8);
var BST_three_one = new BinaryTree(1);
var BST_three_two = new BinaryTree(4);
var BST_three_three = new BinaryTree(7);
var BST_three_four = new BinaryTree(9);

BST.left = BST_two_one;
BST.right = BST_two_two;
BST_two_one.left = BST_three_one;
BST_two_one.right = BST_three_two;
BST_two_two.left = BST_three_three;
BST_two_two.right = BST_three_four;


// time: N
// full tree space: lg N, height of call stack
// in a full binary tree, # levels = lg (N+1) -> lg N
// worst case space: N

function isBST(root){
    if (!root){
        return;
    }
    if ((root.left && root.left.val > root.val) || (root.right && root.right.val < root.val)){
        return false;
    }
    if (root.left){
        if(isBST(root.left) === false){
            return false;
        }
    }
    if (root.right){
        if (isBST(root.right) === false){
            return false;
        }
    }
    return true;
}

// console.log(isBST(BST));
// console.log(isBST(notBST));

// time: N
// full tree space: lg N, height of call stack
// in a full binary tree, # levels = lg (N+1) -> lg N
// worst case space: N
function isBSTMaxMin (root, max = Infinity, min = -Infinity){
    if (root === null){
        return;
    }
    if (root.val < min || root.val > max){
        return false;
    }
    if (root.left){
        if (isBSTMaxMin(root.left, root.val, min) === false){
            return false;
        }
    }
    if (root.right){
        if (isBST(root.right, max, root.val) === false){
            return false;
        }
    }
    return true;
}

// console.log(isBSTMaxMin(BST))
// console.log(isBSTMaxMin(notBST))


// create an array with in order traversal
// check if it's sorted
// time: N
// space: N
function isBSTInorderTraversal (root){
    if (root === null){
        return;
    }
    var order = [];
    inOrder(root);
    function inOrder(root){
        if (root === null){
            return;
        }
        if (root.left){
            inOrder(root.left);
        }
        order.push(root.val);
        if (root.right){
            inOrder(root.right);
        }
    }
    if (order.length === 1){
        return true;
    }
    var prev = 0;
    var current = 1;
    while (order[current] !== undefined){
        if (order[current] < order[prev]){
            return false;
        }
        prev = current;
        current++;
    }
    return true;
}

console.log(isBSTInorderTraversal(BST));
console.log(isBSTInorderTraversal(notBST));


// codeRust
let prev = -1;
let is_binary_search_tree = function(root) {
  // assuming all tree values are positive.
  prev = -1;
  return is_binary_search_tree_rec(root);
};

let is_binary_search_tree_rec = function(root) {

  if (!root) {
    return null;
  }

  if (is_binary_search_tree_rec(root.left) === false) {
    return false;
  }

  if (prev > root.data && prev != -1) {
    return false;
  }

  prev = root.data;

  if (is_binary_search_tree_rec(root.right) === false) {
    return false;
  }

  return true;
};
