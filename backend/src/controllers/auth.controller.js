const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const foodPartnerModel = require('../models/foodPartner.model')


// userAuth

const registerUser = async (req, res) => {

    try {

        const { fullName, email, password } = req.body

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                msg: "email already exists"
            })
        }

        const newUser = await userModel.create({
            fullName,
            email,
            password: await bcrypt.hash(password, 10)
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(201).json({
            msg: 'user registered successfully',
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            }
        })


    } catch (error) {

        res.status(500).json({
            msg: error.message
        })
    }


}

const loginuser = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                msg: "incorrect username or password"
            }
            )
        }


        const isPasswordCoreect = await bcrypt.compare(password, user.password)

        if (!isPasswordCoreect) {
            return res.status(401).json({
                msg: "incorrect username or password"
            })

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).json({
            msg: "user logged in successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })
    } catch (error) {

        res.status(500).json({
            msg: error.message
        })
    }


}

const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            msg: "user logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}


// food-partnerAuth

const registerFoodPartner = async (req, res) => {
    try {

        const { fullName, email, password } = req.body

        const existingUser = await foodPartnerModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                msg: "user already exists"
            })

        }

        const foodPartnerUser = await foodPartnerModel.create({
            fullName,
            email,
            password: await bcrypt.hash(password, 10)
        })

        const token = jwt.sign({ id: foodPartnerUser._id }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(201).json({
            msg: "user registered successfully",
            user: {
                _id: foodPartnerUser._id,
                fullName: foodPartnerUser.fullName,
                email: foodPartnerUser.email,
            }
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}


const loginFoodPartner = async (req, res) => {

    try {

        const { email, password } = req.body

        const partner = await foodPartnerModel.findOne({ email })

        if (!partner) {
            return res.status(401).json({
                msg: "incorrect username or password"
            })
        }

        const isPasswordCoreect = await bcrypt.compare(password, partner.password)

        if (!isPasswordCoreect) {
            return res.status(401).json({
                msg: "incorrect username or password"
            })
        }

        const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).json({
            msg: "user logged in successfully",
            user: {
                _id: partner._id,
                fullName: partner.fullName,
                email: partner.email,
            }
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}



module.exports = { registerUser, loginuser, logOut, registerFoodPartner, loginFoodPartner };