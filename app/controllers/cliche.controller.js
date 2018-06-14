const Cliche = require('../models/cliche.model.js');

// Create and Save a new cliche
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "cliche content can not be empty"
        });
    }

    // Create a cliche
    const cliche = new Cliche({
        // default to football
        sport: req.body.sport || "Football",
        content: req.body.content
    });

    // Save cliche in the database
    cliche.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the cliche record."
        });
    });
};


// Retrieve and return all cliches from the database.
exports.findAll = (req, res) => {
    Cliche.find()
        .then(cliches => {
            res.send(cliches);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cliches."
        });
    });
};


// Find a random set of cliches
exports.findRandom = (req, res) => {
    const count = parseInt(req.params.clicheCount)
    Cliche.aggregate([ { $sample: { size: count } },
        // TODO: update for multiple sports
        { $match:  {"sport" : "Football"} },
        {$project : {_id : 1, content : 1} }
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
    }).then(cliches => {
        res.send(cliches);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cliches."
        });
    });
};


// Find a single cliche with a clicheId
exports.findOne = (req, res) => {
    Cliche.findById(req.params.clicheId)
        .then(cliche => {
            if(!cliche) {
                return res.status(404).send({
                    message: "Cliche not found with id " + req.params.clicheId
                });
            }
            res.send(cliche);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cliche not found with id " + req.params.clicheId
            });
        }
        return res.status(500).send({
            message: "Cliche retrieving note with id " + req.params.clicheId
        });
    });
};
