class TrieNode {
    constructor() {
      this.children = new Map();
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let currentNode = this.root;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!currentNode.children.has(char)) {
          currentNode.children.set(char, new TrieNode());
        }
        currentNode = currentNode.children.get(char);
      }
      currentNode.isEndOfWord = true;
    }
  
    search(word) {
      let currentNode = this.root;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!currentNode.children.has(char)) {
          return false;
        }
        currentNode = currentNode.children.get(char);
      }
      return currentNode.isEndOfWord;
    }
  
    delete(word) {
      this._deleteHelper(this.root, word, 0);
    }
  
    _deleteHelper(currentNode, word, index) {
      if (index === word.length) {
        currentNode.isEndOfWord = false;
        return;
      }
  
      const char = word[index];
      if (!currentNode.children.has(char)) {
        return;
      }
  
      const nextNode = currentNode.children.get(char);
      this._deleteHelper(nextNode, word, index + 1);
  
      // Remove child node if it is not an end of word and has no children
      if (!nextNode.isEndOfWord && nextNode.children.size === 0) {
        currentNode.children.delete(char);
      }
    }
  }
  

  function main() {
    const trie = new Trie();
  
    // 添加单词
    trie.insert("apple");
    trie.insert("banana");
    trie.insert("orange");
  
    // 搜索单词
    console.log(trie.search("apple")); // 输出: true
    console.log(trie.search("banana")); // 输出: true
    console.log(trie.search("orange")); // 输出: true
    console.log(trie.search("grape")); // 输出: false
  
    // 删除单词
    trie.delete("banana");
    console.log(trie.search("banana")); // 输出: false
  }
  main();