const express = require('express');
const { foodPartnerAuthMiddleware } = require('../middlewares/auth.middleware');
const registerFood = require('../controllers/food.controller');
const multer = require('multer');

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', foodPartnerAuthMiddleware, upload.single('video'), registerFood)

module.exports = router