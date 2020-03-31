const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const authenticate = async(req, res, next) => {
    // const token = req.header("authorization");
    // if (token.startsWith('Bearer ')) {
    //     try {
    //         token = token.slice(7, token.length);
    //         const data = jwt.verify(token, process.env.SECRET);
    //         const admin = await Admin.findOne({ _id: data._id, 'tokens.token': token });
    //         if (!admin) {
    //             return res.status(400).send("Admin is not available!");
    //         }
    //         req.admin = admin;
    //         req.token = token;
    //         next();
    //     } catch (error) {
    //         res.status(401).send({ error: 'Not authorized to access this resource' });
    //     }
    // } else {
    //     return res.status(401).send("Access Denied!");
    // }
}


module.exports = authenticate;