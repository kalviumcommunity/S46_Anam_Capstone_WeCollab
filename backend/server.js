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
import router from "./googleAuth.js"
import userModel from "./models/user.js"
const app = express()

const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(CORS(corsOptions),express.json())

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

function generateToken(payload){
    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn: "1h"})
    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn: "30d"})
    return {accessToken, refreshToken}
}

const startServer = async () => {

    await server.start()
    app.use("/graphql", expressMiddleware(server, {
        context: async ({ res, req }) => {
          const authHeader = req.headers['authorization'];
          const token = authHeader && authHeader.split(' ')[1];
      
          if (token) {
            try {
              const user = jwt.verify(token, process.env.ACCESS_TOKEN);
              return { user };
            } catch (err) {
                
                if (err.name === 'TokenExpiredError') {
                    const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN);
                    const { accessToken, refreshToken } = generateToken({ user_id: userInfo.user_id, email: userInfo.email });
            
                    res.cookie("token", accessToken, { maxAge: 1000 * 60 * 60 * 24 });
            
                    const User = await userModel.findByIdAndUpdate(userInfo.user_id, { $set: { token: refreshToken } }, { new: true });
            
                    if (User) {
                        return User;
                    } else {
                        return { isAuthError: true, errorMessage: "Error in refreshing token" };
                    }
                } else if (err.name === 'JsonWebTokenError') {
                    return { isAuthError: true, errorMessage: "Invalid or tampered token" };
                } else {
                    return { isAuthError: true, errorMessage: "JWT verification error" };
                }
            }
          }
          return {};
        }
      }));

}

startServer()

app.use(router)

app.get("/",(req,res) => {
    res.send("Welcome to WeCollab")
})

app.listen(process.env.PORT,() => {
    console.log(`server running at ${process.env.PORT}`)
})