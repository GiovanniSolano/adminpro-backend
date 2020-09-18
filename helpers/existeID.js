const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const existeID = async(id, tipo) => {


    let existeIdEnBD = false;

    switch (tipo) {
        case 'medicos':
            existeIdEnBD = await Medico.findById(id);
            return (existeIdEnBD) ? true : false;
        case 'usuarios':
            existeIdEnBD = await Usuario.findById(id);
            return (existeIdEnBD) ? true : false;
        case 'hospitales':
            existeIdEnBD = await Hospital.findById(id);
            return (existeIdEnBD) ? true : false;
        default:
            return false;
    }

}

module.exports = {
    existeID
}