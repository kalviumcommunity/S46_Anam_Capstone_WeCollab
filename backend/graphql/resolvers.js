import dotenv from "dotenv"
dotenv.config()
import userModel from "../models/user.js"
import showcaseModel from "../models/showcase.js"
import projectModel from "../models/project.js"
import ideaModel from "../models/idea.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { GraphQLError } from 'graphql';

function generateAccessToken(payload){
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn: "1h"})
    return token
}

function authenticateToken(token){
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user) => {
        if(err) return err
    })
}

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
        async createUser(_, { userInput: {name,email,password} }) {
            try {
              const userExists = await userModel.findOne({ email });
              if (userExists) {
                throw new GraphQLError(`A user already exists with email ${email}`, {
                  extensions: { code: 'USER_ALREADY_EXISTS' },
                });
              }
          
              const encryptedPassword = await bcrypt.hash(password, 10);
              const newUser = new userModel({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
              });
              const token = generateAccessToken({user_id: newUser._id, email: newUser.email})
              const res = await newUser.save();
              return { id: res.id, ...res._doc,token};
            } catch (err) {
              return err;
            }
          },
        async loginUser(_,{loginData: {email,password}}){
            try{
                const userExists = await userModel.findOne({email})
                console.log(userExists._doc)
                if(userExists){
                    const passwordMatch = await bcrypt.compare(password,userExists.password)
                    if(!passwordMatch){
                        throw new GraphQLError(("Incorrect password"),{
                            extensions: {code: "INCORRECT_PASSWORD"}
                        })
                    }
                    const token = generateAccessToken({user_id: userExists._id, email: userExists.email})
                    return {...userExists._doc,token}
                }
                throw new GraphQLError(("User does not exist, please sign up"),{
                    extensions: {code: 'USER_DOES_NOT_EXIST'}
                })   
            }catch(err) {
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