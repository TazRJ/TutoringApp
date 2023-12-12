const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const editController = require('../controllers/edit')
const { ensureAuth } = require('../middleware/auth')

router.get('/:id/:paid', ensureAuth, editController.getEdit)
router.delete('/remove/:id/:paid', editController.deleteClass)
router.put('/update/:id', upload.array("files"), (req, res, next) => {
    console.log(req.files);
    next();
}, editController.updateClass)
router.delete('/update/removeFile/:classId/:fileId', editController.deleteFile)
router.put('/markPaid/:id', editController.markPaid)
router.put('/markNotPaid/:id', editController.markNotPaid)

module.exports = router