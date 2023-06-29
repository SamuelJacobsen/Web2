const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, ProductController.create)

router.get('/', ProductController.getAll)

router.get('/:id', ProductController.getProductById)
router.delete('/:id', verifyToken, ProductController.removeProductById)
router.patch('/:id', verifyToken, ProductController.updateProduct)
module.exports = router