const { getConnection, sql, getConnectionByRole } = require("../connection");
const jwt = require('jsonwebtoken');

const LoginModel = require("../models/LoginModel");


const loginIntentos = {};

const login = async (req, res) => {
    const { userName, pass } = req.body;

    if (!userName || !pass) {
        return res.status(400).json({ error: "Faltan datos" });
    }



    if (loginIntentos[userName]?.blocked) {
        return res.status(403).json({ error: "Usuario bloqueado temporalmente" });
    }

    try {
        const user = await LoginModel.loginUsuario(userName, pass)

        if (user){
            loginIntentos[userName] = { attemps: 0, blocked: false };

                const token = jwt.sign(
                    {
                        id: user.Id,
                        userName: user.Username,
                        rol: user.Rol, // debe venir en la tabla: 'Ventas', 'Inventario', 'admin'
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                return res.json({ message: "Inicio de sesión exitoso", token });
        }

        // if (result.recordset.length > 0) {
        //     const user = result.recordset[0];


            // if (user.Pass === pass) {
               

               
            // }
        // }

        // Manejo de intentos fallidos
        if (!loginIntentos[userName]) {
            loginIntentos[userName] = { attemps: 1, blocked: false };
        } else {
            loginIntentos[userName].attemps++;
            if (loginIntentos[userName].attemps >= 2) {
                loginIntentos[userName].blocked = true;
            }
        }

        return res.status(401).json({ error: "Usuario o contraseña incorrecta" });


    } catch (err) {
        console.error("Error en el login:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { login };
