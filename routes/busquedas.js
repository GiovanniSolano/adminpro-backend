/*
Busquedas
ruta: api/todo/busqueda

*/




const { Router } = require('express');
const { getBusquedaTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();



router.get('/:busqueda', validarJWT, getBusquedaTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);



module.exports = router;