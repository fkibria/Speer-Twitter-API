const tweetModel = require("../model/tweetModel");

updateTweet = (req, res) => {
    if (req.session.userId) {
        const tweet = {
            _id: req.body.tweetId,
            text: req.body.tweetText,
            author: req.session.userId
        };
        tweetModel.updateTweet(tweet)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((_err) => {
                res.status(400).send("Could not update your tweet");
            })
    } else {
        res.status(400).send("Login to update your tweet");
    }
}

createTweet = (req, res) => {
    if (req.session.userId) {
        const tweet = {
            text: req.body.tweetText,
            author: req.session.userId
        };
        tweetModel.createTweet(tweet)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((_err) => {
                res.status(400).send("Could not create your tweet");
            })
    } else {
        res.status(400).send("Login to create your tweet");
    }
}

deleteTweet = (req, res) => {
    if (req.session.userId) {
        tweetModel.deleteTweet(req.body.tweetId)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(400).send("ERROR: " + err);
            })
    } else {
        res.status(400).send("Login to delete your tweet");
    }
}

getAllTweets = (_req, res) => {
    tweetModel.getAllTweets()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((_err) => {
            res.status(400).send("could not fetch tweets");
        })
}

toggleLikes = (req, res) => {
    toggleLike(req.body.tweetId, res.session.userId)
    .then((data) => {
        res.status(200).send("toggled like");
    })
    .catch((err) => {
        res.status(400).send("cannot toggle like");
    })
}

module.exports = {
    updateTweet,
    createTweet,
    deleteTweet,
    getAllTweets,
    toggleLike
}