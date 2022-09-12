const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()
const jwt = require('jsonwebtoken');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>
    res.send('jsonwebtoken server')
)
app.listen(port, () => {
    console.log('jsonwebtoken server running');
})


