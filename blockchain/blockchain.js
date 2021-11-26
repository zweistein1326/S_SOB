const bcrypt = require('bcrypt');
const { getAllUsers } = require('./database');
const { v4: uuid } = require('uuid');
let worldState = [];
let transactions = [];

function generateWorldState() {
    let worldState = []
    transactions.forEach((transaction) => {
        if (transaction.type == '0001') {
            worldState.push({ userId: transaction.userId, username: transaction.data.username })
        }
    })
    return worldState;
}

setTimeout(() => {
    transactions = [
        new Transaction('0001', 'abcdefgh', '0', { username: 'Siddharth' }),
        new Transaction('0001', '123456', '0', { username: 'Anuj' }),
        new Transaction('0001', 'abcdefgh12134', '0', { username: 'Ivan' })
    ];
    worldState = generateWorldState();
    console.log(worldState);
    // console.log(users);
}, 0000); // manage like a normal database and also store transaction history
console.log('starting blockchain');
/*
This class instantiates the blockchain network
*/
class Blockchain {
    constructor() {
        this.chain = []
    }

    // Initiate Blockchain
    init() {
        console.log('Blockchain is live!!!');
        const transaction = new Transaction('init', 0, {})
        const block = new Block(0, new Date)
        this.addToChain(block);
        block.addToBlock(transaction)
        this.mineBlock(block);
    }

    // Add block to chain
    addToChain(block) {
        this.chain.push(block);
    }

    // Returns latest block in the chain
    getCurrentBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Implement Mining Algorithm
    async mineBlock() {
        console.log('mining block');
        const block = this.getCurrentBlock();
        console.log(block);
        await block.generateHash();
        this.createNewBlock();
    }

    // Generate new block
    createNewBlock() {
        const previousBlock = this.getCurrentBlock();
        // console.log('previousBlock', previousBlock);
        const newBlock = new Block(previousBlock.hash, new Date());
        this.addToChain(newBlock);
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

    // Add transaction to Block
    addToBlock(transaction) {
        this.transactions.push(transaction);
    }

    // Generate hash for block
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
    constructor(type, issuerId, receiverId, data) {
        this.txnId = Math.random() * 1000000;
        this.type = type;
        this.userId = issuerId;
        this.receiverId = receiverId;
        this.message = this.generateMessage(data);
        this.data = data;
    }

    // Generates message for transaction based on TxnType
    generateMessage(data) {
        if (this.type == "0001") {
            return this.addUser(data);
        }
        if (this.type == "0002") {
            return this.addCredential(data);
        }
        if (this.type == "0000") {
            return 'blockchain started';
        }
        if (this.type == "0003") {
            return this.updateCredential(data);
        }
    }

    // TxnType: createUser
    addUser(data) {
        const { username } = data;
        if (findUserById(this.userId)) {
            return 'user with same username already exists';
        }
        else {
            worldState.push({ userId: this.userId, username: username });
            console.log('transaction complete');
            console.log(worldState);
            return `user#${this.userId} was created`
        }

    }

    // TxnType: addCredential
    addCredential({ key, credential, iat }) {
        if (findUserById(this.receiverId)) {
            const index = worldState.findIndex((user) => user.userId == this.receiverId)
            const newCredential = { issuerId: this.userId, key, credential, iat };
            const credentialId = uuid(newCredential)
            const credentials = worldState[index].credentials || []
            worldState[index] = { ...worldState[index], credentials: credentials.concat([{ id: credentialId, ...newCredential }]) }
            console.log(worldState[index].credentials);
            return `created credential#${credentialId} for user#${this.receiverId}`
        }
        else {
            throw `user#${this.receiverId} not found`
        }
    }

    updateCredential({ issuerId, receiverId, key, credential, credentialId, iat }) {
        if (findUserById(issuerId)) {
            const user = findUserById(receiverId);
            if (user) {
                const userCredentials = user.credentials
                if (userCredentials) {
                    const findCredential = userCredentials.find((cred) => cred.id === credentialId)
                    const findCredentialIndex = userCredentials.findIndex((cred) => cred.id === credentialId)
                    if (findCredential) {
                        const newCredential = { ...findCredential.credential, ...credential }
                        userCredentials[findCredentialIndex] = newCredential;
                        console.log(findUserById(receiverId));
                        return `User#${issuerId} updated User#${receiverId}: credential#${credentialId} successfully`
                    }
                    else {
                        throw `No credential with key:${key} and credentialId:${credentialId} found`;
                        // No transaction => return receiverId server
                    }
                }
                else {
                    throw `No credential with key:${key} and credentialId:${credentialId} found`;
                }
            }
            else {
                throw `User#${receiverId} not found`
                // No transaction => return to server
            }
        }
        else {
            throw `Issuer user#${issuerId} not found`
            // No transaction => return to server
        }
    }
}

function findUserById(id) {
    return worldState.find((user) => user.userId == id);
}

module.exports = { Block, Blockchain, Transaction, findUserById }