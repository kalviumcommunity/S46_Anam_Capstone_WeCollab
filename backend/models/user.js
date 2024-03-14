const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    details: {
        type: Object,
        currentposition: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        experience: {
            type: Array
        },
        skills: {
            type: Array,
            required: true
        },
        projects: {
            type: Array
        }
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel