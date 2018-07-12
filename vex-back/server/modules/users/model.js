import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    // _id : {
    //     type : 'String'
    // },
    email : {
        type     : 'String',
        unique: true,
        required: true,
        trim: true
    },
    fullName : {
        type     : 'String',
    },
    description : {
        type : 'String',
    },
    phoneNumber : {
        type : 'Number'
    },
    rating : {
        type : 'Number'
    },
    services : [{
        type : Schema.Types.ObjectId,
        ref : 'Service'
    }],
    locations : [{
        type : 'String'
    }],
    password : {
        type     : 'String',
        required : true
    }
}, { timestamps : true, usePushEach: true });

UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    } else {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    }
})

export default mongoose.model('User', UserSchema)
