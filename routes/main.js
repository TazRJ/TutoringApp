const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const mainController = require('../controllers/main')

router.get('/', mainController.getIndex)
router.get('/free', mainController.getFree)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router