const express = require('express')
const { registerUser, loginuser, logOut, registerFoodPartner, loginFoodPartner } = require('../controllers/auth.controller')


const router = express.Router()

//user Authes

router.post('/signup', registerUser)
router.post('/login',loginuser)
router.post('/logout',logOut)


//foodPartner Authes

router.post('/foodpartner/signup',registerFoodPartner)
router.post('/foodpartner/login',loginFoodPartner)


module.exports = router