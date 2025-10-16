// Aguarda o DOM ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA GERAL E NAVBAR ---

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Adiciona o evento de clique para o menu hamburguer (mobile)
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Função reutilizável para mostrar notificações
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Ativa a animação de fade-in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500); // Espera a transição de fade-out terminar
        }, 3000);
    }
    
    // --- LÓGICA DA PÁGINA "mesas.html" ---

    const mesasGrid = document.getElementById('mesas-grid');
    if (mesasGrid) {
        // Busca os dados do arquivo JSON local
        fetch('./mesas.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Limpa qualquer conteúdo de placeholder
                mesasGrid.innerHTML = ''; 
                
                // Itera sobre cada mesa e cria o card HTML
                data.forEach(mesa => {
                    const card = document.createElement('div');
                    card.className = 'mesa-card';
                    card.innerHTML = `
                        <h3>${mesa.nome}</h3>
                        <p class="info">Sistema: <span>${mesa.sistema}</span></p>
                        <p class="info">Mestre: <span>${mesa.mestre}</span></p>
                        <p class="info">Vagas: <span>${mesa.vagas}</span></p>
                        <p>${mesa.descricao}</p>
                        <a href="#" class="btn btn-join" data-mesa-nome="${mesa.nome}">Pedir para entrar</a>
                    `;
                    mesasGrid.appendChild(card);
                });

                // Adiciona os eventos de clique AOS botões DEPOIS de criá-los
                document.querySelectorAll('.btn-join').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault(); // Impede o link de navegar
                        const nomeMesa = e.target.getAttribute('data-mesa-nome');
                        showNotification(`Você pediu para entrar na mesa "${nomeMesa}"! O mestre será notificado.`);
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao buscar as mesas:', error);
                mesasGrid.innerHTML = '<p>Não foi possível carregar as mesas. Tente novamente mais tarde.</p>';
            });
    }

    // --- LÓGICA DA PÁGINA "criar.html" ---

    const criarMesaForm = document.getElementById('criar-mesa-form');
    if (criarMesaForm) {
        criarMesaForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previne o envio real do formulário
            
            showNotification('Mesa criada com sucesso! Redirecionando...');
            
            // Redireciona para a página de mesas após 2 segundos
            setTimeout(() => {
                window.location.href = 'mesas.html';
            }, 2000);
        });
    }
});