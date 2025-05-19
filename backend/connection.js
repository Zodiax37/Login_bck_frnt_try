require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER?.trim(),
  password: process.env.DB_PASSWORD?.trim(),
  server: process.env.DB_SERVER?.trim(),
  database: process.env.DB_DATABASE?.trim(),
  port: parseInt(process.env.DB_PORT?.trim(), 10),
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error('Error de conexión:', error);
    throw error;
  }
}

module.exports = { sql, getConnection };
