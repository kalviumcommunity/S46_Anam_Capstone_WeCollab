import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "@apollo/server"
import {expressMiddleware} from "@apollo/server/express4"
import mongoose from "mongoose"
import express from "express"
import { typeDefs } from "./graphql/typeDefs.js"
import { resolvers } from "./graphql/resolvers.js"
import CORS from "cors"
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
    app.use("/graphql",CORS(),express.json(),expressMiddleware(server))

}

startServer()

app.get("/",(req,res) => {
    res.send("Welcome to WeCollab")
})

app.listen(process.env.PORT,() => {
    console.log(`server running at ${process.env.PORT}`)
})