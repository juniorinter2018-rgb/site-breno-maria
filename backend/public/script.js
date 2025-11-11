// script.js (com corações azuis 💙)
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/api'; 
    let todosOsPresentes = [];
    const listaPresentesContainer = document.getElementById('lista-presentes');
    const presenteTemplate = document.getElementById('presente-template');
    const modal = document.getElementById('modal-pix');
    const closeModalBtn = document.querySelector('.fechar-modal');
    const pixInfoContainer = document.getElementById('pix-info');
    
    const WHATSAPP_LINK_BASE = `https://wa.me/5583981604700?text=Oi!%20Acabei%20de%20dar%20um%20presente%20para%20os%20noivos%20Breno%20e%20Maria%20Luiza!%20Segue%20o%20comprovante%20do:`;

    function iniciarContagemRegressiva() {
        const dataCasamento = new Date('2026-01-03T17:00:00').getTime();
        const elementoContagem = document.getElementById('contagem-regressiva');
        if (!elementoContagem) return;
        const atualizarContagem = () => {
            const agora = new Date().getTime();
            const diferenca = dataCasamento - agora;
            if (diferenca < 0) {
                elementoContagem.innerHTML = "O grande dia chegou!";
                clearInterval(intervalo);
                return;
            }
            const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
            elementoContagem.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        };
        const intervalo = setInterval(atualizarContagem, 1000);
        atualizarContagem();
    }

    async function carregarPresentes() {
        listaPresentesContainer.innerHTML = '<h2>Carregando presentes...</h2>';
        try {
            const response = await fetch(`${API_URL}/trabalho`); 
            if (!response.ok) { throw new Error('Não foi possível carregar os presentes.'); }
            
            todosOsPresentes = await response.json();
            
            todosOsPresentes.forEach(p => {
                if (p.cotas_disponiveis === 0) {
                    p.esgotado = true;
                }
            });

            todosOsPresentes.sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor));

            renderizarPresentes(todosOsPresentes);
        } catch (error) {
            console.error("Erro:", error);
            listaPresentesContainer.innerHTML = `<h2 style="color: red;">Não foi possível carregar os presentes.</h2>`;
        }
    }

    function renderizarPresentes(lista) {
        listaPresentesContainer.innerHTML = '';
        if (lista.length === 0) { listaPresentesContainer.innerHTML = '<h2>Nenhum presente disponível.</h2>'; return; }
        
        lista.forEach(p => { 
            const card = criarCardDePresente(p); 
            listaPresentesContainer.appendChild(card); 
        });
    }

    function criarCardDePresente(presente) {
        const cardClone = presenteTemplate.content.cloneNode(true);
        const cardElement = cardClone.firstElementChild;

        if (presente.esgotado) {
            cardElement.classList.add('esgotado');
            const selo = document.createElement('div');
            selo.className = 'presente-esgotado-selo';
            selo.textContent = 'Presenteado!';
            cardElement.appendChild(selo);
        }

        cardElement.querySelector('.presente-img').src = presente.imagem_url;
        cardElement.querySelector('.presente-nome').textContent = presente.nome;
        const precoF = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(presente.valor);
        cardElement.querySelector('.presente-preco').textContent = precoF;
        
        const cotasEl = cardElement.querySelector('.presente-cotas');
        
        if (presente.cotas_total > 1) {
            const perc = (presente.cotas_disponiveis / presente.cotas_total) * 100;
            cotasEl.innerHTML = `
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${perc}%;"></div>
                </div>
                <span>Disponível ${presente.cotas_disponiveis} de ${presente.cotas_total} cotas</span>
            `;
        } else {
            cotasEl.style.display = 'none';
        }
        
        const btn = cardElement.querySelector('.btn-presentear');
        
        if (presente.esgotado) {
            btn.disabled = true;
            btn.textContent = 'Presenteado!';
        } else {
            btn.addEventListener('click', () => abrirModalPix(presente));
        }

        return cardElement;
    }

    function abrirModalPix(presente) {
        modal.style.display = 'flex';
        
        const ehLinkDePagamento = presente.pix_copia_e_cola.startsWith('http');

        let conteudoModal = '';

        if (ehLinkDePagamento) {
            conteudoModal = `
                <h3>Obrigado pelo seu carinho! ❤️</h3>
                <p>1. Clique no botão abaixo para pagar com PIX (Nubank).</p>
                <div class="pix-manual-info">
                    <a href="${presente.pix_copia_e_cola}" target="_blank" class="btn-pagar-nubank">
                        Pagar R$ ${presente.valor.toFixed(2)} com PIX
                    </a>
                </div>
                <div class="aviso-importante">
                    <p>2. Após pagar, clique em "Confirmar" aqui embaixo!</p>
                    <button id="btn-confirmar-pagamento">Já paguei! Confirmar</button>
                </div>
            `;
            
            const style = document.createElement('style');
            style.innerHTML = `
                .btn-pagar-nubank {
                    display: inline-block;
                    background-color: #820AD1;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: bold;
                    font-family: 'Raleway', sans-serif;
                }
            `;
            document.head.appendChild(style);

        } else {
            const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(presente.pix_copia_e_cola)}`;
            conteudoModal = `
                <h3>Obrigado pelo seu carinho! ❤️</h3>
                <p>1. Escaneie o QR Code abaixo com o seu banco.</p>
                <div class="pix-manual-info">
                    <img src="${qrCodeImageUrl}" alt="QR Code Pix">
                    <strong>Ou use o Pix Copia e Cola:</strong>
                    <input type="text" value="${presente.pix_copia_e_cola}" readonly id="pix-copia-cola">
                    <button id="btn-copiar">Copiar Código</button>
                </div>
                <div class="aviso-importante">
                    <p>2. Após pagar, confirme o presente abaixo!</p>
                    <button id="btn-confirmar-pagamento">Já paguei! Confirmar</button>
                </div>
            `;
        }

        pixInfoContainer.innerHTML = conteudoModal;

        const btnCopiar = document.getElementById('btn-copiar');
        if (btnCopiar) {
            btnCopiar.addEventListener('click', () => {
                const input = document.getElementById('pix-copia-cola');
                input.select();
                input.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(input.value).then(() => {
                    btnCopiar.textContent = 'Copiado! ✓';
                    btnCopiar.classList.add('copiado');
                    setTimeout(() => {
                        btnCopiar.textContent = 'Copiar Código';
                        btnCopiar.classList.remove('copiado');
                    }, 2000);
                }).catch(err => {
                    document.execCommand('copy');
                    btnCopiar.textContent = 'Copiado! ✓';
                    btnCopiar.classList.add('copiado');
                    setTimeout(() => {
                        btnCopiar.textContent = 'Copiar Código';
                        btnCopiar.classList.remove('copiado');
                    }, 2000);
                });
            });
        }

        document.getElementById('btn-confirmar-pagamento').addEventListener('click', () => confirmarPagamento(presente));
    }
    
    function criarAnimacaoCoracoes() {
        const container = document.createElement('div');
        container.className = 'hearts-container';
        document.body.appendChild(container);
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💙'; // <-- MUDANÇA AQUI (coração azul)
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${(Math.random() * 2) + 3}s`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(heart);
        }
        setTimeout(() => { container.remove(); }, 6000);
    }

    async function confirmarPagamento(presente) {
        const btn = document.getElementById('btn-confirmar-pagamento');
        if (btn) { btn.disabled = true; btn.textContent = 'Confirmando...'; }
        
        try {
            const response = await fetch(`${API_URL}/presentes/${presente.id}/confirmar`, { method: 'PATCH' });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Não foi possível confirmar o presente.');
            }
            
            criarAnimacaoCoracoes();
            pixInfoContainer.innerHTML = `<div style="text-align: center; z-index: 10; position: relative;"><h2>Presente Confirmado! ✅</h2><p>Muito obrigado! ❤️</p><p>A redirecionar para o WhatsApp...</p></div>`;
            
            const presenteIndex = todosOsPresentes.findIndex(p => p.id === presente.id);
            if (presenteIndex !== -1) {
                if (data.presente.status === 'pago') {
                    todosOsPresentes[presenteIndex].esgotado = true; 
                    todosOsPresentes[presenteIndex].cotas_disponiveis = 0;
                } else {
                    todosOsPresentes[presenteIndex].cotas_disponiveis = data.presente.cotas_disponiveis;
                }
            }
            
            renderizarPresentes(todosOsPresentes);

            const linkWhats = `${WHATSAPP_LINK_BASE}%20*${presente.nome}*`;
            
            setTimeout(() => {
                window.location.href = linkWhats; 
            }, 4000);

        } catch (error) {
            alert(error.message);
            if (btn) { btn.disabled = false; btn.textContent = 'Já paguei! Confirmar'; }
        }
    }

    function fecharModal() { modal.style.display = 'none'; }

    iniciarContagemRegressiva();
    carregarPresentes();

    closeModalBtn.addEventListener('click', fecharModal);
    window.addEventListener('click', (event) => { if (event.target == modal) { fecharModal(); } });
    
    const imagemHero = document.querySelector('.hero-imagem');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (imagemHero) { imagemHero.style.transform = `translateY(${scrollPos * 0.3}px)`; }
    });
});