import mongoose from "mongoose"

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
    provider: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function(){
            return this.provider !== "google"
        }
    },
    token: {
        type: String,
        required: true
    },
    completedSection: {
        type: Array,
        default: []
    },
    details: {
        type: Object,
        default: {
            currentPosition: "",
            about: "",
            status: "",
            experience: [],
            skills: [],
            projects: []
        },
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
},{ timestamps: true})

const userModel = mongoose.model("users", userSchema)

export default userModel