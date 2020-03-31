const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const router = express.Router();

const Admin = require('../models/admin');

router.post("/", async(req, res) => {
    let admin = await Admin.findOne({ email: req.body.email});

    if(!admin) {
        return res.status(400).send("Invalid Email!");
    }

    if( await crypto.createHash('md5').update(req.body.password).digest('hex') === admin.password) {
        let token = jwt.sign({ id: admin._id, email: admin.email}, process.env.SECRET);
        res.send({
            token: token
        });
    } else {
        return res.status(400).send("Password entered is wrong!");
    }
});

module.exports = router;