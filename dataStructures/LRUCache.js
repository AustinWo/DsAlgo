/*

Implemented with:
- Map
    key: key
    val: LinkedListNode

- DoublyLinkedList : store the cache items

time complexity:
set: O(1)
get: O(1)

tips:
- each map value is the LinkedListNode not the value of each key
- get(key) returns value of the key, not the LinkedListNode

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

class LRUCache {

  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.items = new DoublyLinkedList();
  }
  
  set(key, value) {
    if (this.cache.has(key)){
      let node = this.cache.get(key);
      this.items.removeNode(node);
      this.items.insertAtTail(node.key, node.val);
    } else {
      this.evict_if_needed();
      let node = this.items.insertAtTail(key, value);
      this.cache.set(key, node);
    }
  }

  get(key) {
    if (this.cache.has(key)){
      let returnNode = this.cache.get(key);
      this.items.removeNode(returnNode);
      this.items.insertAtTail(returnNode.key, returnNode.val);
      return returnNode.val;
    } else {
      return null;
    }
  }

  evict_if_needed() {
    if (this.items.size === this.capacity){
      let removeNode = this.items.removeHead();
      this.cache.delete(removeNode.key);
    }
  }

  printCacheItems() {
    let node = this.items.head;
    while (node){
      console.log(node.key, node.val);
      node = node.next;
    }
    console.log('======');
  }
}

let l = new LRUCache(4)
l.set(1, 1)
l.set(2, 2)
l.set(3, 3)
l.set(4, 4)
l.set(5, 5)
l.set(6, 6)
l.printCacheItems() // 3 4 5 6
l.get(3)
l.printCacheItems() // 4 5 6 3
l.set(8,{name: 'austin'})
l.printCacheItems() // 5 6 3 8
console.log(l.get('nada')) // null
console.log('=====')
l.printCacheItems() // 5 6 3 8
console.log(l.get(8)) // {name: 'austin'}
