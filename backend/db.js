// backend/db.js (Versão Final com SSL inteligente)
require('dotenv').config();
const { Pool } = require('pg');

// Verifica se a DB_URL é uma conexão local
const isLocalConnection = process.env.DB_URL && process.env.DB_URL.includes('localhost');

// Configura o SSL:
// Se for conexão local, SSL é 'false' (desativado).
// Se NÃO for local (ex: Render), ativa o SSL.
const sslConfig = isLocalConnection
    ? false
    : { rejectUnauthorized: false };

// Cria a conexão com a configuração de SSL correta
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: sslConfig
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};