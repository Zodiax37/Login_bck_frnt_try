const ExistenciaModel = require("../models/ExistenciasModel")

async function getAll(req, res) {
    try {
        const data = await ExistenciaModel.getExistencias()
        res.json(data)
    } catch (e) {
        res.status(500).json({message:"Error al cargar existencias"}, e)
    }
    
}



async function getById(req, res){
    try {
        const id = parseInt(req.params.id)
        const data = await ExistenciaModel.getExistencia(id)
        data? res.json(data) : res.status(404).json({message: "Existencia no encontrada"})
    } catch (error) {
        res.status(500).json({message: "Error al traer Existencia"}, error)
    }
}

async function create(req, res){
    try {
        await ExistenciaModel.postExistencia(req.body);
        res.status(201).json({message: "Existencia creada correctamente"})
    } catch (e) {
        res.status(500).json({message:"Error al crear"}, e)
    }
}

async function update(req, res){
    try {
        const id = parseInt(req.params.id)
        await ExistenciaModel.updateExistencia(id, req.body)
        res.json({message:"Existencia actualizada correctamente"})
    } catch (e) {
        res.status(500).json({message:"Error al actualizar"}, e)
    }
}


async function erase_delete(req, res){
    try {
        const id = parseInt(req.params.id)
        await ExistenciaModel.deleteExistencia(id)
        res.json({message:"Existecia Eliminada"})
    } catch (error) {
        res.status(500).json({message:"Error al eliminar"}, error)
    }
}


module.exports ={
    getAll,getById,create,update,erase_delete
}