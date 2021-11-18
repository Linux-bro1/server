const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 8000;

const app = express()

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://aman:aman@cluster0.d2icu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("computer-networking");
        const userCollection = database.collection("lab-report2");

        console.log("db connection ok");

        // POST API 
        // app.post('/users', async (req, res) => {
        //     const newUser = req.body;
        //     const result = await userCollection.insertOne(newUser);
        //     console.log('Got new user', req.body);
        //     console.log('Added user', result);
        //     res.send("Hit the post");

        // })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Server running Successfully")
})


app.listen(port, () => {
    console.log(`App listening at http://aman:${port}`);
})