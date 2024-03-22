import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "@apollo/server"
import {expressMiddleware} from "@apollo/server/express4"
import mongoose from "mongoose"
import express from "express"
import { typeDefs } from "./graphql/typeDefs.js"
import { resolvers } from "./graphql/resolvers.js"
import CORS from "cors"
import jwt from "jsonwebtoken"
const app = express()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err) {
        console.error(err)
        process.exit(1)
    }
    console.log("connected")
}

connectDB()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const startServer = async () => {

    await server.start()
    app.use("/graphql",CORS({
        credentials: true
    }),express.json(),expressMiddleware(server,{
        context: async({res,req}) => {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token) {
                try {
                  const user = jwt.verify(token,process.env.ACCESS_TOKEN);
                  return { user };
                } catch (err) {
                  return err
                }
            }
            return {}
        }
    }))

}

startServer()

app.get("/",(req,res) => {
    res.send("Welcome to WeCollab")
})

app.listen(process.env.PORT,() => {
    console.log(`server running at ${process.env.PORT}`)
})