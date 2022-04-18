const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        match: [/^[^#]+$/, "Username cannot contain #"]
    },
    discriminator: {
        type: String,
        required: [true, "Please provide a discriminator"],
        match: [/^\d{4}$/, "Discriminator must be 4 digits in length"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide an email"],
        match: [/^(([\w\d].{0,62}[\w\d])|([\w\d]{1,64}))@(?=.{1,63}(\..{1,63}){1,2}$)[\d\w]+-?[\d\w]+(\.[\d\w]+-?[\d\w]+){1,2}$/, "Invalid email"]
    },
    emailResetIAT: {
        type: Date,
        validator: function(iat) {
            return iat >= Date.now()
        }
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        match: [/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d).*){8,}/, "Password must be 8 characters in length, with a combination of numbers and uppercase and lowercase letters"]
    },
    passwordResetIAT: {
        type: Date,
        validator: function(iat) {
            return iat >= Date.now()
        }
    },
    friends: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    blocked: [{ 
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    expireAt: {
        type: Date
    },
})

UserSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 })

UserSchema.pre("save", function (next) {
    if(this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10)
    }
    
    if(this.passwordResetToken && this.isModified("passwordResetToken")) {
        this.passwordResetToken = bcrypt.hashSync(this.passwordResetToken, 10)
    }

    next()
})

UserSchema.methods.matchPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.generateJWT = function(key, options, additionalData) {
    return jwt.sign({ _id: this._id, ...(additionalData || {}) }, key, options)
}

module.exports = mongoose.model("User", UserSchema)