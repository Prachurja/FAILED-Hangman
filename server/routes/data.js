const router = require("express").Router()
const User = require("../models/User")

router.get("/user/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select(Object.keys(req.query).map(key => key.toLowerCase()).filter(key => key !== "password" && req.query[key] === "1").join(" "))

        if(user) {
            res.status(200).send({id: user._id, user})
        }

        else {
            res.status(404).send("User not found")
        }
    }

    catch(err) {
        next(err)
    }
})

module.exports = router