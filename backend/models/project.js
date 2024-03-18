const mongoose = require("mongoose")

const seekingSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    vacancy: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    responsibilities: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    }
})

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    carousel: {
        type: Array
    },
    presentation: {
        type: String
    },
    seeking: {
        type:[seekingSchema],
        required: true
    }
})

const projectModel = mongoose.model("projects", projectSchema)

module.exports = projectModel