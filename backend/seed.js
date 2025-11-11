const db = require('./db');

// Lista MESTRA de presentes v5
// Contém os 24 presentes de Mariana (Opção 1 + Regra da Cota Única)
// Contém os 3 presentes de Breno (com PIX correto)
const DADOS_DOS_PRESENTES = [
    // ########## PRESENTES DE MARIANA & RENATO (site_id: 'mariana') - 24 ITENS ##########
    
    // Itens de 1 cota (sempre disponíveis)
    { "id": 11, "nome": "Só para não dizer que eu não dei nada (80)", "valor": 80.00, "imagem_url": "images/moeda-nao-dei-nada-80.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416", "site_id": "mariana" },
    { "id": 12, "nome": "Chá da tarde no hotel", "valor": 80.00, "imagem_url": "images/cha-hotel.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416", "site_id": "mariana" },
    { "id": 13, "nome": "Pijama para os noivos usarem na lua de mel", "valor": 80.00, "imagem_url": "images/pijama-shrek.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416", "site_id": "mariana" },
    { "id": 14, "nome": "Garantindo o topete do noivo", "valor": 80.00, "imagem_url": "images/topete-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416", "site_id": "mariana" },
    { "id": 15, "nome": "Cueca sexy para o noivo usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/cueca-sexy-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416", "site_id": "mariana" },
    { "id": 16, "nome": "Roupa sexy para noiva usar na noite de núpcias", "valor": 80.00, "imagem_url": "images/roupa-sexy-noiva.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540580.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510Uog7w1SbFq63044416", "site_id": "mariana" },
    { "id": 17, "nome": "Lanchinho lá em Aline", "valor": 90.00, "imagem_url": "images/lanche-fastfood.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540590.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510pfhdRZBoqT6304B455", "site_id": "mariana" },
    { "id": 18, "nome": "Estoque de Dorflex para as tensões do casamento", "valor": 90.00, "imagem_url": "images/dorflex-casamento.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540590.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510pfhdRZBoqT6304B455", "site_id": "mariana" },
    { "id": 19, "nome": "Contribuição para a aposentadoria do noivo", "valor": 90.00, "imagem_url": "images/aposentadoria-noivo.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com520400005303986540590.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510pfhdRZBoqT6304B455", "site_id": "mariana" },
    { "id": 22, "nome": "Tampão de ouvido pra noiva enquanto noivo ronca", "valor": 100.00, "imagem_url": "images/tampao-ouvido-ronco.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 23, "nome": "Café da manhã na lua de mel", "valor": 100.00, "imagem_url": "images/cafe-lua-de-mel.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 24, "nome": "Curtir o sol com Água de coco na Praia", "valor": 100.00, "imagem_url": "images/agua-de-coco-praia.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 25, "nome": "Vale sorvete pé na areia", "valor": 100.00, "imagem_url": "images/sorvete-praia.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 26, "nome": "Kit lencinho para os filmes de romance que a noiva chora", "valor": 100.00, "imagem_url": "images/kit-lencos-filme.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 29, "nome": "Sanduicheira mondial", "valor": 100.00, "imagem_url": "images/sanduicheira.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 32, "nome": "Kit Edredon Super Macio Casal", "valor": 120.00, "imagem_url": "images/kit-edredom.jpg", "cotas_total": 1, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406120.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510ZLlGp5r2OK63047950", "site_id": "mariana" },
    
    // Itens com Múltiplas Cotas (Preservando o estado atual)
    { "id": 20, "nome": "Colírio pro noivo chorar quando a noiva entrar", "valor": 100.00, "imagem_url": "images/colirio-noivo.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 21, "nome": "Chá de camomila pra noiva ter paciência com o noivo", "valor": 100.00, "imagem_url": "images/cha-camomila.jpg", "cotas_total": 2, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 27, "nome": "Jantar dos noivos no 1º dia de casados", "valor": 100.00, "imagem_url": "images/jantar-primeiro-dia.jpg", "cotas_total": 2, "cotas_disponiveis": 1, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 28, "nome": "Ajudar o noivo a realizar seu sonho de comprar uma chuteira nova", "valor": 100.00, "imagem_url": "images/chuteira-noivo.jpg", "cotas_total": 4, "cotas_disponiveis": 4, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406100.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510NvkCmyKXPc6304C5D4", "site_id": "mariana" },
    { "id": 30, "nome": "Jogo de Cama Lençol Casal", "valor": 120.00, "imagem_url": "images/jogo-de-cama.jpg", "cotas_total": 5, "cotas_disponiveis": 5, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406120.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510ZLlGp5r2OK63047950", "site_id": "mariana" },
    { "id": 33, "nome": "Noite de Pizza na Lua de Mel", "valor": 125.00, "imagem_url": "images/pizza-lua-de-mel.jpg", "cotas_total": 2, "cotas_disponiveis": 2, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406125.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510iwqNMy0K0563045E62", "site_id": "mariana" },
    { "id": 34, "nome": "Taxa para a noiva não jogar o buquê", "valor": 140.00, "imagem_url": "images/buque-noiva.jpg", "cotas_total": 6, "cotas_disponiveis": 6, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406140.005802BR5923Marianna Vidal da Silva6009SAO PAULO62140510fn6c330d7163041D0D", "site_id": "mariana" },
    { "id": 35, "nome": "Operação lua de mel", "valor": 190.00, "imagem_url": "images/operacao-lua-de-mel.jpg", "cotas_total": 10, "cotas_disponiveis": 10, "status": "disponivel", "pix_copia_e_cola": "00020126500014BR.GOV.BCB.PIX0128mariannavidal12345@gmail.com5204000053039865406190.005802BR5923Marianna Vidal da Silva6009SAO PAULO621405106fMJeDKfvN6304A829", "site_id": "mariana" },


    // ########## PRESENTES DE BRENO & MARIA (site_id: 'trabalho') - 3 ITENS ##########
    { 
        "id": 36, 
        "nome": "Operação Lua de Mel", 
        "valor": 100.00, 
        "imagem_url": "images/operacao-lua-de-mel.jpg", 
        "cotas_total": 42, 
        "cotas_disponiveis": 41,
        "status": "disponivel",
        "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX01363f162663-612b-41af-b790-13d7cfca86435204000053039865406100.005802BR5922Breno Alves de Lacerda6009SAO PAULO62140510GOa5Xf2Cdc6304CB04",
        "site_id": "trabalho"
    },
    { 
        "id": 37, 
        "nome": "Projeto Lar Doce Lar", 
        "valor": 200.00, 
        "imagem_url": "images/lar-doce-lar.jpg", 
        "cotas_total": 42, 
        "cotas_disponiveis": 42,
        "status": "disponivel",
        "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX01363f162663-612b-41af-b790-13d7cfca86435204000053039865406200.005802BR5922Breno Alves de Lacerda6009SAO PAULO62140510b8qWyqP0o36304A276",
        "site_id": "trabalho"
    },
    { 
        "id": 38, 
        "nome": "Ajude os noivos eletrodomesticos para casa nova", 
        "valor": 300.00, 
        "imagem_url": "images/primeiros-socorros.jpg", 
        "cotas_total": 21, 
        "cotas_disponiveis": 21,
        "status": "disponivel",
        "pix_copia_e_cola": "00020126580014BR.GOV.BCB.PIX01363f162663-612b-41af-b790-1DELETED-bf71ab7c3cdb",
        "site_id": "trabalho"
    }
];

// Função para criar a tabela E popular
async function popularBanco() {
  console.log('Iniciando o processo de recriar e popular o banco de dados...');
  
  try {
    // 1. Apaga a tabela antiga, se ela existir
    await db.query('DROP TABLE IF EXISTS presentes');
    console.log('Tabela "presentes" antiga removida (se existia).');

    // 2. Cria a tabela nova com a estrutura correta
    await db.query(`
        CREATE TABLE presentes (
            id INT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            valor DECIMAL(10, 2) NOT NULL,
            imagem_url VARCHAR(255),
            cotas_total INT DEFAULT 1,
            cotas_disponiveis INT DEFAULT 1,
            pix_copia_e_cola TEXT,
            status VARCHAR(50) DEFAULT 'disponivel',
            site_id VARCHAR(50)
        );
    `);
    console.log('Tabela "presentes" criada com sucesso.');

    // 3. Insere todos os dados da lista DADOS_DOS_PRESENTES
    for (const presente of DADOS_DOS_PRESENTES) {
      const queryText = 'INSERT INTO presentes (id, nome, valor, imagem_url, cotas_total, cotas_disponiveis, pix_copia_e_cola, status, site_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      const values = [presente.id, presente.nome, presente.valor, presente.imagem_url, presente.cotas_total, presente.cotas_disponiveis, presente.pix_copia_e_cola, presente.status, presente.site_id];
      await db.query(queryText, values);
      console.log(`- Presente '${presente.nome}' (Site: ${presente.site_id}) inserido.`);
    }
    console.log('Banco de dados populado com sucesso com a lista de presentes ATUALIZADA!');

  } catch (error) {
    console.error('Ocorreu um erro grave durante o processo de seed:', error);
  } finally {
    process.exit();
  }
}

popularBanco();