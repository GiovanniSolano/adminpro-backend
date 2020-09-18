const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const Medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        Medicos
    });

}

const crearMedico = async(req, res = response) => {


    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}
const actualizarMedico = async(req, res = response) => {


    res.json({
        ok: true,
        msg: 'Actualizar Medico'
    });

}
const borrarMedico = async(req, res = response) => {


    res.json({
        ok: true,
        msg: 'Eliminar Medico'
    });

}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}