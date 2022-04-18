module.exports = async (req, res, next) => {
    if(req.user.expireAt != undefined) res.status(401).send({ message: "Please check your inbox and verify your account" })
    else next()
}