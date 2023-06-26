const jwt = require("jsonwebtoken")

const createUserToken = async(user, req, res) => {

//create a token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "secret")

//return a token
res.status(200).json({
    message: "voce esta autenticado",
    token: token,
    userId: user._id,

})
}

module.exports = createUserToken 