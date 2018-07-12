import Services from './model';
import User from '../users/model';

export const registerService = async(req, res) => {
    const { userId } = req.params;
    console.log(req.body);
    const services = new Services(req.body);
    try {
        // find user
        const user = await User.findById(userId);
        // add user details to service
        services.user = user;
        // save service
        await services.save();

        // add services details to user
        user.services.push(services);
        //save user
        await user.save();
        return res.status(201).json({
            success : true,
            service : req.body
        })
    }
    catch (e) {
        console.log(e)
        return res.status(401).json({ error: true, errorMessage: 'Error saving service' });
    }
}

export const findService = async(req, res) => {
    const { name } = req.params;
    try {
        await Services.find({ name })
            .populate('user', 'email fullName')
            .exec(function (err, result) {
                if (!result) {
                    return res.status(204).json({ error: true, errorMessage: 'No service found' });
                }
                return res.status(201).json({
                    success : true,
                    service : result
                }); 
            })
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({ error: true, errorMessage: 'Error finding services' });
    }
    
}

// export const findUserService = async(req, res) => {
//     const { userId } = req.params;
//     console.log(userId);
//     try {
//         await User.findById(userId)
//             .populate('services')
//             .exec(function(err, result) {
//                 console.log(result);
//                 return res.status(204).json({ error: true, errorMessage: 'No service found' });
//             })
//     }
//     catch (e) {
//         console.log(e);
//     }
// }
