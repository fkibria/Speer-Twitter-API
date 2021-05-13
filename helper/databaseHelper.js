const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "Twitter";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

exports.initialize = () => {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if(err){
                reject(err);
            }
            console.log("Connected to the Database!");
            db = client.db(dbName);
            resolve();
        });
    });
}