const express = require('express')
const router = express.Router()
const editController = require('../controllers/edit')

router.get('/:id/:paid', editController.getEdit)
router.get('/edit/remove/:id', editController.deleteClass)
router.post('/update/:id', editController.updateClass)

module.exports = router