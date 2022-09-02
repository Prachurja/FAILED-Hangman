const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")
const path = require("path")
const fs = require("fs")
const auth = require("../middleware/auth")

router.post("/check", auth(false), (req, res, next) => {
    try {
        if(req.cookies.user) {
            const { _id: userID } = jwt.verify(req.cookies.token, process.env.JWT_SECRET + "login")
            res.status(200).send({ id: userID, avatar: req.user.avatar, username: req.user.username })
        }

        else {
            res.sendStatus(200)
        }
    }

    catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body

        let errorMessage = {}
        if(!email) errorMessage.email = "Please provide email"
        if(!password) errorMessage.password = "Please provide password"


        if(email && password) {
            const user = await User.findOne({ email })

            if(user && user.matchPassword(password)) {
                res.cookie("token", user.generateJWT(process.env.JWT_SECRET + "login"), {path: "/", httpOnly: true})
                res.status(200).send({ message: "Login successful", id: user._id, avatar: user.avatar, username: user.username })
            }

            else res.status(401).send({ message: {
                email: "Invalid email or password",
                password: "Invalid email or password"
            } })
        }

        else res.status(400).send({ message: errorMessage })
    }

    catch(err) {
        next(err)
    }
})

router.post("/thirdpartylogin", async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({email})

        if(user) {
            res.cookie("token", user.generateJWT(process.env.JWT_SECRET + "login"), {path: "/", httpOnly: true})
            res.status(200).send({ message: "Login successful", id: user._id, avatar: user.avatar, username: user.username })
        }

        else {
            res.sendStatus(400)
        }
    }

    catch(err) {
        next(err)
    }
})

router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        
        if(!await User.findOne({ email })) {
            let getNewDiscriminator = () => `${Math.round(Math.random() * 9999)}`.padStart(4, "0")
            let discriminator = getNewDiscriminator()
            let fulfilled = false

            if((await User.find({ username })).length < 30) {
                for(let i = 1; i <= 5 && !fulfilled; i++) {
                    if(!await User.findOne({ username, discriminator })) {
                        function getRandomAvatarURL() {
                            const defaultAvatarsCount = fs.readdirSync(path.join(__dirname, "../uploads/avatars/default")).length
                            const random = Math.floor(Math.random() * (defaultAvatarsCount - 1)) + 1
                            return `http://localhost:5000/uploads/avatars/default/${random}.jpg`
                        }

                        const newUser = await User.create({ username, discriminator, email, password, expireAt: new Date(Date.now() + 3*24*60*60*1000), avatar: getRandomAvatarURL() })
                        sendEmail({
                            to: newUser.email,
                            subject: "Hangman Email Verification",
                            text: `${process.env.NODE_ENV !== "production" ? "http://localhost:3000" : `${req.protocol}://${req.hostname}`}/auth/verifyemail/${newUser.generateJWT(process.env.JWT_SECRET + "verifyemail")}`
                        })
                        res.status(200).send({ message: "Please check your inbox for link to verify your account" })
                        fulfilled = true
                    }
    
                    else discriminator = getNewDiscriminator()
                }
            }

            if(!fulfilled) res.status(400).send({ message: { username: "Username too common" }})
        }

        else res.status(409).send({ message: { email: "Email already exists"}})
    }

    catch(err) {
        next(err)
    }
})

router.post("/thirdpartysignup", async (req, res, next) => {
    try {
        const { username, email } = req.body
        
        if(!await User.findOne({ email })) {
            let getNewDiscriminator = () => `${Math.round(Math.random() * 9999)}`.padStart(4, "0")
            let discriminator = getNewDiscriminator()
            let fulfilled = false

            if((await User.find({ username })).length < 30) {
                for(let i = 1; i <= 5 && !fulfilled; i++) {
                    if(!await User.findOne({ username, discriminator })) {
                        function getRandomAvatarURL() {
                            const defaultAvatarsCount = fs.readdirSync(path.join(__dirname, "../uploads/avatars/default")).length
                            const random = Math.floor(Math.random() * (defaultAvatarsCount - 1)) + 1
                            return `http://localhost:5000/uploads/avatars/default/${random}.jpg`
                        }

                        const newUser = await User.create({ username, discriminator, email, avatar: getRandomAvatarURL() })
                        res.cookie("token", newUser.generateJWT(process.env.JWT_SECRET + "login"), {path: "/", httpOnly: true})
                        res.status(200).send({ message: "Login successful", id: newUser._id, avatar: newUser.avatar, username: newUser.username })

                        fulfilled = true
                    }
    
                    else discriminator = getNewDiscriminator()
                }
            }

            if(!fulfilled) res.status(400).send({ message: { username: "Username too common" }})
        }

        else res.status(409).send({ message: { email: "Email already exists" }})
    }

    catch(err) {
        next(err)
    }
})

router.post("/resendEmailVerification", require("../middleware/auth"), (req, res, next) => {
    try {
        sendEmail({
            to: req.user.email,
            subject: "Hangman Email Verification",
            text: req.user.generateJWT(process.env.JWT_SECRET + "verifyemail")
        })

        res.status(200).send({ message: "Email verification link sent" })
    }

    catch(err) {
        next(err)
    }
})

router.post("/verifyemail/:verifyemailtoken", async (req, res, next) => {
    try {
        const { _id } = jwt.verify(req.params.verifyemailtoken, process.env.JWT_SECRET + "verifyemail")
        const user = await User.findById(_id)

        if(user) {
            user.expireAt = undefined
            await user.save()
            
            res.cookie("token", user.generateJWT(process.env.JWT_SECRET + "login"), {path: "/", httpOnly: true})
            res.status(200).send({ message: "Email verified successfully", userID: _id })
        }

        else res.status(404).send({ message: "Email verification token expired" })
    }

    catch(err) {
        next(err)
    }
})

router.post("/signout", (req, res, next) => {
    try {
        res.clearCookie("token")
        res.status(200).send({ message: "You've been successfully logged out"})
    }

    catch(err) {
        next(err)
    }
})

module.exports = router