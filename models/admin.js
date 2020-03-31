const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: String,
        enum: [
            "View",
            "View / Add",
            "View / Add / Edit",
            "View / Add / Edit / Delete"
        ]
    },
    image: {
        type: String
    }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;