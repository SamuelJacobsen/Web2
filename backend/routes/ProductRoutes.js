const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

router.post('/create', ProductController.create)

module.exports = router