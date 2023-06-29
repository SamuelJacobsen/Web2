const express = require('express');

const app = express();

//config Json response
app.use(express.json());

//Db Connection
// const conn = require("./db/conn");
// conn();


//pasta para as imagens
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
app.use('/users', UserRoutes)
app.use('/products', ProductRoutes)




app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
})
