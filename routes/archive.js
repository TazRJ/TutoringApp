const express = require('express')
const router = express.Router()
const archiveController = require('../controllers/archive')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, archiveController.getIndex)

module.exports = router