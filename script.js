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

const CONTACT_DB_KEY = 'assis-contact-draft';

function getServiceLabel(service) {
  const labels = {
    residencial: 'Limpeza Residencial',
    detalhada: 'Limpeza Detalhada',
    comercial: 'Limpeza Comercial',
    'pos-obra': 'Limpeza Pós-Obra',
    'cuidado-idosos': 'Cuidado com Idosos',
    'cuidado-animais': 'Cuidado de Animais',
    '': 'Não especificado'
  };

  return labels[service] || 'Não especificado';
}

function getContactData(scope = 'desktop') {
  const ids = scope === 'mobile'
    ? {
        name: 'mobile-name',
        email: 'mobile-email',
        phone: 'mobile-phone',
        service: 'mobile-service',
        message: 'mobile-message'
      }
    : {
        name: 'name',
        email: 'email',
        phone: 'phone',
        service: 'service',
        message: 'message'
      };

  return {
    name: document.getElementById(ids.name)?.value.trim() || '',
    email: document.getElementById(ids.email)?.value.trim() || '',
    phone: document.getElementById(ids.phone)?.value.trim() || '',
    service: document.getElementById(ids.service)?.value || '',
    message: document.getElementById(ids.message)?.value.trim() || '',
    scope
  };
}

function saveContactDraft(scope = 'desktop') {
  const data = getContactData(scope);
  const current = JSON.parse(localStorage.getItem(CONTACT_DB_KEY) || '{}');
  current[scope] = data;
  localStorage.setItem(CONTACT_DB_KEY, JSON.stringify(current));
}

function loadContactDraft(scope = 'desktop') {
  const current = JSON.parse(localStorage.getItem(CONTACT_DB_KEY) || '{}');
  const data = current[scope] || {};

  const ids = scope === 'mobile'
    ? ['mobile-name', 'mobile-email', 'mobile-phone', 'mobile-service', 'mobile-message']
    : ['name', 'email', 'phone', 'service', 'message'];

  const elements = {
    name: document.getElementById(ids[0]),
    email: document.getElementById(ids[1]),
    phone: document.getElementById(ids[2]),
    service: document.getElementById(ids[3]),
    message: document.getElementById(ids[4])
  };

  if (elements.name && data.name) elements.name.value = data.name;
  if (elements.email && data.email) elements.email.value = data.email;
  if (elements.phone && data.phone) elements.phone.value = data.phone;
  if (elements.service && data.service) elements.service.value = data.service;
  if (elements.message && data.message) elements.message.value = data.message;
}

function sendWhatsApp(scope = 'desktop') {
  const data = getContactData(scope);
  saveContactDraft(scope);

  if (!data.name || !data.phone) {
    alert('Por favor, preencha pelo menos seu nome e telefone.');
    return;
  }

  const text = `Olá! Vim pelo site e gostaria de um orçamento. 😊

*Nome:* ${data.name}
*E-mail:* ${data.email || 'Não informado'}
*Telefone:* ${data.phone}
*Serviço:* ${getServiceLabel(data.service)}
*Mensagem:* ${data.message || 'Sem mensagem adicional'}`;

  const url = `https://wa.me/5511983184154?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const desktopForm = document.querySelector('.contact-form');
  if (desktopForm) {
    desktopForm.addEventListener('input', () => saveContactDraft('desktop'));
    loadContactDraft('desktop');
  }

  const mobileForm = document.querySelector('.contact-form-mobile');
  if (mobileForm) {
    mobileForm.addEventListener('input', () => saveContactDraft('mobile'));
    loadContactDraft('mobile');
  }

  // Carrossel de serviços (Swiper)
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
