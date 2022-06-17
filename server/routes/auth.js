const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")
const path = require("path")
const fs = require("fs")

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body

        let errorMessage = {}
        if(!email) errorMessage.email = "Please provide email"
        if(!password) errorMessage.password = "Please provide password"


        if(email && password) {
            const user = await User.findOne({ email })

            if(user && user.matchPassword(password)) res.send({ token: user.generateJWT(process.env.JWT_SECRET + "login"), message: "Login successful" })
            else res.status(401).send({ message: "Invalid email or password" })
        }

        else res.status(400).send({ message: errorMessage })
    }

    catch(err) {
        console.log(err.message)
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
                        const newUser = new User({ username, discriminator, email, password, expireAt: new Date(Date.now() + 3*24*60*60*1000) })

                        if(req.files?.avatar) {
                            await req.files.avatar.mv(path.join(__dirname, `../uploads/temp/avatars/${newUser.expireAt.getTime()} ${newUser._id}.jpg`))
                            newUser.avatar = `http://localhost:5000/temp/avatars/${newUser.expireAt.getTime()} ${newUser._id}.jpg`
                        }
                        
                        await newUser.save()

                        sendEmail({
                            to: newUser.email,
                            subject: "Hangman Email Verification",
                            text: newUser.generateJWT(process.env.JWT_SECRET + "verifyemail")
                        })
                        res.status(200).send({ message: "Please check your inbox and verify your account" })
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
            user.avatar = user.avatar.replace("/temp", "")
            fs.renameSync(path.join(__dirname, `../uploads/temp/avatars/${user.expireAt.getTime()} ${user._id}.jpg`), path.join(__dirname, `../uploads/avatars/${user._id}.jpg`))
            user.expireAt = undefined
            user.save()

            res.status(200).send({ message: "Email verified successfully" })
        }

        else res.status(404).send({ message: "Email verification token expired" })
    }

    catch(err) {
        next(err)
    }
})

module.exports = router