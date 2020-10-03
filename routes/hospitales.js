/*
Hospitales
ruta: /api/hospitales
 */


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();



router.get('/', getHospitales);

router.post('/', [

        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put('/:id', [

        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        check('id', 'El id del hospital no es válido').isMongoId(),
        validarCampos

    ],
    actualizarHospital);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id del hospital no es válido').isMongoId(),
    validarCampos
], borrarHospital);














module.exports = router;