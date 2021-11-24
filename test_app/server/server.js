var express = require('express');
const app = express();
const path = require('path')
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, '..', 'build')

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
