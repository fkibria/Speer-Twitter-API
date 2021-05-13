const ObjectID = require('mongodb').ObjectID;

createTweet = (tweet) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Tweets");

        collection.insertOne(tweet, (err, _data) => {
            if (err) {
                reject(err);
            }
            resolve("Tweet Posted");
        })
    })
}

updateTweet = (tweet) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Tweets");

        try {
            collection.updateOne(
                { "_id": objectID(tweet._id) },
                {
                    $set: {
                        text: tweet.text
                    }
                },
                { upsert: false })

                resolve("Tweet is updated")
        }
        catch (e) {
            console.log(e);
            reject("Cannot update tweet");
        }
    })
}

deleteTweet = (id) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Tweets");
        try {
            collection.deleteOne({ "_id": objectID(tweet._id) });
            resolve("Tweet Deleted");
        }
        catch (e) {
            console.log(e);
            reject("Cannot delete tweet");
        }
    })
}

getAllTweets = () => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Tweets");
        
        collection.find({}).toArray((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        })

    })
}

getTweet = (tweetId) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Tweets");
        
        collection.find({"_id" : objectID(tweetId)}).toArray((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data[0]);
        })

    })
}

toggleLike = (tweetId, userId) => {
    getTweet(tweetId)
    .then((data) => {
        let tweet = data;

        //check if the user has liked it or not
        if(tweet.likes[userId] == false || !tweet.likes[userId] ){
            tweet.likes[userId] = true //ture means liked
        }else{
            tweet.likes[userId] = false //false mean no liked
        }

        //update the tweets like variable
        const collection = db.collection("Tweets");
        try {
            collection.updateOne(
                { "_id": objectID(tweetId) },
                {
                    $set: {
                        likes: tweet.likes
                    }
                },
                { upsert: false })

                resolve("Tweet likes is updated")
        }
        catch (e) {
            console.log(e);
            reject("Cannot update tweet likes");
        }
    })
}

module.exports = {
    createTweet,
    updateTweet,
    deleteTweet,
    getAllTweets,
    toggleLike
}