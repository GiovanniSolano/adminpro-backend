/*
Medicos
ruta: /api/medicos
 */


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/Medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();



router.get('/', getMedicos);

router.post('/', [

        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id no es válido').isMongoId(),
        validarCampos

    ],
    crearMedico);

router.put('/:id', [


    ],
    actualizarMedico);

router.delete('/:id', borrarMedico);














module.exports = router;