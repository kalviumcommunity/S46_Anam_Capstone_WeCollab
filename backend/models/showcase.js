import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

const showcaseSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    collaborators: {
        type: [String],
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
    feedback: {
        type: [feedbackSchema],
        default: []
    },
    category: {
        type: String,
        required: true
    },
    showcaseLink: {
        type: String,
        required: true
    }
},{timestamps: true})

const showcaseModel = mongoose.model("showcases", showcaseSchema)

export default showcaseModel
