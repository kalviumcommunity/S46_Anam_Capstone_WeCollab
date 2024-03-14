const mongoose = require("mongoose")

const ideaSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const ideaModel = mongoose.model("ideas", ideaSchema)

module.exports = ideaModel