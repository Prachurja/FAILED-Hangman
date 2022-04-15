const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        
        if(user && user.matchPassword(password)) res.send({ token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET) })
        else res.status(401).send({ message: "Invalid email or password" })
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

            for(let i = 1; i <= 5 && !fulfilled; i++) {
                if(!await User.findOne({ username, discriminator })) {
                    const newUser = await User.create({ username, discriminator, email, password })
                    res.send({ token: jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET) })

                    fulfilled = true
                }

                else discriminator = getNewDiscriminator()
            }

            if(!fulfilled) res.status(400).send({ message: { username: "Username too common" }})
        }

        else res.status(409).send({ message: { email: "Email already exists"}})
    }

    catch(err) {
        next(err)
    }
})

module.exports = router