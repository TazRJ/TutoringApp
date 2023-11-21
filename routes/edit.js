const express = require('express')
const router = express.Router()
const editController = require('../controllers/edit')

router.get('/:id/:paid', editController.getEdit)
router.get('/remove/:id', editController.deleteClass)
router.post('/update/:id', editController.updateClass)
router.post('/markPaid/:id', editController.markPaid)
router.post('/markNotPaid/:id', editController.markNotPaid)

module.exports = router