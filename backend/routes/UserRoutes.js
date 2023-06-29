const router = require('express').Router()

const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

//rota de atualizacao portanto protegida
router.patch('/edit/:id', verifyToken, UserController.editUser)
router.delete('/:id', verifyToken, ProductController.removeProductById)


module.exports = router