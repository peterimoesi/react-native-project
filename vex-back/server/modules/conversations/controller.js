import Conversation from './model';
import Message from '../messages/model';
import User from '../users/model';

export const newConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({
            participants : [ req.body.userId, req.body.recipentId ]
        }, (err, newConversation) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: true, errorMessage: 'Error starting new conversation' })
            }
            return newConversation;
        });
        const message = await Message.create({
            conversationId : conversation._id,
            text : req.body.text,
            user : req.body.userId,
            recipent : req.body.recipentId
        }, (err, newMessage) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: true, errorMessage: 'Error starting new conversation' })
            }
            res.status(200).json({ message : 'New Conversation', conversationId : conversation._id })
        })
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ error: true, errorMessage: 'Error starting new conversation' })
    }
}

export const getConversation = async (req, res) => {
    try {
        await Message.find({ conversationId : req.params.id })
            .select('createdAt text user')
            .sort('-createdAt')
            .populate('user', 'fullName email _id')
            .exec((err, message) => {
                if (err) {
                    return res.status(400).json({ error: true, errorMessage: 'no messages found' })
                }
                return res.status(200).json({ message : 'New Conversation', message })
            })
    }
    catch(e) {
        console.log(e);
        return res.status(400).json({ error: true, errorMessage : 'no messages found' })
    }
}

export const getAllConversations = async (req, res) => {
    const { userId } = req.params;
    const allConversationArray = [];
    const conversParticipants = [];
    try {
        await Conversation.find({ participants : userId })
            .select('_id participants')
                .exec((err, allConversation) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ message : 'Error getting al conversations' })
                    }
                    allConversation.forEach(async convers => {
                        await Message.find({ conversationId : convers._id })
                            .sort('-updatedAt')
                            .select('_id conversationId updatedAt text user recipent')
                            .limit(1)
                            .populate('user', 'fullName email')
                            .populate('recipent', 'fullName email')
                            .exec((err, message) =>{
                                if (err) {
                                    console.log(err);
                                    return res.status(400).json({ message : 'Error getting message' })
                                }
                                allConversationArray.push(message[0]);
                                
                                if (allConversationArray.length === allConversation.length) {
                                return res.status(200).json({ conversations : allConversationArray,/*  participants : conversParticipants */ })
                                }
                            })
                    })
                })
    }
    catch(e) {
        console.log(e);
        return res.status(400).json({ message : 'Error getting al conversations' });
    }
}

export const getConversationId = async (req, res) => {
    const { userId, recipentId } = req.params;
    try {
        await Conversation.find({})
            .exec((err, allConversations) => {
                for(let i = allConversations.length - 1; i >= 0; i--) {
                    const parts = allConversations[i].participants;
                    if (parts.indexOf(userId) > -1 && parts.indexOf(recipentId) > -1) {
                        return res.status(200).json({ conversationId : allConversations[i]._id })
                    }
                }
            })
    }
    catch(e) {
        console.log(e);
        return res.status(400).json({ error: true, errorMessage : 'id required' })
    }
}

export const saveConversationMessage = async (req, res) => {
    try {
        await Message.create({
            conversationId : req.body.conversationId,
            text : req.body.text,
            user : req.body.userId,
            recipent : req.body.recipentId
        }, (err, success) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: true, errorMessage : 'Error saving message' })
            }
            return res.status(200).json({ messages : 'message saved successfully' })
        })
    }
    catch(e) {
        console.log(e);
        return res.status(400).json({ error: true, errorMessage : 'Error saving message' })
    }
}