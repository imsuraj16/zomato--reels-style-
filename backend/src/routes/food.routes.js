const express = require('express');
const { registerFood, foodReels } = require('../controllers/food.controller');
const multer = require('multer');
const { foodPartnerAuthMiddleware, userAuthMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', foodPartnerAuthMiddleware, upload.single('video'), registerFood)
router.get('/reels', userAuthMiddleware, foodReels)

module.exports = router
