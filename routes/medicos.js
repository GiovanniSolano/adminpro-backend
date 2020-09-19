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
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos

    ],
    crearMedico);

router.put('/:id', [


        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id', 'El id del médico no es válido').isMongoId(),
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos

    ],
    actualizarMedico);

router.delete('/:id', [validarJWT,
        check('id', 'El id del médico no es válido').isMongoId(),
        validarCampos
    ],
    borrarMedico);














module.exports = router;