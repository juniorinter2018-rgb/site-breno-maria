const db = require('./db');

// Adicionei um produto de teste com um código PIX válido para testes.
const DADOS_DOS_PRESENTES = [
    { 
        "id": 0, 
        "nome": "Produto de Teste (Cotas)", 
        "valor": 0.01, 
        "imagem_url": "images/produto-teste.jpg", 
        "cotas_total": 2, 
        "cotas_disponiveis": 2,
        "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" // PIX para teste
    },
    { "id": 1, "nome": "Toma aqui uns 50 reais", "valor": 50.00, "imagem_url": "images/dinheiro-50-reais.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 2, "nome": "Para garantir o docinho da festa", "valor": 50.00, "imagem_url": "images/docinhos-festa.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 3, "nome": "Meia para o noivo usar no dia do casamento", "valor": 50.00, "imagem_url": "images/meia-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 4, "nome": "Só para não dizer que eu não dei nada (50)", "valor": 50.00, "imagem_url": "images/dinheiro-nao-dei-nada-50.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 5, "nome": "Tudo o que eu tenho na conta", "valor": 55.00, "imagem_url": "images/moedas-conta.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 6, "nome": "Netflix pro casal no mês", "valor": 55.00, "imagem_url": "images/netflix-casal.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 7, "nome": "Passeio na Rua", "valor": 60.00, "imagem_url": "images/passeio-rua.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 8, "nome": "Kit balde de pipoca", "valor": 60.00, "imagem_url": "images/kit-pipoca.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 9, "nome": "Lencinhos para a noiva enxugar as lágrimas", "valor": 60.00, "imagem_url": "images/lencos-noiva.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 10, "nome": "Sessão chocolate quente para filmes de natal", "valor": 70.00, "imagem_url": "images/chocolate-quente.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 11, "nome": "Só para não dizer que eu não dei nada (80)", "valor": 80.00, "imagem_url": "images/moeda-nao-dei-nada-80.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 12, "nome": "Chá da tarde no hotel", "valor": 80.00, "imagem_url": "images/cha-hotel.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 13, "nome": "Pijama para os noivos usarem na lua de mel", "valor": 80.00, "imagem_url": "images/pijama-shrek.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 14, "nome": "Garantindo o topete do noivo", "valor": 80.00, "imagem_url": "images/topete-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 15, "nome": "Cueca sexy para o noivo usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/cueca-sexy-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 16, "nome": "Roupa sexy para noiva usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/roupa-sexy-noiva.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 17, "nome": "Lanchinho lá em Aline", "valor": 90.00, "imagem_url": "images/lanche-fastfood.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 18, "nome": "Estoque de Dorflex para as tensões do casamento", "valor": 90.00, "imagem_url": "images/dorflex-casamento.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 19, "nome": "Contribuição para a aposentadoria do noivo", "valor": 90.00, "imagem_url": "images/aposentadoria-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" },
    { "id": 20, "nome": "Colírio pro noivo chorar quando a noiva entrar", "valor": 100.00, "imagem_url": "images/colirio-noivo.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX0136a29a39f6-1b48-4325-8e92-08b51a021098" }
];

async function popularBanco() {
  console.log('Iniciando o processo de limpar e popular o banco de dados...');
  
  try {
    // Limpa a tabela antes de inserir novos dados para evitar duplicados
    await db.query('DELETE FROM presentes');
    console.log('Tabela "presentes" limpa com sucesso.');

    for (const presente of DADOS_DOS_PRESENTES) {
      const queryText = 'INSERT INTO presentes (id, nome, valor, imagem_url, cotas_total, cotas_disponiveis, pix_copia_e_cola) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values = [presente.id, presente.nome, presente.valor, presente.imagem_url, presente.cotas_total, presente.cotas_disponiveis, presente.pix_copia_e_cola];
      await db.query(queryText, values);
      console.log(`- Presente '${presente.nome}' inserido com sucesso.`);
    }
    console.log('Banco de dados populado com sucesso!');
  } catch (error) {
    console.error('Ocorreu um erro durante o processo de seed:', error);
  } finally {
    process.exit();
  }
}

popularBanco();