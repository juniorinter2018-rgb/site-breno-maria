// backend/server.js (VERSÃO FINAL DE DEPLOY)
require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db'); 
const cors = require('cors'); // Necessário para testes locais

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permite acesso de outras origens (como o 127.0.0.1)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o site 'mariana' (Marianna & Renato)
app.get('/api/presentes', async (req, res) => {
    try {
        const siteAtual = 'mariana';
        const resultado = await db.query(
            "SELECT * FROM presentes WHERE status = 'disponivel' AND site_id = $1 ORDER BY RANDOM()",
            [siteAtual]
        );
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar presentes (mariana):", error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para o site 'trabalho' (Breno & Maria)
app.get('/api/trabalho', async (req, res) => {
    try {
        const siteTrabalho = 'trabalho';
        const resultado = await db.query(
            "SELECT * FROM presentes WHERE status = 'disponivel' AND site_id = $1 ORDER BY RANDOM()",
            [siteTrabalho]
        );
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar itens (trabalho):", error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
});

// Rota de confirmação (funciona para ambos os sites)
app.patch('/api/presentes/:id/confirmar', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('BEGIN');
        const presenteResult = await db.query("SELECT * FROM presentes WHERE id = $1 FOR UPDATE", [id]);
        if (presenteResult.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ message: 'Presente não encontrado.' });
        }
        const presente = presenteResult.rows[0];
        if (presente.cotas_disponiveis <= 0) {
            await db.query('ROLLBACK');
            return res.status(400).json({ message: 'Não há mais cotas disponíveis para este presente.' });
        }
        let updatedPresente;
        if (presente.cotas_disponiveis === 1) {
            const updateResult = await db.query("UPDATE presentes SET status = 'pago', cotas_disponiveis = 0 WHERE id = $1 RETURNING *", [id]);
            updatedPresente = updateResult.rows[0];
        } else {
            const updateResult = await db.query("UPDATE presentes SET cotas_disponiveis = cotas_disponiveis - 1 WHERE id = $1 RETURNING *", [id]);
            updatedPresente = updateResult.rows[0];
        }
        await db.query('COMMIT');
        res.status(200).json({ message: 'Confirmado!', presente: updatedPresente });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(`Erro ao confirmar presente ${id}:`, error);
        res.status(500).json({ error: 'Não foi possível confirmar o presente.' });
    }
});

// Rota de "Fallback" - Serve o index.html para qualquer rota não-API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});