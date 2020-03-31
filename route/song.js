const express = require('express');
const authenticator = require('../middleware/authenticator');
authenticator();

const router = express.Router();
const Song = require('../models/song');
const { check, validationResult } = require('express-validator');

router.get("/", async (req, res) => {
    try {
        let songs = await Song.find();
        return res.status(200).send(songs);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.get("/:songId", (req, res) => {
    try{
        let song = Song.findById(req.params.songId);

        if(!song) {
            return res.status(400).send("Requested Song is not available");
        }

        res.status(200).send(song);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.post("/", [
    check('title').isEmpty().withMessage('Song title cannot be empty'),
    check('artist').isEmpty().withMessage('Artist cannot be empty'),
    check('musician').isEmpty().withMessage('Musician cannot be empty'),
    check('lyricist').isEmpty().withMessage('Lyricist cannot be empty'),
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
    const artist = req.body.artist;
    const musician = req.body.musician;
    const thumbnail = req.body.thumbnail;
    const lyricist = req.body.lyricist;
    const link = req.body.link;
    const price = req.body.price;

    try{
        let addSong = new song({
            title: title,
            artist: artist,
            musician: musician,
            lyricist: lyricist,
            link: link,
            thumbnail: thumbnail,
            price: price
        });

        return res.send(addSong);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.put("/:songId", [
    check('title').isEmpty().withMessage('Song title cannot be empty'),
    check('artist').isEmpty().withMessage('Artist cannot be empty'),
    check('musician').isEmpty().withMessage('Musician cannot be empty'),
    check('lyricist').isEmpty().withMessage('Lyricist cannot be empty'),
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
        let updateSong = Song.findById(req.params.songId);

        if(!updateSong) {
            return res.status(400).send("Requested song does not found");
        }

        const title = req.body.title;
        const artist = req.body.artist;
        const musician = req.body.musician;
        const thumbnail = req.body.thumbnail;
        const lyricist = req.body.lyricist;
        const link = req.body.link;
        const price = req.body.price;

        updateSong.set({
            title: title,
            artist: artist,
            musician: musician,
            lyricist: lyricist,
            link: link,
            thumbnail: thumbnail,
            price: price
        });

        updateSong = await updatesong.save();

        res.status(200).send(updatesong);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete("/:songId", async (req, res) => {
    try{
        let song = await Song.findOneAndDelete({ _id: req.params.songId});

        if(!song) {
            return res.status(404).send("Song does not exist from the requested ID");
        }

        res.send(song);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;
