import userModel from "../models/user.js"
import showcaseModel from "../models/showcase.js"
import projectModel from "../models/project.js"
import ideaModel from "../models/idea.js"

export const resolvers = {
    Query: {
        async ideas() {
            try{
                return await ideaModel.find()
            }catch(err){
                return err
            }
        },
        async users() {
            try{
                return await userModel.find()
            }catch(err){
                return err
            }
        },
        async projects() {
            try{
                return await projectModel.find()
            }catch(err){
                return err
            }
        },
        async showcases() {
            try{
                return await showcaseModel.find()
            }catch(err){
                return err
            }
        },
        async idea(_,args) {
            try{
                return await ideaModel.findById(args.id)
            }catch(err){
                return err
            }
        },
        async project(_,args) {
            try{
                return await projectModel.findById(args.id)
            }catch(err){
                return err
            }
        },
        async showcase(_,args) {
            try{
                return await showcaseModel.findById(args.id)
            }catch(err){
                return err
            }
        }
    },
    Mutation: {
        async deleteProject(_,args){
            try{
                const wasDeleted = (await projectModel.deleteOne({_id: args.id})).deletedCount
                return wasDeleted
            }catch(err){
                return err
            }
        },
        async deleteShowcase(_,args){
            try{
                const wasDeleted = (await showcaseModel.deleteOne({_id: args.id})).deletedCount
                return wasDeleted
            }catch(err){
                return err
            }
        },
        async createUser(_,args){
            try{
                const newUser = new userModel(args.user)
                const res = await newUser.save()
                return {id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async createIdea(_,args){
            try{
                const newIdea = new ideaModel(args.idea)
                const res = await newIdea.save()
                return{id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async createProject(_,args){
            try{
                const newProject = new projectModel(args.project)
                const res = await newProject.save()
                return{id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async updateUser(_,{id,userData}){
            try{
                const res = userModel.findByIdAndUpdate(id,userData,{new: true})
                return res
            }catch(err){
                return err
            }
        },
        async updateProject(_,{id,projectData}){
            try{
                const res = projectModel.findByIdAndUpdate(id,projectData,{new: true})
                return res
            }catch(err){
                return err
            }
        },
        async updateShowcase(_,{id,showcaseData}){
            try{
                const res = showcaseModel.findByIdAndUpdate(id,showcaseData,{new: true})
                return res
            }catch(err){
                return err
            }
        }
    }
}