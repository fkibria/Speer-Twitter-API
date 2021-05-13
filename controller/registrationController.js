const registrationModel = require("../model/RegistrationModel");
const bcrypt = require('bcryptjs');

createUser = async (req, res) => {

    //created the user
    const user = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    }

    registrationModel.isEmailTaken(user.email)
    .then(() => {
        registrationModel.addNewUser(user)
        .then(() => {
            res.status(200).send("User Created!");
        })
        .catch((err) => {
            res.status(400).send("ERROR: Could not add new user\n" + err);
        })
    })
    .catch((err) => {
            res.status(400).send("ERROR: User already exists\n" + err);
    })

    //check the email isnt already taken

    //if not taken, add to database
   
}

module.exports = {
    createUser
}