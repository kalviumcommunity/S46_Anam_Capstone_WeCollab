import dotenv from "dotenv"
dotenv.config()
import userModel from "../models/user.js"
import showcaseModel from "../models/showcase.js"
import projectModel from "../models/project.js"
import ideaModel from "../models/idea.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

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
                return await userModel.findOne({email})
            }catch(err){
                return err
            }
        },
        async projects() {
            try{
                const projects = await projectModel.find()
                return projects.map(project => ({
                    id: project._id,
                    ...project._doc,
                    createdAt: project.toObject().createdAt.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        year: 'numeric',
                        month: 'long'
                    })
                  }));
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
                const project = await projectModel.findById(args.id)
                return {
                    id: project._id,
                    ...project._doc,
                    createdAt: project.toObject().createdAt.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        year: 'numeric',
                        month: 'long'
                    })
                }
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
    Project: {
        async user (parent){
        try {
            const user = await userModel.findById(parent.userId);
            if (!user) {
                console.error(`User not found for userId: ${parent.userId}`);
                return null;
              }
      
            return user;
        } catch (err) {
            console.error('Error fetching user:', err);
            throw new Error('Failed to fetch user');
        }
        }
  },
  Idea: {
    async user (parent){
        try {
            const user = await userModel.findById(parent.userId);
            if (!user) {
                console.error(`User not found for userId: ${parent.userId}`);
                return null;
              }
      
            return user;
        } catch (err) {
            console.error('Error fetching user:', err);
            throw new Error('Failed to fetch user');
        }
        }
  },
    Mutation: {
        async deleteProject(_,args,contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  });
            }
            try{
                const wasDeleted = (await projectModel.deleteOne({_id: args.id})).deletedCount
                if(contextValue.token){
                    return {deleted: wasDeleted, token: contextValue.token}
                }
                return wasDeleted
            }catch(err){
                return err
            }
        },
        async deleteShowcase(_,args,contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  });
            }
            try{
                const wasDeleted = (await showcaseModel.deleteOne({_id: args.id})).deletedCount
                if(contextValue.token){
                    return {deleted: wasDeleted, token: contextValue.token}
                }
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
        async createIdea(_,{ideaInput},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  });
            }
            try{
                const newIdea = new ideaModel(ideaInput)
                const res = await newIdea.save()
                if(contextValue.token){
                    return {id:res.id,...res._doc, token: contextValue.token}
                }
                return{id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async createProject(_,{projectInput},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  });
            }
            try{
                const newProject = new projectModel(projectInput)
                const res = await newProject.save()
                if(contextValue.token){
                    return {id:res.id,...res._doc, token: contextValue.token}
                }
                return{id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async createShowcase(_,{showcaseInput},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  });
            }
            try{
                const newShowcase = new showcaseModel(showcaseInput)
                const res = await newShowcase.save()
                if(contextValue.token){
                    return {id:res.id,...res._doc, token: contextValue.token}
                }
                return{id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async updateUser(_,{id,property,operation,matchItem,userData},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  })
            }
            try{
                let updateObject = {};
                if(property === "details.experience") {
                    if(operation === "add"){
                        updateObject = { $push: { "details.experience": userData.details.experience } };
                    }else if(operation === "delete"){
                        updateObject = { $pull: {"details.experience" : matchItem.experience} }
                    }
                } else if(property === "details.skills") {
                    if(operation === "add"){
                        updateObject = { $push: { "details.skills": userData.details.skills } };
                    }else if(operation === "delete"){
                        updateObject = { $pull: { "details.skills": matchItem.skill } }
                    }
                } else if(property === "details.projects"){
                    if(operation === "add"){
                        updateObject = { $push: { "details.projects": userData.details.projects } }
                    }else if(operation === "delete"){
                        updateObject = { $pull: { "details.projects": matchItem.project } }
                    }
                } else if(property === "completedSection"){
                    updateObject = { $push: { "completedSection": userData.section } }
                } else if(property === "account") {
                    updateObject = { name: userData.name, email: userData.email }
                } else {
                    updateObject = { [property]: userData.details.about || userData.details.status || userData.details.currentPosition || userData.details.profileImage }
                }
                const res = await userModel.findByIdAndUpdate(
                    id,
                    updateObject,
                    { new: true }
                  )
                if(contextValue.token){
                    return {id:res.id,...res._doc, token: contextValue.token}
                }
                return {id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async updateProject(_,{id,projectData},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  });
            }
            try{
                const res = projectModel.findByIdAndUpdate(id,projectData,{new: true})
                if(contextValue.token){
                    return {id:res.id,...res._doc, token: contextValue.token}
                }
                return {id:res.id,...res._doc}
            }catch(err){
                return err
            }
        },
        async updateShowcase(_,{id,showcaseData},contextValue){
            if (contextValue.isAuthError){
                throw new GraphQLError(contextValue.errorMessage, {
                    extensions: { code: 'AUTHENTICATION_ERROR' },
                  });
            }
            try{
                const res = showcaseModel.findByIdAndUpdate(id,showcaseData,{new: true})
                if(contextValue.token){
                    return {id:res.id,...res._doc, token: contextValue.token}
                }
                return {id:res.id,...res._doc}
            }catch(err){
                return err
            }
        }
    },
    Showcase: {
        async user (parent){
            try {
                const user = await userModel.findById(parent.userId);
                if (!user) {
                    console.error(`User not found for userId: ${parent.userId}`);
                    return null;
                  }
                return user;
            } catch (err) {
                console.error('Error fetching user:', err);
                throw new Error('Failed to fetch user');
            }
            }
      },
      Feedback: {
        async user (parent){
            try {
                const user = await userModel.findById(parent.userId);
                if (!user) {
                    console.error(`User not found for userId: ${parent.userId}`);
                    return null;
                  }
                return user;
            } catch (err) {
                console.error('Error fetching user:', err);
                throw new Error('Failed to fetch user');
            }
            }
      },
}