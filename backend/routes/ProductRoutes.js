const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, ProductController.create)

module.exports = router