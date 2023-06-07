# 实验报告模板

## 小组成员

- 2021131043-刘杨
- 2021131042-杜以晴
- 2021131044-韦薪程
- 2021131010-张雨桐
- 2021131001-敬家好
- 2021131005-何欣
- 2021131004-陈莉


## 代码仓库链接

https://github.com/dawn-ly



## 第一课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af

## 代码

```js
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
```

## 运行结果：

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230607174122303.png)

## 优缺点：

下面是对字典树的优缺点进行讨论和总结：

**优点：**

- 高效的前缀匹配：字典树可以快速查找具有相同前缀的单词，对于搜索引擎、自动补全和拼写检查等应用具有很高的效率。
- 空间优化：相对于哈希表或平衡二叉树，字典树可以节省空间，因为共享相同前缀的单词可以共享节点。
- 支持按字典序遍历：字典树的结构可以支持按字典序遍历所有单词，对于需要按字母顺序输出的应用很有用。

**缺点：**

- 内存消耗较大：字典树的节点需要额外的存储空间来存储子节点的指针，对于存储大量单词的情况，可能占用较多内存。
- 构建时间较长：构建字典树的过程需要遍历所有单词，插入和删除操作也需要遍历单词的每个字符，时间复杂度较高。

## 关于拓展和优化字典树数据结构的思考：

- 压缩字典树（压缩前缀树）：通过合并具有相同前缀的节点，减少存储空间的消耗，提高空间效率。
- 倒排字典树：在传统字典树的基础上，将单词的后缀作为节点，可以实现后缀匹配和快速搜索后缀的功能。
- 位图字典树：针对特定应用场景，可以使用位图存储子节点的存在与否，进一步减少存储空间的消耗。

通过以上的拓展和优化，可以根据具体的应用需求来平衡空间占用和查询效率，提高字典树的实用性和性能。