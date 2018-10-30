const express = require('express');

const Review = require('../models/Comentario');

const app = express();

// Routes

// Get reviews
app.get('/api/reviews', function(req, res) {

    console.log("fetching reviews");

    // use mongoose to get all reviews in the database
    Review.find(function(err, reviews) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(reviews); // return all reviews in JSON format
    });
});

// create review and send back all reviews after creation
app.post('/api/reviews', function(req, res) {

    console.log("creating review");

    // create a review, information comes from request from Ionic
    Review.create({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        done: false
    }, function(err, review) {
        if (err)
            res.send(err);

        // get and return all the reviews after you create another
        Review.find(function(err, reviews) {
            if (err)
                res.send(err)
            res.json(reviews);
        });
    });

});

// delete a review
app.delete('/api/reviews/:review_id', function(req, res) {
    Review.remove({
        _id: req.params.review_id
    }, function(err, review) {

    });
});

module.exports = app;