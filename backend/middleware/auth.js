const { JWT } = require('../utils/constants');
const Users = require('../models/Users')
const JwtSecrate = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth')
        const decode = await JWT.verify(token, JwtSecrate);
        // next()
        //check user exist or not validation
        if (decode && decode.userId) {
            const findUser = await Users.findOne({ _id: decode.userId, token: token });
            if (!findUser) {
                res.status(400).send({ "error": "User not found." })
            }
            next();
        } else {
            res.status(401).send({ "error": "Please provide valid authentication." })
        }
    } catch (e) {
        console.log(e);
        res.status(401).send({ "error": "Please provide valid authentication." })
    }
}

module.exports = { auth }