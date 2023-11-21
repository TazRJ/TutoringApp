const express = require('express')
const router = express.Router()
const archiveController = require('../controllers/archive')

router.get('/', archiveController.getIndex)

module.exports = router