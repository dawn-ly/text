import sha256 from 'crypto-js/sha256.js'


/*
* 实现merkleTree
* 两种构思; 
* 1.使用节点的方式存储hsah值。即通过node(left,hash,right)构造,从而得到一棵默克尔树
* 2.使用层级的方式一层层的存储hash值，即使用map:int为键，每层hash字符串数组作为值
* 本题采用2，因为该种数据结构在查找交易哪里出错时的速度更快，而且对交易的添加和删除也更容易
*
* 提供添加节点和删除节点的思路，本数据结构使用三个变量
* 1）leaves --- 用于存储排序过的打包的交易hash
* 2）tree --- 存储默克尔树的数组
* 3）merkleroot --- 默克尔树根
*
* 注：要使用
*/
class MerkleTree{


    constructor(){
        //以下代码在实验5时可以添加，用于计算默克尔根
        //交易hash数组
        this.leaves = []
        //交易hash生成的树
        this.tree = {}
    
    }
    
    /*
    * 对交易进行排序（这里默认排过序，因为实验是按顺序加入交易的），对每个交易的数据进行hash处理
    * trxs是一个排好序的交易数组，方法要返回一个交易hash值数组作为merkletree的叶子
    */
    createLeaves(trxs) {
        var leaves = []
        for(var i = 0;i < trxs.length;i++) {
            leaves[i] = trxs[i].hash
        }
        return leaves
    }

    /**
     * 创建mewrkle树，会返回储存merkle树的数组
     * 思路：将merkle树处于相同高度的节点组织为同一层，本层的节点hash由上层的节点获得
     * */
    createNodeTree(leaves){
        //初始化tree，叶子节点hash加入数组
        var tree = leaves.slice()
        //构建新一层时，需要从上一层获得数据，该变量是上一层的长度
        var len = leaves.length
        //指向每层的初始
        var laybegin = 0
        while(len > 1){
            var newlayer=[]
            //构建新的层
            for(var p = 0;p < len;p+=2){
                let left = laybegin+p
                let right = laybegin+p+1
                //若该层len是奇数，会复制最后一个hash用于计算父节点的hash值
                if( right > len+laybegin-1){
                  right = left
                }
                newlayer[p/2] = sha256(tree[left]+ tree[right]).toString()
            }
            len = Math.ceil(len/2) //向上取整，更新len
            laybegin = tree.length //laybegin指向下一层的起始点
            tree = tree.concat(newlayer)//将tree与新一层合并
        }
        return tree
    }

    //对交易的添加也很简单，直接在叶子节点中加入交易，再对其进行排序，同样删除也是同样操作
    addTrx(trx){
        this.leaves.push(trx)
        this.sortTrx()
    }

    //提供对交易进行排序的方法,随便写个排序算法,该交易必须实现briTime，即交易的生成时间，该时间是用于排序的键
    sortTrx(){
        for(var i = 0;i < this.leaves.length;i++){
            for(var j = 0;j < this.leaves.length-i;j++)
              if(this.leaves[j].birTime > this.leaves[j+1].birTime){
                 var p = this.leaves[j]
                 this.leaves[j] = this.leaves[j+1]
                 this.leaves[j+1] = p
              }
        }
    }
    
}



export default MerkleTree
