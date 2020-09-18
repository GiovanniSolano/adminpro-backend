const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const { existeID } = require('../helpers/existeID');

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;



    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {

        return res.status(400).json({
            ok: false,
            msg: `No existe una colección con el nombre: ${tipo}`
        });

    }



    // Existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo seleccionado'
        });
    }

    // Verificar que existe el usuario en la BD antes de subir la imagen
    const existeEnBD = await existeID(id, tipo);

    if (!existeEnBD) {

        return res.status(400).json({
            ok: false,
            msg: 'El id no fue encontrado'
        });

    }


    // Procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: `${extensionArchivo} no es una extensión permitida`
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });

        }

        // ActualizarImagen
        actualizarImagen(tipo, id, nombreArchivo, res);


        res.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo
        });


    });
}

const getImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const imagen = req.params.imagen;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }


}

module.exports = {
    fileUpload,
    getImagen

}