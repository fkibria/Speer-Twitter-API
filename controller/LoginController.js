const loginModel = require('../model/LoginModel');

login = (req, res) => {
    loginModel.login(req.body.email, req.body.password, req)
    .then((data) => {
        res.status(200).send("User logged in as " + req.body.email);
    })
    .catch((err) => {
        res.status(404).send("ERROR: " + err);
    })
}

logout = (req, res) => {
    req.session.userId = null;
}

module.exports = {
    login,
    logout
}