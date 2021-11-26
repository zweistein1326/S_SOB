const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control_Allow-Headers', "x-access token, Origin, Content-Type, Accept");
    res.setHeader("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTYzNjQ5MTkyNzA5MiIsImVtYWlsIjoiY0BjIiwiaWF0IjoxNjM2NDkxOTI3LCJleHAiOjE2MzY0OTkxMjd9.3nKmcqEh9NSx8qLX-OaVjOqIeTSBFk4BjQxELrQf1O4");
    next();
})

const { Blockchain, Block, Transaction, findUserById } = require('./blockchain');

const blockchain = new Blockchain();

blockchain.init();

app.post('/addTransaction', (req, res, next) => {
    const { type, issuerId, receiverId, data } = req.body;
    const transaction = new Transaction(type, issuerId, receiverId, data);
    res.send(true);
});

app.post('/mineBlock', (req, res, next) => {
    blockchain.mineBlock();
});

app.get('/getTransaction', (req, res, next) => {
    // blockchain.getTransaction();
})

app.listen(port, () => { console.log(`Listening on port ${port}`) })


