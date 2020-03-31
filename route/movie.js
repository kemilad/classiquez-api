const express = require('express');
const authenticator = require('../middleware/authenticator');
authenticator();

const router = express.Router();
const Movie = require('../models/movie');
const { check, validationResult } = require('express-validator');

router.get("/", async (req, res) => {
    try {
        let movies = await Movie.find();
        return res.status(200).send(movies);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.get("/:movieId", (req, res) => {
    try{
        let movie = Movie.findById(req.params.movieId);

        if(!movie) {
            return res.status(400).send("Requested movie is not available");
        }

        res.status(200).send(movie);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.post("/", [
    check('title').isEmpty().withMessage('Movie title cannot be empty'),
    check('link').isURL().withMessage('Link must be a valid link'),
    check('thumbnail').isBase64().withMessage('Not a valid Image'),
    check('price').isCurrency({
        require_symbol: false, 
        thousands_separator: ',', 
        decimal_separator: '.', 
        allow_decimal: true, 
        digits_after_decimal: [2]
    }).withMessage('Invalid Price')
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array()});
    }

    const title = req.body.title;
    const description = req.body.description;
    const link = req.body.link;
    const thumbnail = req.body.thumbnail;
    const rating = req.body.rating;
    const price = req.price.price;

    try{
        let addMovie = new Movie({
            title: title,
            description: description,
            link: link,
            thumbnail:thumbnail,
            rating: rating,
            price: price 
        });

        return res.send(addMovie);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.put("/:movieId",  [
    check('title').isEmpty().withMessage('Movie title cannot be empty'),
    check('link').isURL().withMessage('Link must be a valid link'),
    check('thumbnail').isBase64().withMessage('Not a valid Image'),
    check('price').isCurrency({
        require_symbol: false, 
        thousands_separator: ',', 
        decimal_separator: '.', 
        allow_decimal: true, 
        digits_after_decimal: [2]
    }).withMessage('Invalid Price')
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array()});
    }
    try{
        let updateMovie = Movie.findById(req.params.movieId);

        if(!updateMovie) {
            return res.status(400).send("Requested movie does not found");
        }

        const title = req.body.title;
        const description = req.body.description;
        const link = req.body.link;
        const thumbnail = req.body.thumbnail;
        const rating = req.body.rating;
        const price = req.body.price;


        updateMovie.set({
            title: title,
            description: description,
            link: link,
            thumbnail: thumbnail,
            rating: rating,
            price: price
        });

        updateMovie = await updateMovie.save();

        res.status(200).send(updateMovie);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete("/:movieId", async (req, res) => {
    try{
        let movie = await Movie.findOneAndDelete({ _id: req.params.movieId});

        if(!movie) {
            return res.status(404).send("Movie does not exist from the requested ID");
        }

        res.send(bovie);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;