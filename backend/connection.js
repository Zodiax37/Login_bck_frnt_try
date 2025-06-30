require('dotenv').config();
const sql = require('mssql');

// const config = {
//   user: process.env.DB_USER?.trim(),
//   password: process.env.DB_PASSWORD?.trim(),
//   server: process.env.DB_SERVER?.trim(),
//   database: process.env.DB_DATABASE?.trim(),
//   port: parseInt(process.env.DB_PORT?.trim(), 10),
//   options: {
//     encrypt: false,
//     trustServerCertificate: true
//   }
// };

const configs = {
  admin: {
    user: process.env.DB_USER_ADMIN?.trim(),
    password: process.env.DB_PASSWORD_ADMIN?.trim(),
    server: process.env.DB_SERVER?.trim(),
    database: process.env.DB_DATABASE?.trim(),
    port: parseInt(process.env.DB_PORT?.trim(), 10),
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  ventas: {
    user: process.env.DB_USER_VENTAS?.trim(),
    password: process.env.DB_PASSWORD_VENTAS?.trim(),
    server: process.env.DB_SERVER?.trim(),
    database: process.env.DB_DATABASE?.trim(),
    port: parseInt(process.env.DB_PORT?.trim(), 10),
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  inventario: {
    user: process.env.DB_USER_INVENTARIO?.trim(),
    password: process.env.DB_PASSWORD_INVENTARIO?.trim(),
    server: process.env.DB_SERVER?.trim(),
    database: process.env.DB_DATABASE?.trim(),
    port: parseInt(process.env.DB_PORT?.trim(), 10),
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  lector: {
    user: process.env.DB_USER_LECTOR?.trim(),
    password: process.env.DB_PASSWORD_LECTOR?.trim(),
    server: process.env.DB_SERVER?.trim(),
    database: process.env.DB_DATABASE?.trim(),
    port: parseInt(process.env.DB_PORT?.trim(), 10),
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  escritor: {
    user: process.env.DB_USER_ESCRITOR?.trim(),
    password: process.env.DB_PASSWORD_ESCRITOR?.trim(),
    server: process.env.DB_SERVER?.trim(),
    database: process.env.DB_DATABASE?.trim(),
    port: parseInt(process.env.DB_PORT?.trim(), 10),
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }
};

const pools = {}

async function getConnectionByRole(role='ventas') {
  try {
    // const pool = await sql.connect(config)
    // console.log('Conexión exitosa a la base de datos')

    if(!pools[role]){
      pools[role] = await sql.connect(configs[role]);
      console.log("Usuario:",(configs[role].user)); // 🔍

    console.log('Conexión exitosa a la base de datos')
    }

    return pools[role];

  } catch (error) {
    console.error('Error de conexión:', error);
    throw error;
  }
}

module.exports = { sql, getConnectionByRole };
