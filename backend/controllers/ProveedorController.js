const ProveedorModels = require("../models/ProveedorModel")

async function getAll(req, res){
    try {
        const data = await ProveedorModels.getProovedores(req.user.rol);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: "Error al cargar proveedores"}, error)
    }
}


async function getById(req, res){
    try {
        const id = parseInt(req.params.id)
        const data = await ProveedorModels.getProovedor(req.user.rol,id)
        data? res.json(data) : res.status(404).json({message: "Proveedor no encontrado"})
    } catch (error) {
        res.status(500).json({message: "Error al traer el proveedor"}, error)
    }
}

async function create(req, res){
    try {
        await ProveedorModels.postProveedor(req.user.rol,req.body);
        res.status(201).json({message: "Proveedor creado correctamente"})
    } catch (e) {
        res.status(500).json({message:"Error al crear"}, e)
    }
}

async function update(req, res){
    try {
        const id = parseInt(req.params.id)
        await ProveedorModels.updateProveedor(req.user.rol, id, req.body)
        res.json({message:"Proveedor actualizado correctamente"})
    } catch (e) {
        console.log(e);
        
        res.status(500).json({message:"Error al actualizar"}, e)
    }
}


async function inactive(req, res){
    try {
        const id = parseInt(req.params.id)
        await ProveedorModels.inactiveProveedor(req.user.rol, id)
        res.json({message:"Proveedor inactivo"})
    } catch (error) {
        res.status(500).json({message:"Error al cambiar de estado"}, error)
    }
}


module.exports ={
    getAll,getById,create,update,inactive
}