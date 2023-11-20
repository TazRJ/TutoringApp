const express = require('express')
const router = express.Router()
const archiveController = require('../controllers/archive')

router.get('/', archiveController.getIndex)
router.post('/:id', archiveController.updateItem)
router.post('/notPaid/:id', archiveController.updateItemAsNotPaid)
// router.get('/remove/:id', editController.deleteItem)
// router.post('/update/:id', editController.updateItem)

module.exports = router