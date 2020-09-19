const { response } = require('express');
const Usuario = require('../models/usuario');
const brcyptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {



        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales incorrectas - email'
            });
        }

        // Verificar contraseña
        const validPassword = brcyptjs.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas - password'
            });
        }

        // Generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });


    }

}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;



        if (!usuarioDB) {



            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });

        } else {

            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;

        }

        // Guardar en BD

        await usuario.save();

        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            token
        });



    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'El token no es correcto'
        });

    }




}

module.exports = {
    login,
    googleSignIn
}