// backend/db.js (Versão Final com SSL)
require('dotenv').config();
const { Pool } = require('pg');

// Cria a conexão com a configuração de SSL necessária para a Render
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};