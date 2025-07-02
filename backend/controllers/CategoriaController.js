
//VER COMO FUNCIONA: "res.status(500).json({message:"Error al actualizar la categoria", error: e.message})" VS "res.status(500).json({message:"Error al traer la categoria"}, e)"

const CategoriaModel = require("../models/CategoriaModel");

async function getAll(req,res){
    try {
        const data = await CategoriaModel.getCategorias(req.user.rol);
        console.log(data);
        
        res.json(data)
    } catch (e) {
        res.status(500).json({message:"Error al cargar las categorias"})
    }
}

async function getById(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = await CategoriaModel.getCategoria(req.user.rol, id)
        data? res.json(data) : res.status(404).json({message: "Categoria no encontrada"})
        
    } catch (e) {
        res.status(500).json({message:"Error al traer la categoria", error: e.message})
        
    }
}

async function create(req, res){
    try {
        await CategoriaModel.postCategoria(req.user.rol, req.body)
        res.status(201).json({message:"Categoria Creada Correctamente"})
    } catch (e) {
                res.status(500).json({message:"Error al Crear categoria", error: e.message})

    }
}


async function update(req, res) {
    try {
        const id  = parseInt(req.params.id)
        await CategoriaModel.updateCategoria(req.user.rol, id, req.body)
        res.json({message:"Categoria Actualizada"})
    } catch (e) {
        res.status(500).json({message:"Error al actualizar la categoria", error: e.message})

    }
}


async function erase_delete(req, res) {
    try {
        const id = parseInt(req.params.id)
        await CategoriaModel.deleteCategoria(req.user.rol, id)
        res.json({message:"Categoria eliminada"})
    } catch (e) {
        console.log(e);
        
        res.status(500).json({message:"Error al eliminar la categoria", error: e.message})

    }
    
}

module.exports={getAll, getById,create, update, erase_delete}