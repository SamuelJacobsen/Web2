const Product = require('../models/Product')

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class ProductController {

    //create a product
    static async create(req, res) {
        // res.json({ message: "Deu certo!" })
        const { name, price } = req.body

        const available = true

        //validations
        if(!name){
            res.status(422).json({message: "O nome é obrigatório!"})
        }
        if(!price){
            res.status(422).json({message: "O preço é obrigatório!"})
        }
        //get product owner
        const token = getToken(req)
        const user = getUserByToken(token)

        //create a product
        const product = new Product({
            name,
            price,
            user:{
                _id: user.id,
                name: user.name,
                phone: user.phone,
            },
        })

        try {
            const newProduct = await product.save()
            res.status(201).json({
                message: 'Produto cadastrado com sucesso!',
                newProduct
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}