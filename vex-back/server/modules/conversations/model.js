import mongoose, { Schema } from 'mongoose';

const Conversation = new Schema({
    participants : [{
        type : Schema.Types.ObjectId, ref : 'Users'
    }],
});

export default mongoose.model('Conversation', Conversation);
