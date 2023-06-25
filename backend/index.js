const express = require('express')

const app = express()   

//config Json response
app.use(express.json())

//pasta para as imagens
app.use(express.static('public'))


app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
})
