const express = require('express');
const foodPartnerDetails = require('../controllers/foodPartner.controller');
const router =  express.Router();


router.get('/:id',foodPartnerDetails)




module.exports = router;