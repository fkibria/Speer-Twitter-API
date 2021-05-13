isEmailTaken = (email) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Users");
        collection.find({"email": email}).toArray((err, data) => {
            if(err){
                reject(err);
            }
            else if(data.length > 0){
                reject("Email is Taken");
            }else{
                resolve();
            }
        })
    })
}

addNewUser = (user) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection("Users");

        collection.insertOne(user, (err, _data) => {
            if(err){
                reject();
            }
            resolve("User Added");
        })
    })
}

module.exports = {
    isEmailTaken,
    addNewUser
} 