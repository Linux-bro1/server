const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 8000;

const app = express()

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d2icu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const userCollection = database.collection(process.env.DB_COLLECTION);

        console.log("db connection ok");

        // POST API 
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            console.log('Got new user', req.body);
            console.log('Added user', result);
            res.send("Data posted successfully...");
        })
    }finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Server running Successfully!!!")
})


app.listen(port, () => {
    console.log(`App listening at http://aman:${port}`);
})