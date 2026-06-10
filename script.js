// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
    closeMenu();
  }
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a, .mobile-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--blue-light)';
      a.style.background = 'var(--gray-light)';
    }
  });
});

// Phone mask
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length <= 11) {
      v = v.replace(/^(\d{2})(\d)/, '($1) $2');
      v = v.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }
    e.target.value = v;
  });
}

// WhatsApp send
function sendWhatsApp() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  const serviceLabels = {
    residencial: 'Limpeza Residencial',
    detalhada: 'Limpeza Detalhada',
    comercial: 'Limpeza Comercial',
    'pos-obra': 'Limpeza Pós-Obra',
    'cuidado-idosos': 'Cuidado com Idosos',
    'cuidado-animais': 'Cuidado de Animais',
    '': 'Não especificado'
  };

  if (!name || !phone) {
    alert('Por favor, preencha pelo menos seu nome e telefone.');
    return;
  }

  const text = `Olá! Vim pelo site e gostaria de um orçamento. 😊

*Nome:* ${name}
*E-mail:* ${email || 'Não informado'}
*Telefone:* ${phone}
*Serviço:* ${serviceLabels[service] || 'Não especificado'}
*Mensagem:* ${message || 'Sem mensagem adicional'}`;

  const url = `https://wa.me/5511983184154?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Carrossel de serviços (Swiper)
document.addEventListener('DOMContentLoaded', () => {
  const servicesEl = document.querySelector('.services-swiper');
  if (!servicesEl || typeof Swiper === 'undefined') return;

  new Swiper('.services-swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    slidesPerView: 1,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.services-swiper .swiper-button-next',
      prevEl: '.services-swiper .swiper-button-prev',
    },
    pagination: {
      el: '.services-swiper .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
});
