const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

module.exports = (err, req, res, next) => {
    if(err instanceof mongoose.Error.ValidationError) {
        const errors = err.errors
        Object.keys(errors).forEach(key => {
            const { properties } = errors[key]
            errors[key] = properties.message
        })

        res.status(400).send({ message: errors[0].message })
    }

    else if(err instanceof jwt.JsonWebTokenError) {
        res.status(400).send({ message: "Token invalid or expired" })
    }

    else {
        console.log(err)
        res.status(500).send({ message: "Uh oh, something went wrong. The admins have been notified of the error. Sorry for the inconvenience!" })
    }

    next()
}