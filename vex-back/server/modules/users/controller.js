import User from './model';
import { createToken } from './utils/createToken';
import bcrypt from 'bcrypt';

export const userRegister = async (req, res) => {
    const { email, password, fullName } = req.body;
    if (password.length < 6) {
        return res.status(400).json({ error: true, errorMessage: 'Password should be more than 6' })
    }
    try {
        const user = await User.create({ email, password, fullName });
        return res.status(200).json({
            success : true,
            user    : {
                id    : user._id,
                email : user.email,
                fullName : user.fullName,
                description : user.description,
                phoneNumber : user.phoneNumber,
                rating : user.rating,
                services : user.services,
                locations : user.locations
            },
            token : `bearer ${createToken(user)}`
        })
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: true, errorMessage: 'Unauthorised' })
    }
}

export const userLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        User.findOne({ email: email })
            .exec(function (err, user) {
                if (!user) {
                    return res.status(401).json({ error: true, errorMessage: 'No user found' })
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {
                        return res.status(200).json({
                            success : true,
                            user    : {
                                id    : user._id,
                                email : user.email,
                                fullName : user.fullName,
                                description : user.description,
                                phoneNumber : user.phoneNumber,
                                rating : user.rating,
                                services : user.services,
                                locations : user.locations
                            },
                            token : `bearer ${createToken(user)}`
                        })
                    } else {
                        console.log(password, user.password);
                        return res.status(401).json({ error: true, errorMessage: 'Unauthorised' })
                    }
                })
            });
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: true, errorMessage: 'Unauthorised' })
    }
}

export const userUpdate = async (req, res) => {
    const { userId } = req.params;
    const {...args} = req.body;
    try {
        await User.findById(userId, function(err, result) {
            console.log(args);
            for (let key in args) {
                if (args.hasOwnProperty(key)) {
                    result[key] = args[key];
                }
            }
            result.save(function (err, updatedUser) {
                if (err) { return res.status(401).json({ error: true, errorMessage: 'Cannot update user' }) }
                return res.status(200).json({
                    success : true,
                    user    : {
                        id    : updatedUser._id,
                        email : updatedUser.email,
                        fullName : updatedUser.fullName,
                        description : updatedUser.description,
                        phoneNumber : updatedUser.phoneNumber,
                        rating : updatedUser.rating,
                        services : updatedUser.services,
                        locations : updatedUser.locations
                    }
                })
            })
        })
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({ error: true, errorMessage: 'Unauthorised' })
    }
}
