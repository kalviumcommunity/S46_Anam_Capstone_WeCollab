import mongoose from "mongoose"

const ideaSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
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
    },
    skills: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
},{timestamps: true})

const ideaModel = mongoose.model("ideas", ideaSchema)

export default ideaModel
