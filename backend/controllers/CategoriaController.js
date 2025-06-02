
const CategoriaModel = require("../models/CategoriaModel");

async function getAll(req,res){
    try {
        const data = await CategoriaModel.getCategorias();
        console.log(data);
        
        res.json(data)
    } catch (e) {
        res.status(500).json({message:"Error al cargar las categorias"}, e)
    }
}

async function getById(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = await CategoriaModel.getCategoria(id)
        data? res.json(data) : res.status(404).json({message: "Categoria no encontrada"})
        
    } catch (e) {
        res.status(500).json({message:"Error al traer la categoria"}, e)
        
    }
}

async function create(req, res){
    try {
        await CategoriaModel.postCategoria(req.body)
        res.status(201).json({message:"Categoria Creada Correctamente"})
    } catch (e) {
                res.status(500).json({message:"Error al Crear categoria"}, e)

    }
}


async function update(req, res) {
    try {
        const id  = parseInt(req.params.id)
        await CategoriaModel.updateCategoria(id, req.body)
        res.json({message:"Categoria Actualizada"})
    } catch (e) {
        res.status(500).json({message:"Error al actualizar la categoria"}, e)

    }
}


async function erase_delete(req, res) {
    try {
        const id = parseInt(req.params.id)
        await CategoriaModel.deleteCategoria(id)
        res.json({message:"Categoria eliminada"})
    } catch (e) {
        res.status(500).json({message:"Error al eliminar la categoria"}, e)

    }
    
}

module.exports={getAll, getById,create, update, erase_delete}