const mongoose = require("mongoose")

const experienceSchema = new mongoose.Schema({
    role: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    }
  });

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
        currentPosition: {
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
            type: [experienceSchema]
        },
        skills: {
            type: [String],
            required: true
        },
        projects: {
            type: [String]
        }
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel