const User = require("../models/User")
const jwt = require("jsonwebtoken")
const Cookies = require("universal-cookie")

module.exports = async (req, res, next) => {
    try {
        let success = false
        const token = new Cookies(req.headers.cookie).get("token")

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

        if(!success) {
            res.status(401).send({ message: "Please login" })
        }
    }

    catch(err) {
        next(err)
    }
}