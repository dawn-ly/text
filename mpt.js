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
