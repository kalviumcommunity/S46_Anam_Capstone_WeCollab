import dotenv from "dotenv"
dotenv.config()
import userModel from "../models/user.js"
import showcaseModel from "../models/showcase.js"
import projectModel from "../models/project.js"
import ideaModel from "../models/idea.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { GraphQLError } from 'graphql';

function generateToken(payload){
    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn: "1h"})
    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn: "30d"})
    return {accessToken, refreshToken}
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
        async user(_,{email}){
            try{
                return await userModel.findOne({ email })
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
        async deleteProject(_,args,contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'ERROR_UPDATING_TOKENS' },
                  });
            }
            try{
                const wasDeleted = (await projectModel.deleteOne({_id: args.id})).deletedCount
                return wasDeleted
            }catch(err){
                return err
            }
        },
        async deleteShowcase(_,args,contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'ERROR_UPDATING_TOKENS' },
                  });
            }
            try{
                const wasDeleted = (await showcaseModel.deleteOne({_id: args.id})).deletedCount
                return wasDeleted
            }catch(err){
                return err
            }
        },
        async userSignup(_, { userInput: {name,email,password}}){
            try {
                const userExists = await userModel.findOne({ email });
                if (userExists) {
                throw new GraphQLError(`A user already exists with email ${email}`, {
                    extensions: { code: 'USER_ALREADY_EXISTS' },
                });
              }
                const encryptedPassword = await bcrypt.hash(password, 10)
                const newUser = new userModel({
                name: name,
                email: email.toLowerCase(),
                provider: "email",
                password: encryptedPassword
                })
                const {accessToken, refreshToken} = generateToken({user_id: newUser._id, email: newUser.email})
                newUser.token = refreshToken
                const res = await newUser.save()
                return { id: res._id,email: res.email,token: accessToken}
            } catch (err) {
              return err
            }
        },
        async userLogin(_,{loginData: {email,password}}){
            try{
                const userExists = await userModel.findOne({email})
                if(userExists){
                    if(userExists.provider === "google"){
                        throw new GraphQLError(("Please sign in using google"),{
                            extensions: {code: 'INVALID_SIGNIN_METHOD'}
                        })   
                    }
                    const passwordMatch = await bcrypt.compare(password,userExists.password)
                    if(!passwordMatch){
                        throw new GraphQLError(("Incorrect password"),{
                            extensions: {code: "INCORRECT_PASSWORD"}
                        })
                    }
                    const {accessToken, refreshToken} = generateToken({user_id: userExists._id, email: userExists.email})
                    userExists.token = refreshToken
                    return {id:userExists._id,email:userExists.email,token: accessToken}
                }
                throw new GraphQLError(("User does not exist, please sign up"),{
                    extensions: {code: 'USER_DOES_NOT_EXIST'}
                })   
            }catch(err) {
                return err
            }
        },
        async createIdea(_,args,contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'ERROR_UPDATING_TOKENS' },
                  });
            }
            try{
                const newIdea = new ideaModel(args.idea)
                const res = await newIdea.save()
                return{id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async createProject(_,args,contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'ERROR_UPDATING_TOKENS' },
                  });
            }
            try{
                const newProject = new projectModel(args.project)
                const res = await newProject.save()
                return{id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async updateUser(_,{id,property,userData},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'ERROR_UPDATING_TOKENS' },
                  })
            }
            try{
                let updateObject = {};
                const {about,status,currentPosition} = userData.details
                if(property === "details.experience") {
                    updateObject = { $push: { "details.experience": userData.details.experience } };
                } else if(property === "details.skills") {
                    updateObject = { $push: { "details.skills": userData.details.skills } };
                } else if(property === "details.projects"){
                    updateObject = { $push: { "details.projects": userData.details.projects } }
                }else {
                    updateObject = { [property]: about || status || currentPosition }
                }
                const updatedUser = await userModel.findByIdAndUpdate(
                    id,
                    updateObject,
                    { new: true }
                  )
                return updatedUser
            }catch(err){
                return err
            }
        },
        async updateProject(_,{id,projectData},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'ERROR_UPDATING_TOKENS' },
                  });
            }
            try{
                const res = projectModel.findByIdAndUpdate(id,projectData,{new: true})
                return res
            }catch(err){
                return err
            }
        },
        async updateShowcase(_,{id,showcaseData},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'ERROR_UPDATING_TOKENS' },
                  });
            }
            try{
                const res = showcaseModel.findByIdAndUpdate(id,showcaseData,{new: true})
                return res
            }catch(err){
                return err
            }
        }
    }
}