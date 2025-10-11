// Importa o pacote 'dotenv' para carregar as variáveis de ambiente do arquivo .env
// Isso garante que process.env.DB_URL tenha o valor que definimos.
require('dotenv').config();

// Importa o pacote 'pg' e especificamente a classe Pool.
// O Pool gerencia múltiplas conexões com o banco, o que é mais eficiente.
const { Pool } = require('pg');

// Cria uma nova instância do Pool de conexões, passando a string de conexão
// que está na nossa variável de ambiente.
const pool = new Pool({
    connectionString: process.env.DB_URL,
});

// Exporta um objeto. Outros arquivos que importarem este módulo terão acesso
// a tudo o que estiver dentro deste objeto.
module.exports = {
    // Nós exportamos um método chamado 'query' que simplesmente repassa
    // o texto da query e os parâmetros para o pool de conexões.
    query: (text, params) => pool.query(text, params),
};