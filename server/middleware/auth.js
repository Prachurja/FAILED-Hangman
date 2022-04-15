const User = require("../models/User")
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        let success = false

        if(req.headers.authorization) {
            const userId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)._id
            
            if(await User.findById(userId)) {
                success = true
                req.userId = userId
                next()
            }
        }

        if(!success) {
            res.sendStatus(401)
        }
    }

    catch(err) {
        res.sendStatus(401)
        next(err)
    }
}