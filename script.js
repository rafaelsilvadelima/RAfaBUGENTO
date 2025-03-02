var carousel_count = 0;
var carousel_images = [
  'img/banner/01.png',
  'img/banner/02.png',
  'img/banner/03.jpg'
];

var looper;

function startCarousel() {
  looper = setInterval(function(){ right_arrow(); }, 3000);
}

function resetCarousel() {
  clearInterval(looper);
  startCarousel();
}

// Mostrar a primeira imagem ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.carousel').innerHTML = '<img src="' + carousel_images[carousel_count] + '" alt="" class="blizer" />';
  updateActiveIndicator();
  startCarousel();
});

document.querySelector("header").addEventListener("mouseover", function() {
  clearInterval(looper);
});

document.querySelector("header").addEventListener("mouseout", function() {
  startCarousel();
});

function right_arrow() {
  carousel_count++;
  document.querySelectorAll(".carousel_arrows").forEach(function(element) {
    element.style.opacity = "0.7";
  });
  document.querySelector(".right_arrow").style.opacity = "1";
  carousel();
  resetCarousel();
}

function left_arrow() {
  carousel_count--;
  document.querySelectorAll(".carousel_arrows").forEach(function(element) {
    element.style.opacity = "0.7";
  });
  document.querySelector(".left_arrow").style.opacity = "1";
  carousel();
  resetCarousel();
}

function carousel() {
  document.querySelectorAll(".carousel_count li").forEach(function(element) {
    element.classList.remove("active");
  });
  if (carousel_count < 0) { carousel_count = carousel_images.length - 1; }
  if (carousel_count > 2) { carousel_count = 0; }
  document.querySelector(".carousel_count li:nth-child(" + (carousel_count + 1) + ")").classList.add("active");
  document.querySelector('.carousel').innerHTML = '<img src="' + carousel_images[carousel_count] + '" alt="" class="blizer" />';
}

function updateActiveIndicator() {
  document.querySelectorAll(".carousel_count li").forEach(function(element) {
    element.classList.remove("active");
  });
  document.querySelector(".carousel_count li:nth-child(" + (carousel_count + 1) + ")").classList.add("active");
}

// -------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (verificarCamposObrigatorios()) {
          enviarWhatsApp();
      } else {
          alert('Por favor, preencha todos os campos obrigatórios.');
      }
  });
});

function verificarCamposObrigatorios() {
  const motivo = document.getElementById('motivo').value.trim();
  const nome = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mssg').value.trim();

  if (motivo && nome && email && mensagem) {
      return true;
  } else {
      return false;
  }
}

function enviarWhatsApp() {
  const motivo = document.getElementById('motivo').value;
  const nome = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mssg').value;

  const textoWhatsApp = `Olá RAfaBUGENTO meu nome é ${nome}.\n Meu email é ${email} e vim pelo formulário do site, segue abaixo a minha mensagem:\n ${mensagem}`;
  const numeroWhatsApp = "5512982241144"; // Substitua pelo número de telefone do WhatsApp (com o código do país)

  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(textoWhatsApp)}`;
  window.open(url, '_blank');
}

// --------------------------------------

// Bloquear o botão direito do mouse em toda a página
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
}, false);

// Impedir o arrastar de imagens
const imgs = document.querySelectorAll('img');
imgs.forEach(img => {
  img.addEventListener('dragstart', function (event) {
      event.preventDefault();
  }, false);
});
