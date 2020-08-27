const express = require('express');
const productsController = require('../controllers/products');
const auth = require('../middleware/auth');

const router = express.Router();

// Define all routes and call respective controllers
router.get('/', auth, productsController.getAllProducts);
router.get('/:id', auth, productsController.getOneProduct);
router.post('/', auth, multer, productsController.createProduct);
router.put('/:id', auth, multer, productsController.modifyProduct);
router.delete('/:id', auth, productsController.deleteProduct);

module.exports = router;