const express = require("express");
const router = express.Router();

const tweetController = require('../controller/tweetController');

router
.post("/post-tweet", tweetController.createTweet)
.get("/get-all-tweets", tweetController.getAllTweets)
.update("/update-tweet-text", tweetController.updateTweet)
.update("/toggle-tweet-like", tweetController.toggleLike)
.delete("/delete-tweet", tweetController.deleteTweet)

module.exports = router;
