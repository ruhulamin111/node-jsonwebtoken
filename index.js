const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>
    res.send('jsonwebtoken server')
)
app.listen(port, () => {
    console.log('jsonwebtoken server running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjrcntk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const tokenCollection = client.db('webtoken').collection('token')

        app.get('/products', async (req, res) => {
            const result = await tokenCollection.find({}).toArray()
            res.send(result)
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await tokenCollection.insertOne(product)
            res.send(result)
            console.log(result);

        })



    }
    catch (error) {
        console.log(error);
    }
    finally {

    }

}
run().catch(console.dir)
