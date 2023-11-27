//*Handles initial GET request for the homepage
//*Handles POST method  request for adding a new item

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, homeController.getHome) //read
router.post('/createClass', homeController.createClass) //create
router.post('/markPaid/:id', homeController.markPaid)
router.get('/remove/:id', homeController.deleteClass)

module.exports = router