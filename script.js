// backend/server.js (Versão Final de Produção com CORS)
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importa o pacote CORS
const db = require('./db'); 

const app = express();
const port = process.env.PORT || 3000; // Usa a porta da Render, ou 3000 localmente

app.use(cors()); // Habilita o CORS para aceitar requisições de outros domínios (o seu site)
app.use(express.json());

// A única rota que precisamos: buscar os presentes disponíveis
app.get('/api/presentes', async (req, res) => {
    try {
        const resultado = await db.query("SELECT * FROM presentes WHERE status = 'disponivel' ORDER BY valor");
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar presentes:", error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
});

// Inicia o servidor para escutar por requisições
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});