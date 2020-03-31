const express = require('express');
const authenticator = require('../middleware/authenticator');
authenticator();

const router = express.Router();
const Book = require('../models/book');
const { check, validationResult } = require('express-validator');

router.get("/", async (req, res) => {
    try {
        let books = await book.find();
        return res.status(200).send(books);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.get("/:bookId", (req, res) => {
    try{
        let book = Book.findById(req.params.bookId);

        if(!book) {
            return res.status(400).send("Requested book is not available");
        }

        res.status(200).send(book);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.post("/", [
    check('title').isEmpty().withMessage('Book title cannot be empty'),
    check('link').isURL().withMessage('Link must be a valid link'),
    check('thumbnail').isBase64().withMessage('Not a valid Image'),
    check('price').isCurrency({require_symbol: false, thousands_separator: ',', decimal_separator: '.', allow_decimal: true, digits_after_decimal: [2]}).withMessage('Invalid Price')
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
    const price = req.body.price;

    try{
        let addBook = new Book({
            title: title,
            description: description,
            link: link,
            thumbnail:thumbnail,
            rating: rating,
            price: price
        });

        return res.send(addBook);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.put("/:bookId",  [
    check('title').isEmpty().withMessage('Book title cannot be empty'),
    check('link').isURL().withMessage('Link must be a valid link'),
    check('thumbnail').isBase64().withMessage('Not a valid Image'),
    check('price').isCurrency({require_symbol: false, thousands_separator: ',', decimal_separator: '.', allow_decimal: true, digits_after_decimal: [2]}).withMessage('Invalid Price')
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array()});
    }
    try{
        let updateBook = Book.findById(req.params.bookId);

        if(!updateBook) {
            return res.status(400).send("Requested Book does not found");
        }

        const title = req.body.title;
        const description = req.body.description;
        const link = req.body.link;
        const thumbnail = req.body.thumbnail;
        const rating = req.body.rating;
        const price = req.body.price;

        updateBook.set({
            title: title,
            description: description,
            link: link,
            thumbnail:thumbnail,
            rating: rating,
            price: price
        });

        updateBook = await updateBook.save();

        res.status(200).send(updateBook);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete("/:bookId", async (req, res) => {
    try{
        let book = await book.findOneAndDelete({ _id: req.params.bookId});

        if(!book) {
            return res.status(404).send("Book does not exist from the requested ID");
        }

        res.send(book);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;