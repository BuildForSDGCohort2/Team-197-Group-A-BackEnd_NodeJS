const express = require('express');
const productsController = require('../controllers/products');
const auth = require('../middleware/auth');

const router = express.Router();

// Define all routes and call respective controllers
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getOneProduct);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.modifyProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;