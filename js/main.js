(function () {
  'use strict';

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  const catalogSection = document.getElementById('catalog');
  const catalogFilter = document.getElementById('catalog-filter');
  const catalogFilterName = document.getElementById('catalog-filter-name');
  const catalogFilterReset = document.getElementById('catalog-filter-reset');
  const catalogEmpty = document.getElementById('catalog-empty');
  const productCards = document.querySelectorAll('.product-card[data-category]');

  function applyCatalogFilter(category) {
    let visibleCount = 0;

    productCards.forEach(card => {
      const match = card.dataset.category === category;
      card.classList.toggle('product-card--hidden', !match);
      if (match) visibleCount += 1;
    });

    catalogFilterName.textContent = CATEGORY_LABELS[category] || category;
    catalogFilter.classList.add('is-visible');
    catalogEmpty.classList.toggle('is-visible', visibleCount === 0);
    history.replaceState(null, '', '#catalog-' + category);
  }

  function resetCatalogFilter() {
    productCards.forEach(card => card.classList.remove('product-card--hidden'));
    catalogFilter.classList.remove('is-visible');
    catalogEmpty.classList.remove('is-visible');
    history.replaceState(null, '', '#catalog');
  }

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      applyCatalogFilter(card.dataset.category);
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  catalogFilterReset.addEventListener('click', resetCatalogFilter);

  function handleCatalogHash() {
    const match = window.location.hash.match(/^#catalog-(classic|selective|premium)$/);
    if (match) applyCatalogFilter(match[1]);
  }

  window.addEventListener('hashchange', handleCatalogHash);
  handleCatalogHash();

  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function updateThemeLabel(isDark) {
    themeToggle.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
    themeToggle.setAttribute('title', isDark ? 'Светлая тема' : 'Тёмная тема');
  }

  function setTheme(isDark) {
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('charm-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('charm-theme', 'light');
    }
    updateThemeLabel(isDark);
  }

  updateThemeLabel(root.getAttribute('data-theme') === 'dark');
  themeToggle.addEventListener('click', () => setTheme(root.getAttribute('data-theme') !== 'dark'));

  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = mobileNav.querySelectorAll('a');

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  menuToggle.addEventListener('click', () => {
    if (mobileNav.classList.contains('is-open')) closeMobileNav();
    else openMobileNav();
  });

  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  const toast = document.getElementById('toast');

  function showToast(message, type) {
    toast.textContent = message;
    toast.className = 'toast toast--' + (type || 'success') + ' is-visible';
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove('is-visible'), 4000);
  }

  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  function validatePhone(value) {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10;
  }

  function setFieldError(input, message) {
    const group = input.closest('.form-group');
    const errorEl = group.querySelector('.form-error');
    group.classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, 'Укажите ваше имя');
      valid = false;
    } else setFieldError(nameInput, '');

    if (!validatePhone(phoneInput.value)) {
      setFieldError(phoneInput, 'Введите корректный номер телефона');
      valid = false;
    } else setFieldError(phoneInput, '');

    if (!valid) return;

    const lead = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      message: messageInput.value.trim(),
      date: new Date().toISOString()
    };

    const leads = JSON.parse(localStorage.getItem('charm-leads') || '[]');
    leads.push(lead);
    localStorage.setItem('charm-leads', JSON.stringify(leads));

    contactForm.reset();
    showToast('Спасибо! Мы свяжемся с вами в ближайшее время.');
  });

  [nameInput, phoneInput].forEach(input => {
    input.addEventListener('input', () => setFieldError(input, ''));
  });

  const productModal = document.getElementById('product-modal');
  const productModalOverlay = document.getElementById('product-modal-overlay');
  const productModalClose = document.getElementById('product-modal-close');
  const productModalTitle = document.getElementById('product-modal-title');
  const productModalMotive = document.getElementById('product-modal-motive');
  const productModalNotes = document.getElementById('product-modal-notes');
  const productModalMood = document.getElementById('product-modal-mood');
  const productModalDesc = document.getElementById('product-modal-desc');
  const productModalVolumes = document.getElementById('product-modal-volumes');
  const productModalOrder = document.getElementById('product-modal-order');

  let currentProductId = null;

  function openProductModal(productId) {
    const product = PRODUCTS[productId];
    if (!product) return;

    currentProductId = productId;
    productModalTitle.textContent = product.name;
    productModalMotive.textContent = product.motive;
    productModalNotes.textContent = product.notes;
    productModalMood.textContent = product.mood;
    productModalDesc.textContent = product.description;
    productModalVolumes.innerHTML = product.volumes
      .map(v => '<li>' + v + '</li>')
      .join('');

    productModal.classList.add('is-open');
    productModalOverlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    productModalClose.focus();
  }

  function closeProductModal() {
    productModal.classList.remove('is-open');
    productModalOverlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    currentProductId = null;
  }

  document.querySelectorAll('.product-card__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.product-card');
      openProductModal(card.dataset.product);
    });
  });

  productModalClose.addEventListener('click', closeProductModal);
  productModalOverlay.addEventListener('click', closeProductModal);

  productModalOrder.addEventListener('click', () => {
    const product = PRODUCTS[currentProductId];
    if (!product) return;
    closeProductModal();
    messageInput.value = 'Хочу заказать аромат «' + product.name + '». ' + (messageInput.value || '');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    nameInput.focus();
  });

  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizProgress = document.getElementById('quiz-progress');
  const quizPrev = document.getElementById('quiz-prev');
  const quizNext = document.getElementById('quiz-next');
  const quizResult = document.getElementById('quiz-result');
  const quizResultText = document.getElementById('quiz-result-text');
  const quizResultBtn = document.getElementById('quiz-result-btn');
  const quizRestart = document.getElementById('quiz-restart');

  let quizCurrentStep = 0;
  const quizAnswers = { classic: 0, selective: 0, premium: 0 };

  const QUIZ_RECOMMENDATIONS = {
    classic: {
      label: 'Классика',
      text: 'Вам подойдут вечные композиции линейки «Классика» — утончённые ароматы по мотивам культовых шедевров.',
      product: 'charm-no-5'
    },
    selective: {
      label: 'Селектив',
      text: 'Обратите внимание на линейку «Селектив» — смелые нишевые интерпретации с характером.',
      product: 'velvet-noir'
    },
    premium: {
      label: 'Премиум',
      text: 'Для вас — эксклюзивная линейка «Премиум» с редкими ингредиентами и высокой концентрацией.',
      product: 'or-imperial'
    }
  };

  function updateQuizUI() {
    quizSteps.forEach((step, i) => step.classList.toggle('is-active', i === quizCurrentStep));
    quizProgress.style.width = ((quizCurrentStep + 1) / quizSteps.length * 100) + '%';
    quizPrev.disabled = quizCurrentStep === 0;
    quizNext.textContent = quizCurrentStep === quizSteps.length - 1 ? 'Результат' : 'Далее';
    quizResult.classList.remove('is-visible');
  }

  function getSelectedOption() {
    const step = quizSteps[quizCurrentStep];
    return step.querySelector('.quiz-option.is-selected');
  }

  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', () => {
      const step = option.closest('.quiz-step');
      step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('is-selected'));
      option.classList.add('is-selected');
    });
  });

  quizPrev.addEventListener('click', () => {
    if (quizCurrentStep > 0) {
      quizCurrentStep -= 1;
      updateQuizUI();
    }
  });

  quizNext.addEventListener('click', () => {
    const selected = getSelectedOption();
    if (!selected) {
      showToast('Выберите один из вариантов', 'info');
      return;
    }

    if (quizCurrentStep < quizSteps.length - 1) {
      quizCurrentStep += 1;
      updateQuizUI();
      return;
    }

    Object.keys(quizAnswers).forEach(k => { quizAnswers[k] = 0; });
    quizSteps.forEach(step => {
      const sel = step.querySelector('.quiz-option.is-selected');
      if (sel) {
        const scores = sel.dataset.scores.split(',');
        scores.forEach(s => {
          const [cat, pts] = s.split(':');
          quizAnswers[cat] = (quizAnswers[cat] || 0) + parseInt(pts, 10);
        });
      }
    });

    const winner = Object.entries(quizAnswers).sort((a, b) => b[1] - a[1])[0][0];
    const rec = QUIZ_RECOMMENDATIONS[winner];

    quizResultText.textContent = rec.text;
    quizResult.classList.add('is-visible');
    quizResultBtn.dataset.category = winner;
    quizResultBtn.dataset.product = rec.product;
  });

  quizResultBtn.addEventListener('click', () => {
    applyCatalogFilter(quizResultBtn.dataset.category);
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('quiz-result-product').addEventListener('click', () => {
    openProductModal(quizResultBtn.dataset.product);
  });

  function closeQuizResult() {
    quizResult.classList.remove('is-visible');
  }

  quizRestart.addEventListener('click', () => {
    quizCurrentStep = 0;
    Object.keys(quizAnswers).forEach(k => { quizAnswers[k] = 0; });
    document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('is-selected'));
    closeQuizResult();
    updateQuizUI();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeProductModal();
      closeQuizResult();
    }
  });

  updateQuizUI();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
