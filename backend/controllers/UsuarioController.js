
//VER COMO FUNCIONA: "res.status(500).json({message:"Error al actualizar la Usuario", error: e.message})" VS "res.status(500).json({message:"Error al traer la Usuario"}, e)"

const UsuarioModel = require("../models/UsuariosModel");

async function getAll(req,res){
    try {
        const data = await UsuarioModel.getUsuarios(req.user.rol);
        console.log(data);
        
        res.json(data)
    } catch (e) {
        res.status(500).json({message:"Error al cargar las Usuarios"})
    }
}

async function getById(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = await UsuarioModel.getUsuario(req.user.rol, id)
        data? res.json(data) : res.status(404).json({message: "Usuario no encontrado"})
        
    } catch (e) {
        res.status(500).json({message:"Error al traer Usuario", error: e.message})
        
    }
}

async function create(req, res){
    try {
        await UsuarioModel.postUsuario(req.user.rol, req.body)
        res.status(201).json({message:"Usuario Creado Correctamente"})
    } catch (e) {
                res.status(500).json({message:"Error al Crear Usuario", error: e.message})

    }
}


async function update(req, res) {
    try {
        const id  = parseInt(req.params.id)
        await UsuarioModel.updateUsuario(req.user.rol, id, req.body)
        res.json({message:"Usuario Actualizado"})
    } catch (e) {
        res.status(500).json({message:"Error al actualizar Usuario", error: e.message})

    }
}


async function erase_delete(req, res) {
    try {
        const id = parseInt(req.params.id)
        await UsuarioModel.deleteUsuario(req.user.rol, id)
        res.json({message:"Usuario eliminada", error: e.message})
    } catch (e) {
        res.status(500).json({message:"Error al eliminar la Usuario", error: e.message})

    }
    
}

module.exports={getAll, getById,create, update, erase_delete}