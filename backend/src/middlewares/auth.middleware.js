const foodPartnerModel = require("../models/foodPartner.model")
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")

const foodPartnerAuthMiddleware = async (req, res, next) => {

    try {

        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({
                msg: "unauthorized user"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_Secret)

            const partner = await foodPartnerModel.findById(decoded.id).select('-password')

            req.partner = partner
            next()
        } catch (error) {
            res.status(401).json({
                msg: "unauthorized"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })

    }
}

const userAuthMiddleware = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            msg: "unauthorized user"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_Secret)
    
        const user = await userModel.findById(decoded.id).select('-password')
       
        req.user = user
        next()

    } catch (error) {
        res.status(401).json({
            msg: "unauthorized"
        })
    }

}


module.exports = {
    foodPartnerAuthMiddleware,
    userAuthMiddleware
};