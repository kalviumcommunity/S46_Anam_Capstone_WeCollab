import mongoose from "mongoose"

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
},{timestamps: true})

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
        type: [String]
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

export default projectModel