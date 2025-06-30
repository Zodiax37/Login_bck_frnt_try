const { getConnectionByRole, sql } = require("../connection");
const bcrypt = require("bcryptjs");

async function loginUsuario(username, password) {
    const pool = await getConnectionByRole("lector"); // o 'login', si tienes uno limitado
    const result = await pool.request()
        .input("Username", sql.NVarChar, username)
        .query("SELECT u.Id, u.Username, u.Rol, u.Password FROM Usuarios u WHERE u.Username = @Username AND u.Estado = 1");

    const user = result.recordset[0];
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) return null;

    return {
        id: user.Id,
        username: user.Username,
        rol: user.Rol,
    };
}

module.exports = { loginUsuario };
