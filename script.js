document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- Filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const techs = card.querySelectorAll('.tech[data-tech]');
      const match = filter === 'all' || Array.from(techs).some(t => t.dataset.tech === filter);
      card.classList.toggle('hidden', !match);
      setTimeout(() => card.classList.toggle('visible', match), 50);
    });
  });
});

// --- Modal ---
const modal = document.getElementById('modal');
const modalTitle = modal.querySelector('.modal-title');
const modalBody = modal.querySelector('.modal-body');

const projectData = {
  stockflow: {
    title: 'StockFlow',
    desc: 'Sistema desktop completo para controle de estoque e movimentação de produtos, desenvolvido do zero com Electron.',
    features: [
      'Dashboard interativo com cards clicáveis',
      'CRUD completo de produtos com busca e filtros',
      'Registro de entrada e saída de estoque',
      'Relatórios em PDF gerados automaticamente',
      'Módulo financeiro com movimentações do dia',
      'Filtros por status (OK, estoque baixo, esgotado) e categoria',
      'Instalador Windows via Inno Setup'
    ],
    techs: ['Electron', 'JavaScript', 'SQLite', 'PDFKit', 'Inno Setup'],
    links: { GitHub: 'https://github.com/Lucpb1908/stockflow' }
  },
  cashly: {
    title: 'Cashly',
    desc: 'Sistema desktop de controle financeiro empresarial com dashboard gráfico e geração de relatórios.',
    features: [
      'Dashboard com gráficos de receitas e despesas (Chart.js)',
      'Cadastro de receitas, despesas e contas a receber/pagar',
      'Controle de status com cores (pendente, pago, vencido)',
      'Fluxo de caixa interativo',
      'Emissão de recibos em PDF (PDFKit)',
      'Exportação de dados para Excel (CSV)',
      'Tema escuro moderno e responsivo'
    ],
    techs: ['Electron', 'JavaScript', 'SQLite', 'PDFKit', 'Chart.js'],
    links: { GitHub: 'https://github.com/Lucpb1908/cashly' }
  }
};

function openModal(project) {
  const data = projectData[project];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalBody.innerHTML = `
    <p>${data.desc}</p>
    <ul>${data.features.map(f => `<li>${f}</li>`).join('')}</ul>
    <div class="modal-techs">${data.techs.map(t => `<span class="tech">${t}</span>`).join('')}</div>
    <div class="modal-links">${Object.entries(data.links).map(([label, url]) => `<a href="${url}" target="_blank">${label}</a>`).join('')}</div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.btn-details').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.project));
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
