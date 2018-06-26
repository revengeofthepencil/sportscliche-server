const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL

if (mongoURL == null && process.env.MONGODB_DATABASE) {
        mongoHost = process.env.DATABASE_SERVICE_NAME ? process.env.DATABASE_SERVICE_NAME  : '127.0.0.1:27017',
        mongoPort = process.env.MONGO_PORT ? process.env.MONGO_PORT  : null,
        mongoDatabase = process.env.MONGODB_DATABASE
        mongoPassword = process.env.MONGODB_PASSWORD,
    mongoUser = process.env.MONGODB_USER;

        if (mongoPort && mongoPort != null) {
            mongoHost = mongoHost + ":" + mongoPort
        }

    if (mongoHost && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

    }
}

console.log("mongoURL = " + mongoURL)

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
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/cliche.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});