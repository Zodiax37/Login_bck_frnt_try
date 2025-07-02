const ExistenciaModel = require("../models/ExistenciasModel")
const { enviarCorreoNotificacion } = require("../utils/email");


async function getAll(req, res){
    try {
        const data = await ExistenciaModel.getMovimientos(req.user.rol);
        res.json(data);
    } catch (e) {
        res.status(500).json({message:"Error al traer movimientos", error:e.message})
    }
}

async function getById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const data = await ExistenciaModel.getProducto(req.user.rol, id)
        data ? res.json(data) : res.status(404).json({ message: "Movimiento no encontrado" })

    } catch (e) {
        res.status(500).json({ message: "Error al traer el Movimiento", error: e.message })

    }
 }

async function createMovimiento(req, res) {
  try {
    const noti = await ExistenciaModel.postMovimiento(req.user.rol, req.body);

    // Si se creó una notificación
    if (noti) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const asunto = '📢 Alerta de Stock Bajo';
      const mensajeHtml = `
        <h3>⚠️ Alerta de Stock Bajo</h3>
        <p>Producto: <strong>${noti.NombreProducto}</strong></p>
        <p>Mensaje: ${noti.Mensaje}</p>
      `;

      await enviarCorreoNotificacion({ para: adminEmail, asunto, mensajeHtml });
    }

    res.status(201).json({
      message: "Movimiento registrado correctamente",
      notificacion: noti ? noti.Mensaje : null,
    });
  } catch (e) {
    console.error("Error en createMovimiento:", e);
    console.log(e)
    res.status(500).json({
      message: "Error al registrar el movimiento",
      error: e.message,
    });
  }
}

module.exports = { getAll,getById,createMovimiento };



//#region 

// async function getAll(req, res) {
//     try {
//         const data = await ExistenciaModel.getExistencias()
//         res.json(data)
//     } catch (e) {
//         res.status(500).json({message:"Error al cargar existencias"}, e)
//     }
    
// }



// async function getById(req, res){
//     try {
//         const id = parseInt(req.params.id)
//         const data = await ExistenciaModel.getExistencia(id)
//         data? res.json(data) : res.status(404).json({message: "Existencia no encontrada"})
//     } catch (error) {
//         res.status(500).json({message: "Error al traer Existencia"}, error)
//     }
// }

// async function create(req, res){
//     try {
//         await ExistenciaModel.postExistencia(req.body);
//         res.status(201).json({message: "Existencia creada correctamente"})
//     } catch (e) {
//         res.status(500).json({message:"Error al crear"}, e)
//     }
// }

// async function update(req, res){
//     try {
//         const id = parseInt(req.params.id)
//         await ExistenciaModel.updateExistencia(id, req.body)
//         res.json({message:"Existencia actualizada correctamente"})
//     } catch (e) {
//         res.status(500).json({message:"Error al actualizar"}, e)
//     }
// }


// async function erase_delete(req, res){
//     try {
//         const id = parseInt(req.params.id)
//         await ExistenciaModel.deleteExistencia(id)
//         res.json({message:"Existecia Eliminada"})
//     } catch (error) {
//         res.status(500).json({message:"Error al eliminar"}, error)
//     }
// }


// module.exports ={
//     getAll,getById,create,update,erase_delete
// }
//#endregion