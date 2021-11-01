const worldState = []; // manage like a normal database and also store transaction history
const bcrypt = require('bcrypt');
/*
This class instantiates the blockchain network
*/
class Blockchain {
    constructor() {
        this.chain = []
        this.currentBlock = new Block(0, Date.now());
        this.startBlockchain();
    }

    startBlockchain() {
        console.log('Blockchain is live!!!');
    }

    addToChain() {
        this.chain.concat([this.currentBlock]);
    }

    getCurrentBlock() {
        return this.currentBlock;
    }

    getPreviousBlock() {
        return this.chain[this.chain.length - 1];
    }

    async mineBlock() {
        console.log('mining block');
        await this.currentBlock.generateHash();
        this.chain.concat([this.currentBlock]);
        console.log(this.currentBlock);
    }

    createNewBlock() {
        previousBlock = this.getPreviousBlock();
        this.currentBlock = new Block(previousBlock.hash, Date.now());
    }
}


/*
This class defines a Block on the blockchain
*/
class Block {
    constructor(previousHash, createdAt) {
        this.createdAt = createdAt;
        this.transactions = []
        this.previousHash = previousHash;
        this.hash = null;
    }

    addToBlock(transaction) {
        // console.log(transaction);
        this.transactions.push(transaction);
    }

    async generateHash() {
        try {
            this.hash = await bcrypt.hash(JSON.stringify({
                createdAt: this.createdAt,
                previousHash: this.previousHash,
                transactions: this.transactions
            }), 0);
        }
        catch (e) {
            console.log(e);
        }
    }
}

/*
This class defines a transaction
*/
class Transaction {
    constructor(type, userId) {
        this.txnId = Math.random() * 1000000;
        this.type = type;
        this.userId = userId;
    }
}

module.exports = { Block, Blockchain, Transaction }