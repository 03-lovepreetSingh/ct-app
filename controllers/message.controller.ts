import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";
import { getReceiverSocketId, io } from "../socket/socket";
import { Message } from "../models/message.model";
import db from "../utils/db";

// For chatting
export const sendMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const senderId = req.id as string;
        const receiverId = req.params.id as string;
        const { textMessage: message } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // Establish the conversation if not started yet.
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        // Implement socket.io for real-time data transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            success: true,
            newMessage
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const senderId = req.id as string;
        const receiverId = req.params.id as string;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');

        if (!conversation) return res.status(200).json({ success: true, messages: [] });

        return res.status(200).json({ success: true, messages: conversation.messages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};