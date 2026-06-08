
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY 20);
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

    revealEls.forEach(el =>
      const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        })
        window.addEventListener('scroll', reveal);

        
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
        'detalhada': 'Limpeza Detalhada',
        comercial: 'Limpeza Comercial',
        'pos-obra': 'Limpeza Pós-Obra',
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
  