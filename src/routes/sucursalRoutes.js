const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

router.get('/', sucursalController.getAll);
router.post('/', sucursalController.create);
router.put("/:id", sucursalController.update);
router.delete("/:id", sucursalController.remove);

module.exports = router;