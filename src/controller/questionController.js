
const questionModel = require('../models/questions/index')

const create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a question
    const newQues = new questionModel({
        question: req.body.question,
    });

    // Save question in the database
    questionModel.create(newQues, (err, data) => {
        if (err)
            res.status(500).send({
                code: 500,
                message:
                    err.message || "Some error occurred while creating the question."
            });
        else res.send({
            code: 200,
            data,
            message: 'success'
        });
    });
};

const gets = (req, res) => {
    questionModel.getAllQues_Ans((err, data) => {
        if (err)
            res.status(500).send({
                code: 500,
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else {
            console.log("question", data)
            res.send({
                code: 200,
                message: 'success',
                data
            });
        }
    });
};

const getQuestion = (req, res) => {
    questionModel.getAllQues((err, data) => {
        if (err)
            res.status(500).send({
                code: 500,
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else {
            console.log("question", data)
            res.send({
                code: 200,
                message: 'success',
                data
            });
        }
    });
};

// Find a single Customer with a customerId
const search = (req, res) => {
    questionModel.search(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    code: 404,
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    code: 500,
                    message: "Error retrieving Customer with id " + req.params.id
                });
            }
        } else res.send({
            code: 200,
            message: 'success',
            data
        });
    });
};

// Update a Customer identified by the customerId in the request
const update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    questionModel.update(
        req.params.id,
        new questionModel(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found question with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating question with id " + req.params.id
                    });
                }
            } else res.send({
                code: 200,
                message: 'success',
                data
            });
        }
    );
};

// Delete a Customer with the specified customerId in the request
const deletes = (req, res) => {
    questionModel.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.id
                });
            }
        } else res.send({
            message: `Customer was deleted successfully!`,
            code: 200
        });
    });
};

module.exports = {
    create,
    gets,
    search,
    update,
    deletes,
    getQuestion
}