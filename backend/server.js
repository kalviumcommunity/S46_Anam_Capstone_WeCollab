import dotenv from "dotenv"
dotenv.config()
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import mongoose from "mongoose"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { typeDefs } from "./graphql/typeDefs.js"
import { resolvers } from "./graphql/resolvers.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import authRouter from "./routes/googleAuth.js"
import userModel from "./models/user.js"
import messageRouter from "./routes/messageRoute.js"

const app = express()
const httpServer = createServer(app)

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.FRONTEND_ORIGIN],
    methods: ["GET", "POST"],
  },
})

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions), express.json())

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  }
}
connectDB()

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// JWT functions
function generateToken(payload) {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1h" })
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "30d" })
  return { accessToken, refreshToken }
}

const shouldRefreshAccessToken = async (email) => {
  try {
    const User = await userModel.findOne({ email: email })
    jwt.verify(User.token, process.env.REFRESH_TOKEN)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const startServer = async () => {
  await server.start()
  app.use("/graphql", expressMiddleware(server, 
    {
    context: async ({ res, req }) => {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (token !== "undefined") {
        try {
          const user = jwt.verify(token, process.env.ACCESS_TOKEN)
          return { user }
        } catch (err) {
          if (err.name === 'TokenExpiredError') {
            const userInfo = jwt.decode(token, process.env.ACCESS_TOKEN)
            const needsRefresh = await shouldRefreshAccessToken(userInfo.email)
            if (needsRefresh) {
              const { accessToken, refreshToken } = generateToken({ email: userInfo.email })
              const User = await userModel.findOneAndUpdate({ email: userInfo.email }, { $set: { token: refreshToken } }, { new: true })
              if (User) {
                return { user: User, token: accessToken }
              } else {
                return { isAuthError: true, errorMessage: "Error in refreshing token" }
              }
            } else {
              return { isAuthError: true, errorMessage: "You don't have access, please login again" }
            }
          } else if (err.name === 'JsonWebTokenError') {
            return { isAuthError: true, errorMessage: "Invalid or tampered token" }
          } else {
            return { isAuthError: true, errorMessage: "JWT verification error" }
          }
        }
      }
      return { isAuthError: true, errorMessage: "Please sign in" }
    }
  }
  ))
}
startServer()

// Routes
app.use(authRouter)
app.use("/api", messageRouter)

app.get("/", (req, res) => {
  res.send("Welcome to WeCollab")
})

// Socket.IO logic
const userSocketMap = {} 
const unreadMessageMap = {}

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id)
  const userId = socket.handshake.query.userId
  if (userId != undefined) userSocketMap[userId] = socket.id

  io.emit("getOnlineUsers", Object.keys(userSocketMap))
  if (unreadMessageMap[userId]) {
    io.emit("sendUnreadMessages", unreadMessageMap[userId])
    delete unreadMessageMap[userId]
  }

  socket.on("unreadMessage", (message) => {
    if (unreadMessageMap[message.receiverId]) {
      unreadMessageMap[message.receiverId].push(message)
    } else {
      unreadMessageMap[message.receiverId] = [message]
    }
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id)
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

export { getReceiverSocketId, io }