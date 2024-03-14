const mongoose = require("mongoose")

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

const projectModel = mongoose.model("projects", projectSchema)

module.exports = projectModel