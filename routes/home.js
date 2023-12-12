//*Handles initial GET request for the homepage
//*Handles POST method  request for adding a new item

const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const homeController = require('../controllers/home')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, homeController.getHome) //read
router.post('/createClass', upload.array("files"), homeController.createClass)
router.put('/markPaid/:id', homeController.markPaid)
router.delete('/remove/:id', homeController.deleteClass)

module.exports = router