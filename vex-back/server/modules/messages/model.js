import mongoose, { Schema } from 'mongoose';

const Messages = new Schema({
    conversationId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    text : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    recipent : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, { timestamps : true });

export default mongoose.model('Messages', Messages);
