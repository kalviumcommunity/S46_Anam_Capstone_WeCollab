import userModel from "../models/user.js"
import showcaseModel from "../models/showcase.js"
import projectModel from "../models/project.js"
import ideaModel from "../models/idea.js"

export const resolvers = {
    Query: {
        async ideas() {
            return await ideaModel.find()
        },
        async users() {
            return await userModel.find()
        },
        async projects() {
            return await projectModel.find()
        },
        async showcases() {
            return await showcaseModel.find()
        },
        async idea(_,args) {
            return await ideaModel.findById(args.id)
        },
        async project(_,args) {
            return await projectModel.findById(args.id)
        },
        async showcase(_,args) {
            return await showcaseModel.findById(args.id)
        }
    },
    Mutation: {
        async deleteProject(_,args){
            const wasDeleted = (await projectModel.deleteOne({_id: args.id})).deletedCount
            return wasDeleted
        },
        async deleteShowcase(_,args){
            const wasDeleted = (await showcaseModel.deleteOne({_id: args.id})).deletedCount
            return wasDeleted
        },
        async createUser(_,args){
            const newUser = new userModel(args.user)
            const res = await newUser.save()
            return {id:res.id,...res._doc}
        },
        async createIdea(_,args){
            const newIdea = new ideaModel(args.idea)
            const res = await newIdea.save()
            return{id:res.id,...res._doc}
        },
        async createProject(_,args){
            const newProject = new projectModel(args.project)
            const res = await newIdea.save()
            return{id:res.id,...res._doc}
        },
        async updateUser(_,{id,userData}){
            const res = userModel.findByIdAndUpdate(id,userData,{new: true})
            return res
        },
        async updateProject(_,{id,projectData}){
            const res = projectModel.findByIdAndUpdate(id,projectData,{new: true})
            return res
        },
        async updateShowcase(_,{id,showcaseData}){
            const res = showcaseModel.findByIdAndUpdate(id,showcaseData,{new: true})
            return res
        }
    }
}