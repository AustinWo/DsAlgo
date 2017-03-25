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
        this.removeNode(this.head);
    }
    removeTail(){
        this.removeNode(this.tail);
    }
    removeNode(node){
        if (node === null){
            return null;
        }
        if (node.prev !== null){
            node.prev.next = node.next;
        }
        if (node.next !== null){
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
            console.log(node.key, node.val);
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

// testing 
let d = new DoublyLinkedList();
d.insertAtTail(2, 2)
let three = d.insertAtTail(3, 3)
d.insertAtHead(1, 1)
d.insertAtHead(0, 0)
d.removeNode(three)
d.removeHead();
d.removeHead();
d.removeHead();
d.printNodes();
console.log(d)
