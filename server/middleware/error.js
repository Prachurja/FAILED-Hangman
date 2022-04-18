const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

module.exports = (err, req, res, next) => {
    if(err instanceof mongoose.Error.ValidationError) {
        const errors = err.errors
        Object.keys(errors).forEach(key => {
            const { properties } = errors[key]
            errors[key] = properties.message
        })

        res.status(400).send({ message: errors })
    }

    else if(err instanceof jwt.JsonWebTokenError) {
        try {
            res.status(400).send({ message: "Token invalid or expired" })
        }

        catch(err) {
            console.log("soo... the error WAS here")
        }
    }

    else {
        res.status(500).send({ message: "Uh oh, something went wrong. The admins have been notified of the error. Sorry for the inconvenience!" })
    }

    next()
}