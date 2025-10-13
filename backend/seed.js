const db = require('./db');

// Lista final de presentes com todos os valores, cotas e links PIX corretos.
const DADOS_DOS_PRESENTES = [
    { 
        "id": 0, 
        "nome": "Produto de Teste (Cotas)", 
        "valor": 0.01, 
        "imagem_url": "images/produto-teste.jpg", 
        "cotas_total": 2, 
        "cotas_disponiveis": 2,
        "pix_copia_e_cola": "00020126360014BR.GOV.BCB.PIX0114+558398792292452040000530398654040.015802BR5925Rivanildo Eugenio Manguei6009SAO PAULO621405106UkJi40IUT6304816E"
    },
    { "id": 1, "nome": "Toma aqui uns 50 reais", "valor": 50.00, "imagem_url": "images/dinheiro-50-reais.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540550.005802BR5923Marianna Vidal da Silva6009SAO PAULO621405107EgpoUdGUg63042167" },
    { "id": 2, "nome": "Para garantir o docinho da festa", "valor": 50.00, "imagem_url": "images/docinhos-festa.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540550.005802BR5923Marianna Vidal da Silva6009SAO PAULO621405107EgpoUdGUg63042167" },
    { "id": 3, "nome": "Meia para o noivo usar no dia do casamento", "valor": 50.00, "imagem_url": "images/meia-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540550.005802BR5923Marianna Vidal da Silva6009SAO PAULO621405107EgpoUdGUg63042167" },
    { "id": 4, "nome": "Só para não dizer que eu não dei nada (50)", "valor": 50.00, "imagem_url": "images/dinheiro-nao-dei-nada-50.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540550.005802BR5923Marianna Vidal da Silva6009SAO PAULO621405107EgpoUdGUg63042167" },
    { "id": 5, "nome": "Tudo o que eu tenho na conta", "valor": 55.00, "imagem_url": "images/moedas-conta.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540555.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510ayMh5e7llk63049270" },
    { "id": 6, "nome": "Netflix pro casal no mês", "valor": 55.00, "imagem_url": "images/netflix-casal.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540555.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510ayMh5e7llk63049270" },
    { "id": 7, "nome": "Passeio na Rua", "valor": 60.00, "imagem_url": "images/passeio-rua.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540560.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510q2wuyeNc7B63042110" },
    { "id": 8, "nome": "Kit balde de pipoca", "valor": 60.00, "imagem_url": "images/kit-pipoca.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540560.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510q2wuyeNc7B63042110" },
    { "id": 9, "nome": "Lencinhos para a noiva enxugar as lágrimas", "valor": 60.00, "imagem_url": "images/lencos-noiva.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540560.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510q2wuyeNc7B63042110" },
    { "id": 10, "nome": "Sessão chocolate quente para filmes de natal", "valor": 70.00, "imagem_url": "images/chocolate-quente.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540570.005802BR5923Marianna Vidal da Silva6009SAO PAULO621405108dkAPdPxXx6304AA2C" },
    { "id": 11, "nome": "Só para não dizer que eu não dei nada (80)", "valor": 80.00, "imagem_url": "images/moeda-nao-dei-nada-80.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416" },
    { "id": 12, "nome": "Chá da tarde no hotel", "valor": 80.00, "imagem_url": "images/cha-hotel.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416" },
    { "id": 13, "nome": "Pijama para os noivos usarem na lua de mel", "valor": 80.00, "imagem_url": "images/pijama-shrek.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416" },
    { "id": 14, "nome": "Garantindo o topete do noivo", "valor": 80.00, "imagem_url": "images/topete-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416" },
    { "id": 15, "nome": "Cueca sexy para o noivo usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/cueca-sexy-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416" },
    { "id": 16, "nome": "Roupa sexy para noiva usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/roupa-sexy-noiva.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416" },
    { "id": 17, "nome": "Lanchinho lá em Aline", "valor": 90.00, "imagem_url": "images/lanche-fastfood.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540590.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510pfhdRZBoqT6304B455" },
    { "id": 18, "nome": "Estoque de Dorflex para as tensões do casamento", "valor": 90.00, "imagem_url": "images/dorflex-casamento.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540590.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510pfhdRZBoqT6304B455" },
    { "id": 19, "nome": "Contribuição para a aposentadoria do noivo", "valor": 90.00, "imagem_url": "images/aposentadoria-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540590.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510pfhdRZBoqT6304B455" },
    { "id": 20, "nome": "Colírio pro noivo chorar quando a noiva entrar", "valor": 100.00, "imagem_url": "images/colirio-noivo.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 21, "nome": "Chá de camomila pra noiva ter paciência com o noivo", "valor": 100.00, "imagem_url": "images/cha-camomila.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 22, "nome": "Tampão de ouvido pra noiva enquanto noivo ronca", "valor": 100.00, "imagem_url": "images/tampao-ouvido-ronco.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 23, "nome": "Café da manhã na lua de mel", "valor": 100.00, "imagem_url": "images/cafe-lua-de-mel.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 24, "nome": "Curtir o sol com Água de coco na Praia", "valor": 100.00, "imagem_url": "images/agua-de-coco-praia.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 25, "nome": "Vale sorvete pé na areia", "valor": 100.00, "imagem_url": "images/sorvete-praia.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 26, "nome": "Kit lencinho para os filmes de romance que a noiva chora", "valor": 100.00, "imagem_url": "images/kit-lencos-filme.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 27, "nome": "Jantar dos noivos no 1º dia de casados", "valor": 100.00, "imagem_url": "images/jantar-primeiro-dia.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 28, "nome": "Ajudar o noivo a realizar seu sonho de comprar uma chuteira nova", "valor": 100.00, "imagem_url": "images/chuteira-noivo.jpg", "cotas_total": 4, "cotas_disponiveis": 4, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 29, "nome": "Sanduicheira mondial", "valor": 100.00, "imagem_url": "images/sanduicheira.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4" },
    { "id": 30, "nome": "Jogo de Cama Lençol Casal", "valor": 120.00, "imagem_url": "images/jogo-de-cama.jpg", "cotas_total": 5, "cotas_disponiveis": 5, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406120.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510ZLlGp5r2OK63047950" },
    { "id": 31, "nome": "Café da manhã no hotel", "valor": 120.00, "imagem_url": "images/cafe-hotel.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406120.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510ZLlGp5r2OK63047950" },
    { "id": 32, "nome": "Kit Edredon Super Macio Casal", "valor": 120.00, "imagem_url": "images/kit-edredom.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406120.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510ZLlGp5r2OK63047950" },
    { "id": 33, "nome": "Noite de Pizza na Lua de Mel", "valor": 125.00, "imagem_url": "images/pizza-lua-de-mel.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406125.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510iwqNMy0K0563045E62" },
    { "id": 34, "nome": "Taxa para a noiva não jogar o buquê", "valor": 140.00, "imagem_url": "images/buque-noiva.jpg", "cotas_total": 6, "cotas_disponiveis": 6, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406140.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510fn6c330d7163041D0D" },
    { "id": 35, "nome": "Operação lua de mel", "valor": 190.00, "imagem_url": "images/operacao-lua-de-mel.jpg", "cotas_total": 10, "cotas_disponiveis": 10, "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406190.005802BR5923Marianna Vidal da Silva6009SAO PAULO621405106fMJeDKfvN6304A829" }
];

async function popularBanco() {
  console.log('Iniciando o processo de limpar e popular o banco de dados...');
  
  try {
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