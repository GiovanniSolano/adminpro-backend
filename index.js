require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// BD
dbConnection();
// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        mensaje: 'Hola mundo'
    });

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000');
});