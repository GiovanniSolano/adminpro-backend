/*
Busquedas
ruta: api/uploads

*/




const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { fileUpload, getImagen } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.use(expressFileUpload());



router.put('/:tipo/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    validarCampos

], fileUpload);

router.get('/:tipo/:imagen', getImagen)



module.exports = router;