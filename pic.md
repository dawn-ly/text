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









# 代码：

```js
import keccak256 from 'keccak256'


class MPTNode {
  constructor() {
    this.value = null;
    this.children = {};
  }
}

class MPT {
  constructor() {
    this.root = new MPTNode();
  }

  insert(account, balance) {
    let currentNode = this.root;
    const address = account.toLowerCase();

    for (let i = 2; i < address.length; i++) {
      const nibble = parseInt(address[i], 16);
      const childNode = currentNode.children[nibble] || new MPTNode();
      currentNode.children[nibble] = childNode;
      currentNode = childNode;
    }

    currentNode.value = balance;
  }

  get(account) {
    let currentNode = this.root;
    const address = account.toLowerCase();

    for (let i = 2; i < address.length; i++) {
      const nibble = parseInt(address[i], 16);
      const childNode = currentNode.children[nibble];

      if (!childNode) {
        return null;
      }

      currentNode = childNode;
    }

    return currentNode.value;
  }

  calculateRoot() {
    const rootHash = this._calculateNodeHash(this.root);
    return rootHash;
  }

  verify(account, balance) {
    const storedBalance = this.get(account);
    return storedBalance === balance;
  }

  _calculateNodeHash(node) {
    if (node.value !== null) {
      return keccak256(node.value.toString()).toString();
    }

    let childrenHashes = [];
    for (const childNode of Object.values(node.children)) {
      const childHash = this._calculateNodeHash(childNode);
      childrenHashes.push(childHash);
    }

    const concatenatedHashes = childrenHashes.join('');
    const nodeHash = keccak256(concatenatedHashes).toString();
    return nodeHash;
  }
}

// 示例用法
const mpt = new MPT();

// 插入账户和余额
mpt.insert('0x95222290dd7278aa3ddd389cc1e1d165cc4', 100);
mpt.insert('0xaabbccddeeff00112233445566778899', 200);

// 获取账户余额
console.log(mpt.get('0x95222290dd7278aa3ddd389cc1e1d165cc4')); // 输出: 100
console.log(mpt.get('0xaabbccddeeff00112233445566778899')); // 输出: 200

// 验证账户余额
console.log(mpt.verify('0x95222290dd7278aa3ddd389cc1e1d165cc4', 100)); // 输出: true
console.log(mpt.verify('0xaabbccddeeff00112233445566778899', 300)); // 输出: false

// 计算根哈希值

const buffer = Buffer.from(mpt.calculateRoot(), 'utf8');
const hex = buffer.toString('hex');
console.log(hex);

```

## 截图：

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230607175758416.png)

## 改良和改进之处

1. 压缩存储：以太坊使用了编码方式对字典树进行压缩存储，以减少存储空间的占用。它通过将节点的键值对进行编码，避免了重复存储相同的前缀。这样可以有效地减小存储需求，提高存储效率。
2. 动态节点：以太坊的字典树节点是动态的，它允许对树进行更新和修改。这使得以太坊可以根据实际情况动态地添加、删除和修改账户的数据内容。这种动态性使得以太坊的字典树更加灵活和适应性强。
3. 不可变性和验证性：以太坊的字典树是不可变的数据结构，每个节点的哈希值都与其内容相关。这种不可变性使得以太坊能够进行数据的验证和完整性检查。通过计算根节点的哈希值，可以验证整个字典树的完整性，确保数据的一致性和安全性。


以太坊在字典树（Merkle Patricia Tree，简称MPT）的基础上进行了一些改良，以满足区块链的特定需求。下面是以太坊对字典树的改良和改进之处：

1. 压缩存储：以太坊使用了编码方式对字典树进行压缩存储，以减少存储空间的占用。它通过将节点的键值对进行编码，避免了重复存储相同的前缀。这样可以有效地减小存储需求，提高存储效率。
2. 动态节点：以太坊的字典树节点是动态的，它允许对树进行更新和修改。这使得以太坊可以根据实际情况动态地添加、删除和修改账户的数据内容。这种动态性使得以太坊的字典树更加灵活和适应性强。
3. 不可变性和验证性：以太坊的字典树是不可变的数据结构，每个节点的哈希值都与其内容相关。这种不可变性使得以太坊能够进行数据的验证和完整性检查。通过计算根节点的哈希值，可以验证整个字典树的完整性，确保数据的一致性和安全性。

## 以太坊的MPT旨在解决区块链中的核心问题，其中包括：

1. 存储效率：MPT使用了压缩存储和动态节点的方法，以最小化存储空间的占用。这对于区块链中大量数据的存储是至关重要的，可以显著降低存储成本。
2. 数据验证和完整性：MPT使用哈希值来验证整个字典树的完整性。通过计算根节点的哈希值，可以确保数据的一致性和安全性，防止数据篡改和损坏。
3. 高效的数据访问：MPT使用了前缀树的结构，可以快速地查找和访问特定的数据项。这对于区块链中的快速数据检索和查询是非常重要的，提高了数据访问的效率。



