const mongoose = require('mongoose');

mongoose.connect(process.env.DB_url,{
    useNewUrlParser: true,
        useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db is not connected'));

db.once('open', function(err) {
    if (err) {
        console.log("db is not connected || and not working properly");
        return false;
    }
    console.log("db is connected");
});

module.exports= db;

// module.exports = () => {
//     mongoose.connect("mongodb://127.0.0.1:27017/blogdata")
//     .then(data => console.log('db connected'))
//     .catch(e => console.log(e))
// };