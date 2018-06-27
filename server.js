const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoURL = process.env.MONGO_URL || process.env.MONGODB_URI
console.log("mongoURLHeroku = " + mongoURL)

if (mongoURL == null && process.env.MONGODB_DATABASE) {
    var mongoURLLabel
    mongoURL = "mongodb://"
        mongoHost = process.env.DATABASE_SERVICE_NAME ? process.env.DATABASE_SERVICE_NAME  : '127.0.0.1:27017',
        mongoDatabase = process.env.MONGODB_DATABASE
        mongoPassword = process.env.MONGODB_PASSWORD,
    mongoUser = process.env.MONGODB_USER;

    if (process.env.MONGO_PORT) {
            mongoHost = mongoHost + ":" + process.env.MONGO_PORT
        }

    if (mongoHost && mongoDatabase) {
        mongoURLLabel =  mongoURL + 'xxx:xxx@' + mongoHost + '/' + mongoDatabase;;

        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }

        mongoURL += mongoHost + '/' + mongoDatabase;

    }
    console.log("mongoURLLabel = " + mongoURLLabel)
}


// Connecting to the database
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Yep, the app is running."});
});

require('./app/routes/cliche.routes.js')(app);

var port = process.env.PORT || 3000;
var ip   = process.env.IP
console.log("port = " + port);

if (ip) {
    app.listen(port, ip);
    console.log('Server running on http://%s:%s', ip, port);
} else if (port) {
    app.listen(port);
    console.log('Server running on http://:%s', ip, port);
} else {
    console.log("Uh oh. No ip / port config")
}
