const PORT = process.env.PORT || 9999;

const BD_HOST = process.env.BD_HOST || 'localhost';
const BD_USER = process.env.BD_USER || 'root';
const BD_PASSWORD = process.env.BD_PASSWORD || 'n0m3l0';
const BD_NAME = process.env.BD_NAME  || 'crud';
const BD_PORT = process.env.BD_PORT || 3306;

module.exports = {PORT, BD_HOST, BD_USER, BD_PASSWORD, BD_NAME, BD_PORT}