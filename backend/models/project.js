import mongoose from "mongoose"

const seekingSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    vacancy: {
        type: Number,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    responsibility: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    }
})

const projectSchema = new mongoose.Schema({
    default: {
        carousel: [],
    },
    userId: {
        type: String,
        required: true
    },
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
        type: [String]
    },
    presentation: {
        type: String
    },
    collaborators: {
        type: Number,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    timeline: {
        type: String,
        required: true
    },
    seeking: {
        type:[seekingSchema],
        required: true
    }
},{timestamps: true})

const projectModel = mongoose.model("projects", projectSchema)

export default projectModel