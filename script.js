(() => {
  const WHATSAPP_NUMBER = '5511983184154';
  const PROFESSIONAL_WHATSAPP_NUMBER = '5511945982314';
  const PROFESSIONALS_KEY = 'grupo-assis-profissionais';
  const CONTACTS_KEY = 'grupo-assis-contatos';

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const toast = document.getElementById('site-toast');
  const backTop = document.querySelector('[data-back-top]');

  function showToast(message) {
    if (!toast) {
      alert(message);
      return;
    }

    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 4200);
  }

  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('[data-close-menu]').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!header || header.contains(event.target)) return;
      closeMenu();
    });
  }

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  document.querySelectorAll('[data-phone]').forEach((input) => {
    input.addEventListener('input', () => {
      input.value = formatPhone(input.value);
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  function updateScrollState() {
    const scrolled = window.scrollY > 16;
    header?.classList.toggle('scrolled', scrolled);
    backTop?.classList.toggle('visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-nav a')];

  function updateActiveNav() {
    let active = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) {
        active = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  function formDataToObject(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function lockSectionPage(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (!section) return;

    document.body.classList.add('work-form-open');
    section.classList.add('is-fixed');

    requestAnimationFrame(() => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'auto' });
    });
  }

  document.querySelectorAll('a[href="#work-with-us"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      lockSectionPage('work-with-us');
    });
  });

  document.querySelectorAll('a[href="#contact"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      lockSectionPage('contact');
    });
  });

  document.querySelectorAll('[data-back-home]').forEach((button) => {
    button.addEventListener('click', () => {
      document.body.classList.remove('work-form-open');
      document.querySelectorAll('.is-fixed').forEach((el) => el.classList.remove('is-fixed'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  function readStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      return [];
    }
  }

  function saveLead(key, lead) {
    const leads = readStorage(key);
    leads.unshift({ ...lead, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(leads.slice(0, 20)));
  }

  function validateLead(data) {
    if (!data.name?.trim() || !data.phone?.trim()) {
      showToast('Preencha pelo menos nome e telefone para enviarmos o retorno.');
      return false;
    }
    return true;
  }

  function buildProfessionalWhatsAppMessage(data) {
    return [
      'Olá! Vim pelo site do Grupo Assis e quero fazer parte da equipe.',
      '',
      `Nome: ${data.name || 'Não informado'}`,
      `E-mail: ${data.email || 'Não informado'}`,
      `Telefone: ${data.phone || 'Não informado'}`,
      `Local: ${data.location || 'Não informado'}`,
      `Serviço: ${data.service || 'Não informado'}`,
      `Mensagem: ${data.message || 'Sem mensagem adicional'}`
    ].join('\n');
  }

  document.querySelectorAll('[data-work-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = formDataToObject(form);
      if (!validateLead(data)) return;

      saveLead(PROFESSIONALS_KEY, data);
      showToast('Cadastro enviado! Estamos abrindo o WhatsApp para continuar.');
      const url = `https://wa.me/${PROFESSIONAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildProfessionalWhatsAppMessage(data))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      form.reset();
    });
  });

  function buildWhatsAppMessage(data) {
    return [
      'Olá! Vim pelo site do Grupo Assis e quero contratar um serviço.',
      '',
      `Nome: ${data.name || 'Não informado'}`,
      `E-mail: ${data.email || 'Não informado'}`,
      `Telefone: ${data.phone || 'Não informado'}`,
      `Local: ${data.location || 'Não informado'}`,
      `Serviço: ${data.service || 'Não informado'}`,
      `Prazo: ${data.urgency || 'Não informado'}`,
      `Mensagem: ${data.message || 'Sem mensagem adicional'}`
    ].join('\n');
  }

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = formDataToObject(form);
      if (!validateLead(data)) return;

      saveLead(CONTACTS_KEY, data);
      showToast('Solicitação enviada! Entraremos em contato e abriremos o WhatsApp para agilizar.');
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      form.reset();
    });
  });

  function renderStars(value) {
    const total = Math.max(1, Math.min(5, Number(value) || 5));
    return '★'.repeat(total) + '☆'.repeat(5 - total);
  }

  document.querySelectorAll('[data-feedback-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = formDataToObject(form);
      const comment = data.comment?.trim();
      const rating = Number(data.stars || 5);

      if (!comment) {
        showToast('Escreva seu comentário para enviar o feedback.');
        return;
      }

      const list = document.querySelector('[data-feedback-list]');
      if (!list) return;

      const article = document.createElement('article');
      article.className = 'feedback-card feedback-card--new';
      article.innerHTML = `
        <strong>Seu feedback</strong>
        <p>${comment}</p>
        <p class="feedback-stars">${renderStars(rating)}</p>
      `;

      list.prepend(article);
      form.reset();
      showToast('Feedback enviado com sucesso!');
    });
  });

  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = formDataToObject(form);
      if (!data.email?.trim()) {
        showToast('Informe seu e-mail para se inscrever.');
        return;
      }
      showToast('Inscrição recebida. Obrigado!');
      form.reset();
    });
  });
})();

function ajustarHeader() {
  const header = document.querySelector("header");
  if (window.innerWidth <= 768) {
    header.style.position = "relative"; // mobile → não fixo
  } else {
    header.style.position = "fixed"; // desktop → fixo
    header.style.top = "0";
    header.style.width = "100%";
  }
}

window.addEventListener("resize", ajustarHeader);
ajustarHeader(); // chama ao carregar

