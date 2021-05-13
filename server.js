const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");

const registrationRouter = require("./router/registrationRouter");
const loginRouter = require("./router/loginRouter");
const tweetRouter = require("./router/tweetRouter");


const dbHelper = require('./helper/databaseHelper');

const HTTP_PORT = process.env.PORT || 8080;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
    secret: 'twitter API secret!',
    resave: false,
    saveUninitialized: false
}))

app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/tweet', tweetRouter);


function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

dbHelper.initialize()
    .then(() => {
        app.listen(HTTP_PORT, onHttpStart);
    })
    .catch((err) => {
        console.error("ERROR: Database not connected\n" + err);
    })
