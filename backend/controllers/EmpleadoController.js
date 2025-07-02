const EmpleadoModel =require("../models/EmpleadoModel")


async function getAll(req,res){
    try {
        const data = await EmpleadoModel.getEmpleados(req.user.rol);
        console.log(data);
        
        res.json(data)
    } catch (e) {
        res.status(500).json({message:"Error al cargar Empleados"})
    }
}

async function getById(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = await EmpleadoModel.getEmpleado(req.user.rol, id)
        data? res.json(data) : res.status(404).json({message: "Empleado no encontrado"})
        
    } catch (e) {
        res.status(500).json({message:"Error al traer la Empleado", error: e.message})
        
    }
}

async function create(req, res){
    try {
        await EmpleadoModel.postEmpleado(req.user.rol, req.body)
        res.status(201).json({message:"Empleado Creado Correctamente"})
    } catch (e) {
        
        console.log(e);
                res.status(500).json({message:"Error al Crear Empleado", error: e.message})

    }
}


async function update(req, res) {
    try {
        const id  = parseInt(req.params.id)
        await EmpleadoModel.updateEmpleado(req.user.rol, id, req.body.PersonaId, req.body)
        res.json({message:"Empleado Actualizado"})
    } catch (e) {
        console.log(e);
        
        res.status(500).json({message:"Error al actualizar Empleado", error: e.message})

    }
}


async function erase_delete(req, res) {
    try {
        const id = parseInt(req.params.id)
        const person =  await EmpleadoModel.getEmpleado(req.user.rol, id)
        const idPerson= parseInt(person.PersonaId)
        console.log(idPerson);
        
        await EmpleadoModel.deleteEmpleado(req.user.rol, id, idPerson)
        res.json({message:"Empleado eliminado"})
    } catch (e) {
        console.log(e);
        
        res.status(500).json({message:"Error al eliminar Empleado", error: e.message})

    }
    
}

module.exports={getAll, getById,create, update, erase_delete}