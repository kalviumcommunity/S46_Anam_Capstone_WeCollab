import mongoose from "mongoose"

const showcaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    link: {
        type: String
    }
},{timestamps: true})

const showcaseModel = mongoose.model("showcase", showcaseSchema)

export default showcaseModel
