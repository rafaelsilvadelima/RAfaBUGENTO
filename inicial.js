// Configurações do carrossel
const carousel_images = [
    'img/banner/03.jpg',
    'img/banner/04.png',
    'img/banner/02.png'
  ];
  let carousel_count = 0;
  let carouselInterval;
  const carouselDelay = 5000; // 5 segundos
  
  // Inicializar o carrossel
  function startCarousel() {
    carouselInterval = setInterval(rightArrow, carouselDelay);
  }
  
  // Reiniciar o temporizador do carrossel
  function resetCarousel() {
    clearInterval(carouselInterval);
    startCarousel();
  }
  
  // Atualizar o indicador ativo no carrossel
  function updateActiveIndicator() {
    document.querySelectorAll(".carousel_count li").forEach(function(element) {
      element.classList.remove("active");
    });
    document.querySelector(`.carousel_count li:nth-child(${carousel_count + 1})`).classList.add("active");
  }
  
  // Função para exibir a imagem atual do carrossel
  function showCurrentImage() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.innerHTML = `<img src="${carousel_images[carousel_count]}" alt="Banner RAfaBUGENTO" class="blizer" />`;
      updateActiveIndicator();
    }
  }
  
  // Função para avançar para a próxima imagem
  function rightArrow() {
    carousel_count++;
    if (carousel_count >= carousel_images.length) { 
      carousel_count = 0; 
    }
    
    document.querySelectorAll(".carousel_arrows button").forEach(function(element) {
      element.style.opacity = "0.7";
    });
    
    const rightArrow = document.querySelector(".right_arrow");
    if (rightArrow) {
      rightArrow.style.opacity = "1";
    }
    
    showCurrentImage();
    resetCarousel();
  }
  
  // Função para voltar para a imagem anterior
  function leftArrow() {
    carousel_count--;
    if (carousel_count < 0) { 
      carousel_count = carousel_images.length - 1; 
    }
    
    document.querySelectorAll(".carousel_arrows button").forEach(function(element) {
      element.style.opacity = "0.7";
    });
    
    const leftArrow = document.querySelector(".left_arrow");
    if (leftArrow) {
      leftArrow.style.opacity = "1";
    }
    
    showCurrentImage();
    resetCarousel();
  }
  
  // Inicializar quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', function() {
    // Mostrar primeira imagem
    showCurrentImage();
    startCarousel();
    
    // Configurar eventos de pause/play do carrossel
    const header = document.querySelector("header");
    if (header) {
      header.addEventListener("mouseover", function() {
        clearInterval(carouselInterval);
      });
      
      header.addEventListener("mouseout", function() {
        startCarousel();
      });
    }
    
    // Configurar botões de navegação do carrossel
    const leftArrowBtn = document.querySelector(".left_arrow");
    const rightArrowBtn = document.querySelector(".right_arrow");
    
    if (leftArrowBtn) {
      leftArrowBtn.addEventListener("click", leftArrow);
    }
    
    if (rightArrowBtn) {
      rightArrowBtn.addEventListener("click", rightArrow);
    }
    
    // Configurar envio do formulário
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (verificarCamposObrigatorios()) {
          enviarWhatsApp();
          form.reset();
        } else {
          alert('Por favor, preencha todos os campos obrigatórios.');
        }
      });
    }
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });
  
  // Verificar se todos os campos obrigatórios foram preenchidos
  function verificarCamposObrigatorios() {
    const motivo = document.getElementById('motivo')?.value.trim();
    const nome = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const mensagem = document.getElementById('mssg')?.value.trim();
  
    return motivo && nome && email && mensagem;
  }
  
  // Enviar mensagem para WhatsApp
  function enviarWhatsApp() {
    const motivo = document.getElementById('motivo').value;
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mssg').value;
  
    const textoWhatsApp = `Olá RAfaBUGENTO meu nome é ${nome}.\nMeu email é ${email} e vim pelo formulário do site, segue abaixo a minha mensagem:\n${mensagem}`;
    const numeroWhatsApp = "5512982241144";
  
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(textoWhatsApp)}`;
    window.open(url, '_blank');
  }
  
  // Proteção de conteúdo
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  }, false);
  
  // Impedir o arrastar de imagens
  document.addEventListener('DOMContentLoaded', function() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
      img.addEventListener('dragstart', function(event) {
        event.preventDefault();
      }, false);
    });
  });