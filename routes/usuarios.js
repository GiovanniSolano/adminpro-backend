/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE_o_MismoUsuario, validarADMIN_ROLE } = require('../middlewares/validar-jwt');
const router = Router();




router.get('/', validarJWT, getUsuarios);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario);

router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('id', 'El id del usuario no es válido').isMongoId(),
        validarCampos

    ],
    actualizarUsuario);

router.delete('/:id', [validarJWT,
    validarADMIN_ROLE,
    check('id', 'El id del usuario no es válido').isMongoId(),
    validarCampos
], borrarUsuario);














module.exports = router;