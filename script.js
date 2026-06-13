document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CONTROLE DE ESTADO: ACESSIBILIDADE
    // ==========================================
    let currentFontSize = 16;
    const bodyEl = document.body;
    
    const updateFontSize = (size) => {
        if (size >= 12 && size <= 24) {
            currentFontSize = size;
            document.documentElement.style.setProperty('--fs-body', `${currentFontSize}px`);
        }
    };

    document.getElementById('btn-increase-text').addEventListener('click', () => {
        updateFontSize(currentFontSize + 1);
    });

    document.getElementById('btn-decrease-text').addEventListener('click', () => {
        updateFontSize(currentFontSize - 1);
    });

    document.getElementById('btn-toggle-contrast').addEventListener('click', () => {
        bodyEl.classList.toggle('high-contrast');
    });

    // ==========================================
    // DATA LAYER: COMPONENTES DINÂMICOS
    // ==========================================
    const testimonialsData = [
        {
            text: "O sistema AgroForte reduziu nossa conta de fertilizantes em 22% logo na primeira safra de milho. O investimento se pagou em 4 meses.",
            author: "José Antônio Schmidt",
            meta: "Produtor de Grãos - Sorriso (MT)"
        },
        {
            text: "Eu tinha receio de usar tecnologia por achar complicado. O aplicativo deles é simples, direto ao ponto. Consigo ver o estresse hídrico direto da caminhonete.",
            author: "Ricardo Goulart",
            meta: "Fazenda Olho D'Água - Uberaba (MG)"
        },
        {
            text: "A precisão nos alertas meteorológicos salvou nossa colheita de soja antes da tempestade de granizo em novembro. Excelente serviço.",
            author: "Marcos Dunke",
            meta: "Cooperativa Agro - Cascavel (PR)"
        }
    ];

    const faqData = [
        {
            question: "Preciso ter internet boa na fazenda toda para funcionar?",
            answer: "Não. O nosso sistema coleta os dados em campo offline e sincroniza automaticamente assim que o seu dispositivo se conecta ao Wi-Fi da sede ou capta sinal de rede celular."
        },
        {
            question: "Como funciona o período de diagnóstico gratuito?",
            answer: "Um de nossos especialistas analisa os dados de satélite da sua região e faz um mapeamento inicial da saúde do solo sem compromisso. Você recebe o relatório completo."
        },
        {
            question: "Serve para propriedades de pequeno porte?",
            answer: "Com certeza. Nossos planos são baseados na quantidade de hectares mapeados, garantindo que o pequeno e o grande produtor tenham acesso à mesma tecnologia de ponta de forma justa."
        }
    ];

    // ==========================================
    // RENDER E LÓGICA DO CARROSSEL
    // ==========================================
    const track = document.getElementById('carousel-track');
    let currentIndex = 0;

    testimonialsData.forEach(t => {
        const slide = document.createElement('div');
        slide.className = 'testimonial-card';
        slide.innerHTML = `
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">${t.author}</div>
            <div class="testimonial-meta">${t.meta}</div>
        `;
        track.appendChild(slide);
    });

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    document.getElementById('carousel-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        updateCarousel();
    });

    document.getElementById('carousel-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
        updateCarousel();
    });

    // ==========================================
    // RENDER E LÓGICA DO ACORDEÃO (FAQ)
    // ==========================================
    const accordionContainer = document.getElementById('faq-accordion');

    faqData.forEach((item, index) => {
        const accItem = document.createElement('div');
        accItem.className = 'accordion-item';

        const header = document.createElement('button');
        header.className = 'accordion-header';
        header.innerHTML = `<span>${item.question}</span> <i class="fa-solid fa-chevron-down"></i>`;
        header.setAttribute('aria-expanded', 'false');

        const content = document.createElement('div');
        content.className = 'accordion-content';
        content.innerHTML = `<p style="padding: 16px 0;">${item.answer}</p>`;

        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle icone rotação
            const icon = header.querySelector('i');
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            icon.style.transition = 'transform 0.3s ease';

            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0px";
            }
        });

        accItem.appendChild(header);
        accItem.appendChild(content);
        accordionContainer.appendChild(accItem);
    });
});