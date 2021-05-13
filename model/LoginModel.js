const bcrypt = require('bcryptjs');

login = (email, password, req) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Users");
        collection.find({"email": email}).toArray((err, data) => {
            if(data){
                const incoming = data[0];
                bcrypt.compare(password, incoming.password, (error, same) => {
                    if(same){
                        req.session.userId = incoming._id;
                        resolve();
                    }
                    reject("No user with this EMAIL and PASSWORD");
                })
            }
            if(err){
                reject(err);
            }
        })
    })
}

module.exports = {
    login
} 