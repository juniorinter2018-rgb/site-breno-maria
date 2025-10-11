const db = require('./db');

const DADOS_DOS_PRESENTES = [
    { "id": 1, "nome": "Toma aqui uns 50 reais", "valor": 50.00, "imagem_url": "images/dinheiro-50-reais.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 2, "nome": "Para garantir o docinho da festa", "valor": 50.00, "imagem_url": "images/docinhos-festa.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 3, "nome": "Meia para o noivo usar no dia do casamento", "valor": 50.00, "imagem_url": "images/meia-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 4, "nome": "Só para não dizer que eu não dei nada (50)", "valor": 50.00, "imagem_url": "images/dinheiro-nao-dei-nada-50.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 5, "nome": "Tudo o que eu tenho na conta", "valor": 55.00, "imagem_url": "images/moedas-conta.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 6, "nome": "Netflix pro casal no mês", "valor": 55.00, "imagem_url": "images/netflix-casal.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 7, "nome": "Passeio na Rua", "valor": 60.00, "imagem_url": "images/passeio-rua.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 8, "nome": "Kit balde de pipoca", "valor": 60.00, "imagem_url": "images/kit-pipoca.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 9, "nome": "Lencinhos para a noiva enxugar as lágrimas", "valor": 60.00, "imagem_url": "images/lencos-noiva.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 10, "nome": "Sessão chocolate quente para filmes de natal", "valor": 70.00, "imagem_url": "images/chocolate-quente.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 11, "nome": "Só para não dizer que eu não dei nada (80)", "valor": 80.00, "imagem_url": "images/moeda-nao-dei-nada-80.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 12, "nome": "Chá da tarde no hotel", "valor": 80.00, "imagem_url": "images/cha-hotel.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 13, "nome": "Pijama para os noivos usarem na lua de mel", "valor": 80.00, "imagem_url": "images/pijama-shrek.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 14, "nome": "Garantindo o topete do noivo", "valor": 80.00, "imagem_url": "images/topete-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 15, "nome": "Cueca sexy para o noivo usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/cueca-sexy-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 16, "nome": "Roupa sexy para noiva usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/roupa-sexy-noiva.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 17, "nome": "Lanchinho lá em Aline", "valor": 90.00, "imagem_url": "images/lanche-fastfood.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 18, "nome": "Estoque de Dorflex para as tensões do casamento", "valor": 90.00, "imagem_url": "images/dorflex-casamento.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 19, "nome": "Contribuição para a aposentadoria do noivo", "valor": 90.00, "imagem_url": "images/aposentadoria-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 20, "nome": "Colírio pro noivo chorar quando a noiva entrar", "valor": 100.00, "imagem_url": "images/colirio-noivo.jpg", "cotas_total": 2, "cotas_disponiveis": 2 },
    { "id": 21, "nome": "Chá de camomila pra noiva ter paciência com o noivo", "valor": 100.00, "imagem_url": "images/cha-camomila.jpg", "cotas_total": 2, "cotas_disponiveis": 2 },
    { "id": 22, "nome": "Tampão de ouvido pra noiva enquanto noivo ronca", "valor": 100.00, "imagem_url": "images/tampao-ouvido-ronco.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 23, "nome": "Café da manhã na lua de mel", "valor": 100.00, "imagem_url": "images/cafe-lua-de-mel.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 24, "nome": "Curtir o sol com Água de coco na Praia", "valor": 100.00, "imagem_url": "images/agua-de-coco-praia.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 25, "nome": "Vale sorvete pé na areia", "valor": 100.00, "imagem_url": "images/sorvete-praia.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 26, "nome": "Kit lencinho para os filmes de romance que a noiva chora", "valor": 100.00, "imagem_url": "images/kit-lencos-filme.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 27, "nome": "Jantar dos noivos no 1º dia de casados", "valor": 100.00, "imagem_url": "images/jantar-primeiro-dia.jpg", "cotas_total": 2, "cotas_disponiveis": 2 },
    { "id": 28, "nome": "Ajudar o noivo a realizar seu sonho de comprar uma chuteira nova", "valor": 100.00, "imagem_url": "images/chuteira-noivo.jpg", "cotas_total": 4, "cotas_disponiveis": 4 },
    { "id": 29, "nome": "Sanduicheira mondial", "valor": 100.00, "imagem_url": "images/sanduicheira.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 30, "nome": "Jogo de Cama Lençol Casal", "valor": 120.00, "imagem_url": "images/jogo-de-cama.jpg", "cotas_total": 5, "cotas_disponiveis": 5 },
    { "id": 31, "nome": "Café da manhã no hotel", "valor": 120.00, "imagem_url": "images/cafe-hotel.jpg", "cotas_total": 2, "cotas_disponiveis": 2 },
    { "id": 32, "nome": "Kit Edredon Super Macio Casal", "valor": 120.00, "imagem_url": "images/kit-edredom.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 33, "nome": "Noite de Pizza na Lua de Mel", "valor": 125.00, "imagem_url": "images/pizza-lua-de-mel.jpg", "cotas_total": 1, "cotas_disponiveis": 1 },
    { "id": 34, "nome": "Taxa para a noiva não jogar o buquê", "valor": 140.00, "imagem_url": "images/buque-noiva.jpg", "cotas_total": 4, "cotas_disponiveis": 4 },
    { "id": 35, "nome": "Operação lua de mel", "valor": 187.50, "imagem_url": "images/operacao-lua-de-mel.jpg", "cotas_total": 8, "cotas_disponiveis": 8 }
];

async function popularBanco() {
  console.log('Iniciando o processo de popular o banco de dados...');
  for (const presente of DADOS_DOS_PRESENTES) {
    try {
      const queryText = 'INSERT INTO presentes (nome, valor, imagem_url, cotas_total, cotas_disponiveis) VALUES ($1, $2, $3, $4, $5)';
      const values = [presente.nome, presente.valor, presente.imagem_url, presente.cotas_total, presente.cotas_disponiveis];
      await db.query(queryText, values);
      console.log(`- Presente '${presente.nome}' inserido com sucesso.`);
    } catch (error) {
      console.error(`Erro ao inserir o presente '${presente.nome}':`, error);
    }
  }
  console.log('Banco de dados populado com sucesso!');
  process.exit();
}

popularBanco();