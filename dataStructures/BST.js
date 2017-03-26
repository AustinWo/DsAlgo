function BST(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

BST.prototype.insert = function(val){
    if (!this.left && val < this.val){
        var node = new BST(val);
        this.left = node;
    }
    if (!this.right && val > this.val){
        var node = new BST(val);
        this.right = node;
    }
    if (this.left && val < this.val){
        this.insert.call(this.left, val);
    }
    if (this.right && val > this.val){
        this.insert.call(this.right, val);
    }
}

function inorder(root, callback){
    if (!root){
        return;
    }
    inorder(root.left, callback);
    callback(root);
    inorder(root.right, callback);
}

var root = new BST(10);
root.insert(5);
root.insert(15);
root.insert(3);
root.insert(7);
root.insert(12);
root.insert(20);

inorder(root, x => {
    console.log(x.val);
});
