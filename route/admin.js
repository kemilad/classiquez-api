const express = require('express');
// const authenticator = require('../middleware/authenticator');
// authenticator();

const router = express.Router();
const Admin = require('../models/admin');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');

router.get("/", async (req, res) => {
    try {
        let admins = await Admin.find();
        return res.status(200).send(admins);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.get("/:adminid", (req, res) => {
    try {
        let adminById = Admin.findById(req.param.adminId);

        if(!adminById) {
            return res.status(400).send("Requested admin is not available!");
        }

        res.status(200).send(adminById);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.post("/", [
    check('firstName').isAlpha().withMessage('First name must be only alphabetical chars'),
    check('lastName').isAlpha().withMessage('Last Name must be only alphabetical chars'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 8}).withMessage('Password must be at least 8 characters long.'),
    check('image').isBase64().withMessage('Invalid Image')
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array()});
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = await crypto.createHash('md5').update(req.body.password).digest('hex');
    const permissions = req.body.permissions;
    const image = req.body.image;

    try{
        let addAdmin = new Admin({
            firstName:firstName,
            lastName: lastName,
            email: email,
            password: password,
            permissions: permissions,
            image: image
        });

        return res.send(addAdmin);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.put("/:adminId", async (req, res) => {
    try{
        let updateAdmin = await Admin.findById(req.params.adminId);

        if(!updateAdmin) {
            return res.status(404).send("Admin does not exist from the requested ID");
        }
        
        if(!req.body.password.isEmpty()) {
            updateAdmin.set({
                password: await crypto.createHash('md5').update(req.body.password).digest('hex'),
                permissions: body.req.permissions,
                image: body.req.image
            });
        } else {
            updateAdmin.set({
                permissions: body.req.permissions,
                image: body.req.image
            });
        }

        
        updateAdmin = await updateAdmin.save();

        res.status(200).send(updateAdmin);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete("/:adminId", async (req, res) => {
    try{
        let admin = await Admin.findOneAndDelete({ _id: req.params.adminId});

        if(!admin) {
            return res.status(404).send("Admin does not exist from the requested ID");
        }

        res.send(admin);
    } catch(ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;