document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Menu hamburger para mobile
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (menuHamburger) {
        menuHamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuHamburger.classList.toggle('active');
        });
    }

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação de elementos ao scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Primeira verificação

    // Parallax Effect no Hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Smooth Scroll com efeito
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Adiciona classe para highlight temporário
            target.classList.add('highlight');
            setTimeout(() => target.classList.remove('highlight'), 2000);
        });
    });

    // Loading Animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Filtro de produtos com animação
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    const produtoCards = document.querySelectorAll('.produto-card');

    function filterProducts(categoria) {
        produtoCards.forEach(card => {
            if (categoria === 'todos' || card.dataset.categoria === categoria) {
                card.style.opacity = '0';
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    if (categoriaBtns.length > 0) {
        categoriaBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoriaBtns.forEach(b => b.classList.remove('ativo'));
                btn.classList.add('ativo');
                filterProducts(btn.dataset.categoria);
            });
        });
    }

    // Formulário de contato
    const formularioContato = document.getElementById('formulario-contato');
    
    if (formularioContato) {
        formularioContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Pegando os dados do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Criando o link mailto com formatação melhorada
            const mailtoLink = `mailto:republicaibriza77@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(
                `Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}

--
Enviado através do formulário de contato do site da República Ibriza`
            )}`;
            
            // Abrindo o cliente de email padrão
            window.location.href = mailtoLink;
            
            // Limpando o formulário
            formularioContato.reset();
        });
    }

    // Slider functionality
    function initSlider() {
        const track = document.querySelector('.slider-track');
        const slides = document.querySelectorAll('.slide');
        const prevButton = document.querySelector('.slider-arrow.prev');
        const nextButton = document.querySelector('.slider-arrow.next');
        const dotsContainer = document.querySelector('.slider-dots');
        
        let currentSlide = 0;
        let autoplayInterval;
        const autoplayDelay = 5000;
        let isTransitioning = false;

        function nextSlide() {
            if (isTransitioning) return;
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }

        function prevSlide() {
            if (isTransitioning) return;
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        }

        function goToSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlide = index;
            track.style.transform = `translateX(-${index * 16.666}%)`;
            updateDots();
            
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }

        // Event listeners
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        function startAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, autoplayDelay);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Inicia o slider
        goToSlide(0);
        startAutoplay();
    }

    // Initialize slider
    initSlider();

    // Controle do carrossel de moradores
    function initMoradoresCarousel(tabId) {
        const container = document.querySelector(`#${tabId} .moradores-grid`);
        const cards = container.querySelectorAll('.morador-card');
        const prevBtn = document.querySelector(`#${tabId} .carousel-arrow.prev`);
        const nextBtn = document.querySelector(`#${tabId} .carousel-arrow.next`);
        let currentPosition = 0;
        const cardWidth = 280; // largura do card
        const visibleCards = 3; // Sempre mostrar 3 cards
        const totalWidth = cards.length * cardWidth;
    
        // Garante que o container tenha largura suficiente
        container.style.width = `${totalWidth}px`;
    
        // Calcula o offset inicial para centralizar os primeiros 3 cards
        const containerWidth = container.parentElement.offsetWidth - 120; // Desconta o padding das setas
        const initialOffset = (containerWidth - (cardWidth * 3)) / 2;
        container.style.marginLeft = `${initialOffset}px`;
    
        function updateCarousel() {
            container.style.transform = `translateX(-${currentPosition}px)`;
            
            // Mantém os botões sempre ativos
            prevBtn.style.opacity = "1";
            nextBtn.style.opacity = "1";
        }
    
        prevBtn.addEventListener('click', () => {
            if (currentPosition <= 0) {
                currentPosition = totalWidth - (visibleCards * cardWidth);
            } else {
                currentPosition -= cardWidth;
            }
            // Previne posições negativas
            currentPosition = Math.max(0, currentPosition);
            // Previne scroll além do limite
            currentPosition = Math.min(currentPosition, totalWidth - (visibleCards * cardWidth));
            updateCarousel();
        });
    
        nextBtn.addEventListener('click', () => {
            if (currentPosition >= totalWidth - (visibleCards * cardWidth)) {
                currentPosition = 0;
            } else {
                currentPosition += cardWidth;
            }
            // Previne posições negativas
            currentPosition = Math.max(0, currentPosition);
            // Previne scroll além do limite
            currentPosition = Math.min(currentPosition, totalWidth - (visibleCards * cardWidth));
            updateCarousel();
        });
    
        // Inicializa na posição 0 para mostrar o primeiro trio
        currentPosition = 0;
        updateCarousel();
    
        // Adiciona navegação com teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });
    }

    // Controle das tabs da casa
    const casaTabBtns = document.querySelectorAll('.casa-tabs .tab-btn');
    const casaTabContents = document.querySelectorAll('.sobre-casa .tab-content');

    if (casaTabBtns.length > 0) {
        casaTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                casaTabBtns.forEach(b => b.classList.remove('active'));
                casaTabContents.forEach(content => content.classList.remove('active'));
                
                btn.classList.add('active');
                const tabId = btn.dataset.tab;
                const content = document.querySelector(`.sobre-casa #${tabId}`);
                content.classList.add('active');
            });
        });

        // Ativa a primeira tab da casa
        casaTabBtns[0].classList.add('active');
        casaTabContents[0].classList.add('active');
    }

    // Controle das tabs da família
    const familiaTabBtns = document.querySelectorAll('.familia-tabs .tab-btn');
    const familiaTabContents = document.querySelectorAll('.familia .tab-content');

    // Inicializa o carrossel para uma tab específica
    function initTabCarousel(tabId) {
        const container = document.querySelector(`.familia #${tabId} .moradores-grid`);
        if (!container) return;

        initMoradoresCarousel(tabId);
    }

    if (familiaTabBtns.length > 0) {
        familiaTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                familiaTabBtns.forEach(b => b.classList.remove('active'));
                familiaTabContents.forEach(content => content.classList.remove('active'));
                
                btn.classList.add('active');
                const tabId = btn.dataset.tab;
                const content = document.querySelector(`.familia #${tabId}`);
                content.classList.add('active');
                
                // Reinicializa o carrossel quando a tab é alterada
                initTabCarousel(tabId);
            });
        });

        // Inicializa o carrossel da primeira tab
        const firstTabId = familiaTabBtns[0].dataset.tab;
        const firstContent = document.querySelector(`.familia #${firstTabId}`);
        firstContent.classList.add('active');
        initTabCarousel(firstTabId);
    }

    // Controle dos sliders da casa
    function initAreaSlider(slider) {
        const container = slider.querySelector('.area-fotos');
        const slides = container.querySelectorAll('img');
        const prevBtn = slider.querySelector('.carousel-arrow.prev');
        const nextBtn = slider.querySelector('.carousel-arrow.next');
        let currentSlide = 0;
    
        function updateSlider() {
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Atualiza estado dos botões
            prevBtn.style.opacity = currentSlide <= 0 ? "0.5" : "1";
            nextBtn.style.opacity = currentSlide >= slides.length - 1 ? "0.5" : "1";
        }
    
        prevBtn.addEventListener('click', () => {
            currentSlide = Math.max(currentSlide - 1, 0);
            updateSlider();
        });
    
        nextBtn.addEventListener('click', () => {
            currentSlide = Math.min(currentSlide + 1, slides.length - 1);
            updateSlider();
        });
    
        updateSlider();
    }

    // Inicializa todos os sliders de áreas
    document.querySelectorAll('.area-slider').forEach(slider => {
        initAreaSlider(slider);
    });
});