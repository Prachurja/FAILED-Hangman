const User = require("../models/User")
const jwt = require("jsonwebtoken")

module.exports = (throw401=true) => async (req, res, next) => {
    try {
        let success = false
        const token = req?.cookies?.token

        if(token) {
            let {_id, iat} = jwt.verify(token, process.env.JWT_SECRET + "login")
            const user = await User.findById(_id)

            iat = iat*1000

            if(user && (!user.passwordResetIAT || (user.passwordResetIAT && iat > user.passwordResetIAT)) && (!user.emailResetIAT || (user.emailResetIAT && iat > user.emailResetIAT))) {
                success = true
                req.user = user
                next()
            }
        }

        if(!success && throw401) {
            res.status(401).send({ message: "Please login" })
        }

        else {
            next()
        }
    }

    catch(err) {
        next(err)
    }
}