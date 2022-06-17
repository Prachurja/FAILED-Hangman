const User = require("../models/User")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

router.post("/getEmailResetToken", async (req, res, next) => {
    try {
        if(req.body.currentEmail) {
            const user = await User.findOne({ email: req.body.currentEmail })
        
            if(user) {
                if(!user.expireAt) {
                    if(!user.emailResetIAT || new Date(user.emailResetIAT + 5*60*60*1000) <= Date.now()) {
                        sendEmail({
                            to: user.email,
                            subject: "Hangman Email Reset",
                            text: user.generateJWT(process.env.JWT_SECRET + "resetemail", { expiresIn: "10m" })
                        })
            
                        res.status(200).send({ message: `Email reset link sent successfully to ${user.email}` })
                    }
    
                    else res.status(400).send({ message: "You can change your email only once every five hours" })
                }
    
                else res.status(401).send({ message: "Please check your inbox and verify your account" })
            }

            else res.status(404).send({ message: "User not found" })
        }

        else res.status(400).send({ message: { currentEmail: "Please provide your current email" }})
    }

    catch(err) {
        next(err)
    }
})

router.post("/resetEmail/:emailResetToken", async (req, res, next) => {
    try {
        const {_id} = jwt.verify(req.params.emailResetToken, process.env.JWT_SECRET + "resetemail")
        const user = await User.findById(_id)

        if(req.body.newEmail) {
            sendEmail({
                to: req.body.newEmail,
                subject: "Hangman Email Reset",
                text: user.generateJWT(process.env.JWT_SECRET + "verifyresetemail", { expiresIn: "10m" }, { newEmail: req.body.newEmail })
            })
            res.status(200).send({ message: `Verification email sent to ${req.body.newEmail}` })
        }

        else {
            res.status(400).send({ message: { newEmail: "Please provide the new email" }})
        }
    }

    catch(err) {
        next(err)
    }
})

router.post("/verifyNewEmail/:verifyNewEmailToken", async (req, res, next) => {
    try {
        const { _id, newEmail } = jwt.verify(req.params.verifyNewEmailToken, process.env.JWT_SECRET + "verifyresetemail")
        const user = await User.findById(_id)

        user.email = newEmail
        user.emailResetIAT = Date.now()
        user.save()
        res.status(200).send({ message: "Email reset successfully" })
    }

    catch(err) {
        next(err)
    }
})

router.post("/getPasswordResetToken", async (req, res, next) => {
    try {
        if(req.body.currentEmail) {
            const user = await User.findOne({ email: req.body.currentEmail })

            if(user) {
                if(!user.expireAt) {
                    if(!user.passwordResetIAT || new Date(user.passwordResetIAT + 5*60*60*1000) <= Date.now()) {
                        sendEmail({
                            to: user.email,
                            subject: "Hangman Password Reset",
                            text: user.generateJWT(process.env.JWT_SECRET + "resetpassword", { expiresIn: "10m" })
                        })
            
                        res.status(200).send({ message: `Password reset link sent successfully to ${user.email}` })
                    }
    
                    else res.status(400).send({ message: "You can change your password only once every five hours" })
                }
    
                else res.status(401).send({ message: "Please check your inbox and verify your account" })
            }

            else res.status(404).send({ message: "User not found" })
        }

        else res.status(400).send({ message: { currentEmail: "Please provide your current email" }})
    }

    catch(err) {
        next(err)
    }
})

router.post("/resetPassword/:passwordResetToken", async (req, res, next) => {
    try {
        const {_id} = jwt.verify(req.params.passwordResetToken, process.env.JWT_SECRET + "resetpassword")
        const user = await User.findById(_id)

        if(req.body.newPassword) {
            user.password = req.body.newPassword
            user.passwordResetIAT = Date.now()
            await user.save()
            res.status(200).send({ message: "Password reset successfully" })
        }

        else res.status(400).send({ message: { newPassword: "Please provide the new password" }})
    }

    catch(err) {
        next(err)
    }
})

module.exports = router