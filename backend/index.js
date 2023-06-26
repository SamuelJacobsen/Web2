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
app.use('/users', UserRoutes)




app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
})
