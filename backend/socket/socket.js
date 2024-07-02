import { Server } from "socket.io";
import dotenv from "dotenv"
dotenv.config()
import http from "http";
import express from "express";

const socketApp = express();
const socketServer = http.createServer(socketApp);
const io = new Server(socketServer, {
	cors: {
		origin: [process.env.FRONTEND_ORIGIN],
		methods: ["GET", "POST"],
	},
});

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}
const unreadMessageMap = {}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
	const userId = socket.handshake.query.userId;
	if (userId != undefined) userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));
	if(unreadMessageMap[userId]){
		io.emit("sendUnreadMessages",unreadMessageMap[userId])
		delete unreadMessageMap[userId]
	}


	socket.on("unreadMessage",(message) => {
		if(unreadMessageMap[message.receiverId]){
			unreadMessageMap[message.receiverId].push(message)
		}else{
			unreadMessageMap[message.receiverId] = []
			unreadMessageMap[message.receiverId].push(message)
		}
	})

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { socketApp, getReceiverSocketId, io, socketServer };