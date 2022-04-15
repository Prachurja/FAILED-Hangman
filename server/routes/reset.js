const User = require("../models/User")
const router = require("express").Router()
const authMiddleware = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

router.post("/resetEmail", authMiddleware, async (req, res, next) => {
    try {
        const errorMessage = {}
        
        if(!req.body.newEmail) errorMessage.newEmail = "Please provide the new email"
        if(!req.body.password) errorMessage.password = "Please provide password"
        
        if(req.body.password && req.body.newEmail) {
            const user = await User.findById(req.userId)

            if(user.matchPassword(req.body.password)) {
                user.email = req.body.newEmail
                await user.save()
                res.sendStatus(200)
            }

            else {
                res.status(400).send({ message: { password: "Invalid password" }})
            }
        }

        else {
            res.status(400).send({ message: errorMessage })
        }
    }

    catch(err) {
        console.log("resetEmail route")
        next(err)
    }
})

router.post("/generatePasswordResetToken", authMiddleware, async (req, res, next) => {
    try {
        const passwordResetCode = `${Math.round(Math.random()*9999)}`.padStart(4, "0")
        await User.updateOne({ _id: req.userId }, { passwordResetToken: bcrypt.hashSync(passwordResetCode, 10) })
        res.send({ passwordResetToken: jwt.sign({ _id: req.userId, token: passwordResetCode }, process.env.JWT_SECRET) })
    }

    catch(err) {
        next(err)
    }
})

router.post("/resetPassword/:passwordResetToken", async (req, res, next) => {
    try {
        const {_id, token} = jwt.verify(req.params.passwordResetToken, process.env.JWT_SECRET)
        const user = await User.findById(_id)

        if(user && user.passwordResetToken && bcrypt.compareSync(token, user.passwordResetToken)) {
            if(req.body.newPassword) {
                user.password = req.body.newPassword
                user.passwordResetToken = undefined
                await user.save()
                res.sendStatus(200)
            }

            else {
                res.status(400).send({ message: { newPassword: "Please provide the new password" }})
            }
        }

        else {
            res.status(400).send({ message: { token: "Invalid token"}})
        }
    }

    catch(err) {
        next(err)
    }
})

module.exports = router