const Product = require('../models/Product')

module.exports = class ProductController {

    static async create(req, res) {
        res.json({ message: "Deu certo!" })
    }

}