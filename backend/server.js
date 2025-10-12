// backend/server.js (Versão Final com Pix Compatível)
require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db'); 
const { crc16 } = require('crc');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Função para formatar o payload do Pix
function gerarPayloadPix(chave, nome, cidade, valor, txid) {
    nome = nome.substring(0, 25).toUpperCase();
    cidade = cidade.substring(0, 15).toUpperCase();
    txid = txid.substring(0, 25);

    const valorFormatado = valor.toFixed(2);
    const payload = [
        '000201', '26' + (('0014BR.GOV.BCB.PIX01' + chave.length).padStart(2, '0') + chave).length.toString().padStart(2, '0') + '0014BR.GOV.BCB.PIX01' + ('0' + chave.length).slice(-2) + chave,
        '52040000', '5303986', '54' + valorFormatado.length.toString().padStart(2, '0') + valorFormatado,
        '5802BR', '59' + nome.length.toString().padStart(2, '0') + nome,
        '60' + cidade.length.toString().padStart(2, '0') + cidade,
        '62' + (('05' + txid.length).padStart(2, '0') + txid).length.toString().padStart(2, '0') + '05' + ('0' + txid.length).slice(-2) + txid,
        '6304'
    ].join('');

    const crcResult = crc16(payload).toString(16).toUpperCase().padStart(4, '0');
    return payload + crcResult;
}

// Rota para buscar os presentes
app.get('/api/presentes', async (req, res) => {
    try {
        const resultado = await db.query("SELECT * FROM presentes WHERE status = 'disponivel' ORDER BY valor");
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar presentes:", error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para gerar o QR Code com valor
app.post('/api/presentes/:id/gerar-pix', async (req, res) => {
    try {
        const { id } = req.params;
        const presenteResult = await db.query("SELECT * FROM presentes WHERE id = $1", [id]);
        if (presenteResult.rows.length === 0) {
            return res.status(404).json({ error: 'Presente não encontrado.' });
        }
        const presente = presenteResult.rows[0];
        const valorNumerico = parseFloat(presente.valor);

        // --- CORREÇÃO FINAL AQUI ---
        const payload = gerarPayloadPix(
            'mariannavidal12345@gmail.com',
            'Marianna V S',
            'JOAOPESSOA',
            valorNumerico,
            '***' // Usando o ID de transação genérico e universal
        );
        // -------------------------

        const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(payload)}`;

        res.status(200).json({
            qrCodeImageUrl: qrCodeImageUrl,
            qrCodeText: payload
        });

    } catch (error) {
        console.error("Erro ao gerar QR Code Pix:", error);
        res.status(500).json({ error: 'Falha ao gerar o QR Code.' });
    }
});

// Rota de confirmação com lógica de cotas
app.patch('/api/presentes/:id/confirmar', async (req, res) => {
    try {
        const { id } = req.params;
        const presenteResult = await db.query("SELECT * FROM presentes WHERE id = $1", [id]);
        if (presenteResult.rows.length === 0) {
            return res.status(404).json({ message: 'Presente não encontrado.' });
        }
        const presente = presenteResult.rows[0];
        if (presente.cotas_disponiveis <= 1) {
            await db.query("UPDATE presentes SET status = 'pago', cotas_disponiveis = 0 WHERE id = $1", [id]);
        } else {
            await db.query("UPDATE presentes SET cotas_disponiveis = cotas_disponiveis - 1 WHERE id = $1", [id]);
        }
        res.status(200).json({ message: 'Confirmado!' });
    } catch (error) {
        console.error("Erro ao confirmar presente:", error);
        res.status(500).json({ error: 'Não foi possível confirmar.' });
    }
});

// Rota de "Fallback"
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});