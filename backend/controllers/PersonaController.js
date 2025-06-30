const PersonaModel = require("../models/PersonaModel")

async function getAll(req,res){
    try {
        const data = await PersonaModel.getPersonas(req.user.rol);
        console.log(data);
        
        res.json(data)
    } catch (e) {
        res.status(500).json({message:"Error al cargar las Personas", error: e.message})
    }
}

async function getById(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = await PersonaModel.getPersona(req.user.rol, id)
        data? res.json(data) : res.status(404).json({message: "Persona no encontrada"})
        
    } catch (e) {
        res.status(500).json({message:"Error al traer la Persona", error: e.message})
        
    }
}

async function create(req, res){
    try {
        await PersonaModel.postPersona(req.user.rol, req.body)
        res.status(201).json({message:"Persona Creada Correctamente"})
    } catch (e) {
                res.status(500).json({message:"Error al Crear Persona", error: e.message})

    }
}


async function update(req, res) {
    try {
        const id  = parseInt(req.params.id)
        await PersonaModel.updatePersona(req.user.rol, id, req.body)
        res.json({message:"Persona Actualizada"})
    } catch (e) {
        res.status(500).json({message:"Error al actualizar la Persona", error: e.message})

    }
}


async function erase_delete(req, res) {
    try {
        const id = parseInt(req.params.id)
        await PersonaModel.deletePersona(req.user.rol, id)
        res.json({message:"Persona eliminada"})
    } catch (e) {
        res.status(500).json({message:"Error al eliminar la Persona", error: e.message})

    }
    
}

module.exports={getAll, getById,create, update, erase_delete}