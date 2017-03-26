/*

Convert a binary tree to a doubly linked list such that the order of the doubly linked list is the same as an in-order traversal of the binary tree. After conversion the left pointer of the node should be pointing to the previous node in the doubly linked list and the right pointer should be pointing to the next node in the doubly linked list.

*/

class DoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;        
        this.size = 0;
    }
    insertAtHead(key, val){
        let node = new LinkedListNode(key, val);
        if (!this.head){
            this.tail = node;
        } else {
            let head = this.head;
            head.prev = node;
            node.next = head;
        }
        this.head = node;
        this.size++;
        return node;
    }
    insertAtTail(key, val){
        let node = new LinkedListNode(key, val);
        if (!this.tail){
            this.head = node;
        } else {
            let tail = this.tail;
            tail.next = node;
            node.prev = tail;
        }
        this.tail = node;
        this.size++;
        return node;
    }
    removeHead(){
        return this.removeNode(this.head);
    }
    removeTail(){
        return this.removeNode(this.tail);
    }
    removeNode(node){
        if (node === null){
            return null;
        }
        if (node.prev){
            node.prev.next = node.next;
        }
        if (node.next){
            node.next.prev = node.prev;
        }
        if (node === this.head){
            this.head = node.next;
        }
        if (node === this.tail){
            this.tail = node.prev
        }
        this.size--;
        return node;
    }
    printNodes(){
        let node = this.head;
        while (node){
            console.log(node.val);
            node = node.next;
        }
    }
}

class LinkedListNode {
    constructor(key, val){
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

function llNode(val){
    this.val = val;
    this.prev = null;
    this.next = null;
}

function BST(val){
    var obj = {}
    obj.val = val;
    obj.left = null;
    obj.right = null;
    obj.insert = function(val){
        if (!this.left && val < this.val){
            var node = BST(val);
            this.left = node;
        }
        if (!this.right && val > this.val){
            var node = new BST(val);
            this.right = node;
        }
        if (this.left && val < this.val){
            this.left.insert(val);
        }
        if (this.right && val > this.val){
            this.right.insert(val);
        }
    }
    return obj;
}


function inorder(root, callback){
    if (!root){
        return;
    }
    inorder(root.left, callback);
    callback(root);
    inorder(root.right, callback);
}

var root = BST(10);
root.insert(5);
root.insert(15);
root.insert(3);
root.insert(7);
root.insert(12);
root.insert(20);

// [3,5,7,10,12,15,20]

// create a DoublyLinkedList and traverse the tree to insertAtTail
// space: N for new DoublyLinkedList
// time: N to visit very node

var ll = new DoublyLinkedList();
inorder(root, node => {
    ll.insertAtTail('val', node.val);
})

// ll.printNodes();

console.log('======');

// left and right are links
function concat(left, right){
    if (left){
        left.right = right;
    }
    if (right){
        right.left = left;
    }
}

function Link(val) {
    return {
        left: null,
        val: val,
        right: null
    }
}

// construct returns the new DoublyLinkedList object with pointers to head and tail
function construct(root){
    var head = null;
    var tail = null;
    root = doublyLLinPlace(root);
    var current = root;
    while (current !== null){
        tail = current;
        current = current.right;
    }
    current = root;
    while (current !== null){
        head = current;
        current = current.left;
    }
    return {
        head:head,
        tail: tail
    };
    function doublyLLinPlace(root){
        if (!root){
            return;
        }
        if (root.left){
            var left = doublyLLinPlace(root.left);
        } else {
            left = null;
        }
        var link = Link(root.val);
        if (root.right){
            var right = doublyLLinPlace(root.right);
        } else {
            right = null;
        }
        if (left){
            var mostRight = left;
            while(mostRight.right){
                mostRight = mostRight.right;
            }
            mostRight.right = link;
            link.left = mostRight;
        }
        if (right){
            var mostLeft = right;
            while (mostLeft.left){
                mostLeft = mostLeft.left;
            }
            mostLeft.left = link;
            link.right = mostLeft;
        }
        return link;
    }
}

// ll2 is DoublyLinkedList object with pointers to head and tail

var ll2 = construct(root);
// console.log(ll2);
// root is the original root object in the BST but now is a Link in ll2
// console.log(root);

var currentNode = ll2.head;
// console.log(currentNode)
while(currentNode){
    console.log(currentNode.val);
    currentNode = currentNode.right;
}
