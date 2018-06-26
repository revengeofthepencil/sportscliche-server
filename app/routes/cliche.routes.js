module.exports = (app) => {
    const cliches = require('../controllers/cliche.controller.js');

    // Create a new cliche
    app.post('/cliches', cliches.create);

    // Retrieve all cliches
    app.get('/', cliches.findAll);

    // Retrieve all cliches
    app.get('/cliches', cliches.findAll);

    // Retrieve a single cliche with clicheId
    app.get('/cliches/:clicheId', cliches.findOne);


    // Retrieve a random set of cliches
    app.get('/cliches/random/:clicheCount', cliches.findRandom);

}
