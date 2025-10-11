// backend/server.js (Versão Final "Tudo em Um")
require('dotenv').config();
const express = require('express');
const path = require('path'); // Pacote para lidar com caminhos
const db = require('./db'); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware (não precisamos mais do CORS aqui, mas não faz mal deixar)
app.use(express.json());

// --- PARTE NOVA: SERVIR O SITE ---
// Diz ao Express para usar os arquivos da pasta 'public' como a base do site
app.use(express.static(path.join(__dirname, 'public')));
// ---------------------------------------------

// Rota da API (continua a mesma)
app.get('/api/presentes', async (req, res) => {
    try {
        const resultado = await db.query("SELECT * FROM presentes WHERE status = 'disponivel' ORDER BY valor");
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar presentes:", error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
});

// --- PARTE NOVA: ROTA DE "FALLBACK" ---
// Se o navegador pedir qualquer rota que não seja da API, mandamos o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});