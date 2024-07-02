import express from "express"
import conversationModel from "../models/conversation.js";
import messageModel from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const messageRouter = express.Router()

messageRouter.get("/:id",async (req,res) => {
	
    try {
		const { id: userToChatId } = req.params;
		const senderId = req.query.id;
		const conversation = await conversationModel.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); 

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.error("Error: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}

})

messageRouter.post("/send/:id",async (req,res) => {
    try {
		const { message, senderId } = req.body;
		const receiverId  = req.params.id;

		let conversation = await conversationModel.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await conversationModel.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new messageModel({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await conversation.save();
		await newMessage.save();

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.error("Error: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}

})

export default messageRouter