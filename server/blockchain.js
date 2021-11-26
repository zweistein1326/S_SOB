const bcrypt = require('bcrypt');
const { getAllUsers } = require('./database');
const { v4: uuid } = require('uuid');
let worldState = [];

setTimeout(() => {
    worldState = getAllUsers();
    console.log(worldState);
    // console.log(users);
}, 2000); // manage like a normal database and also store transaction history
console.log('starting blockchain');

/*
This class instantiates the blockchain network
*/
class Blockchain {
    constructor() {
        this.chain = []
        this.startBlockchain();
    }

    // Initiate Blockchain
    startBlockchain() {
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
    constructor(type, userId, data) {
        this.txnId = Math.random() * 1000000;
        this.type = type;
        this.userId = userId;
        this.message = this.generateMessage(data);
    }

    // Generates message for transaction based on TxnType
    generateMessage(data) {
        if (this.type == "createUser") {
            return this.addUser(data);
        }
        if (this.type == "addCredential") {
            return this.addCredential(data);
        }
        if (this.type == "init") {
            return 'blockchain started';
        }
        if (this.type == "updateCredential") {
            return this.updateCredential(data);
        }
    }

    // TxnType: createUser
    addUser(data) {
        console.log(data);
        const { username } = data;
        if (findUserById(this.userId)) {
            return 'user with same username already exists';
        }
        else {
            worldState.push({ id: this.userId, username: username });
            console.log(worldState);
            return `user#${this.userId} was created`
        }
    }

    // TxnType: addCredential
    addCredential({ issuerId, to, key, credential, iat }) {
        if (findUserById(to)) {
            const index = worldState.findIndex((user) => user.id == to)
            const newCredential = { issuerId, key, credential, iat };
            const credentialId = uuid(newCredential)
            const credentials = worldState[index].credentials || []
            worldState[index] = { ...worldState[index], credentials: credentials.concat([{ id: credentialId, ...newCredential }]) }
            return `created credential#${credentialId} for user#${to}`
        }
        else {
            throw `user#${to} not found`
        }
    }

    updateCredential({ issuerId, to, key, credential, credentialId, iat }) {
        if (findUserById(issuerId)) {
            const user = findUserById(to);
            if (user) {
                const userCredentials = user.credentials
                if (userCredentials) {
                    const findCredential = userCredentials.find((cred) => cred.id === credentialId)
                    const findCredentialIndex = userCredentials.findIndex((cred) => cred.id === credentialId)
                    if (findCredential) {
                        const newCredential = { ...findCredential.credential, ...credential }
                        userCredentials[findCredentialIndex] = newCredential;
                        console.log(findUserById(to));
                        return `User#${issuerId} updated User#${to}: credential#${credentialId} successfully`
                    }
                    else {
                        throw `No credential with key:${key} and credentialId:${credentialId} found`;
                        // No transaction => return to server
                    }
                }
                else {
                    throw `No credential with key:${key} and credentialId:${credentialId} found`;
                }
            }
            else {
                throw `User#${to} not found`
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
    return worldState.find((user) => user.id == id);
}

module.exports = { Block, Blockchain, Transaction, findUserById }