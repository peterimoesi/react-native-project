import mongoose, { Schema } from 'mongoose';

const ServicesSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    customName : {
        type : String
    },
    description : {
        type : String,
        required : true
    },
    timeAvailable : {
        type : String,
        required : true
    },
    from : {
        type : Number
    },
    to : {
        type : Number
    },
    price : {
        type : Number,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    locations : [{
        type : String
    }]
}, { timestamps : true });

export default mongoose.model('Service', ServicesSchema);
