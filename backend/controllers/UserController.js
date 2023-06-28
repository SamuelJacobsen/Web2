const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const { default: mongoose } = require('mongoose')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatorio' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatorio' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatorio' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatoria' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatoria' })
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({
                message: 'A senha e a confirmação de senha precisam ser iguais!',
            })
            return
        }
        //check se o usuario existe
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(422).json({
                message: 'Por favor, utilize outro email!',
            })
            return
        }


        //create a password 
        const salt = await bcrypt.genSalt(6)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatorio' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatoria' })
            return
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({
                message: 'Não há usuario cadastrado com este email'
            })
            return
        }

        //valida se a senha é igual a senha armazenada no db 
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({
                message: 'Senha invalida'
            })
            return
        }
        await createUserToken(user, req, res)
    }


    //verifica e valida om usuario por jwt
    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {

        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }
        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        // res.status(200).json({
        //     message: 'Ok'
        // })
        // return
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: 'ID invalido!'})
        }
        try {
            const user = await User.findById(req.params.id)
            if(!user){
                res.status(422).json({
                    message: 'Usuario não encontrado!',
                })
            }
            res.status(200).json({ user })
        } catch (err) {
            res.status(500).json(err.message)
        }

    }
}