// script.js (Versão Final com Botão de Confirmação)
document.addEventListener('DOMContentLoaded', () => {

    const MINHA_CHAVE_PIX = "mariannavidal12345@gmail.com";
    const MEU_NOME_PIX = "Marianna Vidal da Silva - Nubank";
    const MEU_NUMERO_WHATSAPP = "5583981367568";

    const API_URL = '/api';
    const listaPresentesContainer = document.getElementById('lista-presentes');
    const presenteTemplate = document.getElementById('presente-template');
    const modal = document.getElementById('modal-pix');
    const closeModalBtn = document.querySelector('.fechar-modal');
    const pixInfoContainer = document.getElementById('pix-info');
    
    // ... (funções carregarPresentes e criarCardDePresente continuam iguais) ...
    async function carregarPresentes() {
        listaPresentesContainer.innerHTML = '<h2>Carregando presentes...</h2>';
        try {
            const response = await fetch(`${API_URL}/presentes`);
            if (!response.ok) { throw new Error('Não foi possível carregar os presentes. Aguarde um instante...'); }
            const presentes = await response.json();
            listaPresentesContainer.innerHTML = ''; 
            if (presentes.length === 0) { listaPresentesContainer.innerHTML = '<h2>Nenhum presente disponível no momento.</h2>'; return; }
            presentes.forEach(presente => { const card = criarCardDePresente(presente); listaPresentesContainer.appendChild(card); });
        } catch (error) { console.error("Erro:", error); listaPresentesContainer.innerHTML = `<h2 style="color: red;">${error.message}</h2>`; }
    }
    function criarCardDePresente(presente) {
        const cardClone = presenteTemplate.content.cloneNode(true);
        const cardElement = cardClone.firstElementChild;
        cardElement.querySelector('.presente-img').src = presente.imagem_url;
        cardElement.querySelector('.presente-img').alt = presente.nome;
        cardElement.querySelector('.presente-nome').textContent = presente.nome;
        const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(presente.valor);
        cardElement.querySelector('.presente-preco').textContent = precoFormatado;
        const cotasElement = cardElement.querySelector('.presente-cotas');
        if (presente.cotas_total > 1) { cotasElement.textContent = `Disponível ${presente.cotas_disponiveis} de ${presente.cotas_total} cotas`; } else { cotasElement.style.display = 'none'; }
        cardElement.querySelector('.btn-presentear').addEventListener('click', () => { abrirModalPix(presente); });
        return cardElement;
    }

    // --- FUNÇÃO ABRIRMODALPIX ATUALIZADA ---
    function abrirModalPix(presente) {
        modal.style.display = 'block';
        const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(presente.valor);
        
        pixInfoContainer.innerHTML = `
            <h3>Obrigado pelo seu carinho!</h3>
            <p>1. Faça um Pix no valor de <strong>${valorFormatado}</strong> para a chave abaixo.</p>
            
            <div class="pix-manual-info">
                <strong>Chave Pix (E-mail):</strong>
                <input type="text" value="${MINHA_CHAVE_PIX}" readonly id="pix-copia-cola">
                <button id="btn-copiar">Copiar Chave</button>
                <p><small><strong>Nome:</strong> ${MEU_NOME_PIX}</small></p>
            </div>

            <div class="aviso-importante">
                <p>2. Após pagar, clique no botão abaixo para confirmar seu presente e removê-lo da lista!</p>
                <button id="btn-confirmar-pagamento">Já fiz o Pix! Confirmar Presente</button>
            </div>
        `;
        
        document.getElementById('btn-copiar').addEventListener('click', () => {
            const input = document.getElementById('pix-copia-cola');
            input.select();
            document.execCommand('copy');
            alert('Chave Pix copiada!');
        });

        // Lógica do novo botão de confirmação
        const btnConfirmar = document.getElementById('btn-confirmar-pagamento');
        btnConfirmar.addEventListener('click', async () => {
            btnConfirmar.disabled = true; // Desabilita o botão para evitar cliques duplos
            btnConfirmar.textContent = 'Confirmando...';

            try {
                const response = await fetch(`${API_URL}/presentes/${presente.id}/confirmar`, {
                    method: 'PATCH',
                });

                if (!response.ok) {
                    throw new Error('Não foi possível confirmar. Tente novamente.');
                }

                alert('Muito obrigado pelo seu presente! Ele já foi removido da lista.');
                location.reload(); // Recarrega a página para mostrar a lista atualizada

            } catch (error) {
                alert(error.message);
                btnConfirmar.disabled = false;
                btnConfirmar.textContent = 'Já fiz o Pix! Confirmar Presente';
            }
        });
    }

    function fecharModal() { modal.style.display = 'none'; }
    carregarPresentes();
    closeModalBtn.addEventListener('click', fecharModal);
    window.addEventListener('click', (event) => { if (event.target == modal) { fecharModal(); } });
});