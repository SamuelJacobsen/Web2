const Product = require('../models/Product')

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongodb')

module.exports = class ProductController {

    //create a product
    static async create(req, res) {
        // res.json({ message: "Deu certo!" })
        const { name, price } = req.body

        const available = true

        //validations
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" })
        }
        if (!price) {
            res.status(422).json({ message: "O preço é obrigatório!" })
        }
        //get product owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //create a product
        const product = new Product({
            name,
            price,
            user: {
                _id: user.id,
                name: user.name,
                phone: user.phone,
            },
        })

        try {
            const newProduct = await product.save()

            res.status(201).json({
                message: 'Produto cadastrado com sucesso!',
                newProduct,
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getAll(req, res) {
        //manda os produtos mais novos
        const products = await Product.find().sort('-createdAt')

        res.status(200).json({
            products: products
        })
    }
    static async getProductById(req, res) {

        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).json({ message: "Id Invalido" })
            return
        }
        //verifica se o produto existe
        const product = await Product.findById(id)

        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' })
        }

        res.status(200).json({ product })

    }
    static async removeProductById(req, res) {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).json({ message: "Id Invalido" })
            return
        }

        //verifica se o produto existe
        const product = await Product.findOne({ _id: id })

        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado ' })
        }
        await Product.findByIdAndRemove(id)
        res.status(200).json({ message: 'Produto removido' })

    }
}