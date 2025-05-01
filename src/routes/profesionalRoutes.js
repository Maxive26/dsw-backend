const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/', profesionalController.getAll);
router.post('/', profesionalController.create);
router.put("/:legajo", profesionalController.update);
router.delete("/:legajo", profesionalController.remove);

module.exports = router;