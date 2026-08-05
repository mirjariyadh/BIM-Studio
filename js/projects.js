/**
 * PROJECTS.JS - Project Data, Card Rendering, Filtering & Modal Gallery
 */

(function () {
  'use strict';

  const BASE_URL = "https://mirjariyadh.com.bd";

  const projectsData = [
    {
      id: "point-cloud-p1",
      title: "Point Cloud Model P1",
      tags: ["point-cloud"],
      desc: "A dynamic point cloud model converted into a precise 3D Revit build — capturing site layout and floor plan accuracy directly from laser-scan data.",
      link: `${BASE_URL}/point-cloud-p1.html`,
      images: [
        `${BASE_URL}/images/projects/point-cloud-p1/p1.png`,
        `${BASE_URL}/images/projects/point-cloud-p1/p2.png`
      ]
    },
    {
      id: "hvac-spa-center",
      title: "HVAC Ventilation — Spa Center",
      tags: ["mep"],
      desc: "Complete HVAC ducting system for a spa center, including isometric duct layout, sizing and structural integration modeled in Revit.",
      link: `${BASE_URL}/hvac-p1.html`,
      images: [
        `${BASE_URL}/images/projects/hvac1/p2.png`,
        `${BASE_URL}/images/projects/hvac1/p3.png`,
        `${BASE_URL}/images/projects/hvac1/p1.png`
      ]
    },
    {
      id: "the-chase-house",
      title: "The Chase House — Permit Set",
      tags: ["architectural", "autocad"],
      desc: "A full architectural permit set — from 3D massing to floor plans, elevations, sections and electrical/plumbing documentation, built for regulatory compliance.",
      link: `${BASE_URL}/the-chase-house.html`,
      images: [
        `${BASE_URL}/images/projects/the-chase-house/p0.png`,
        `${BASE_URL}/images/projects/the-chase-house/p01.png`,
        `${BASE_URL}/images/projects/the-chase-house/p4.png`
      ]
    },
    {
      id: "spa-lodge-1",
      title: "Spa Lodge 1",
      tags: ["architectural", "mep"],
      desc: "Architectural and MEP Revit model for a spa lodge, combining coordinated floor plans and elevations with full electrical, heating, water and ventilation layouts.",
      link: `${BASE_URL}/spa-lodge-1.html`,
      images: [
        `${BASE_URL}/images/projects/spa-lodge-1/spa-lodge-1-p5.png`,
        `${BASE_URL}/images/projects/spa-lodge-1/spa-lodge-1-p1.png`,
        `${BASE_URL}/images/projects/spa-lodge-1/spa-lodge-1-p3.png`
      ]
    },
    {
      id: "hotel-lodge-1",
      title: "Hotel Lodge 1",
      tags: ["architectural", "mep"],
      desc: "Multi-floor hotel lodge model pairing architectural design with electrical, heating, water and ventilation distribution coordination.",
      link: `${BASE_URL}/hotel-lodge-1.html`,
      images: [
        `${BASE_URL}/images/projects/hotel-lodge-1/p5.png`,
        `${BASE_URL}/images/projects/hotel-lodge-1/p2.png`,
        `${BASE_URL}/images/projects/hotel-lodge-1/p3.png`
      ]
    },
    {
      id: "simple-office",
      title: "The Simple Office",
      tags: ["architectural"],
      desc: "Architectural office building model — site plan, solar study, floor plans, elevations and sections, built entirely in Revit.",
      link: `${BASE_URL}/simple-office.html`,
      images: [
        `${BASE_URL}/images/projects/simple-office/p4.png`,
        `${BASE_URL}/images/projects/simple-office/p1.png`,
        `${BASE_URL}/images/projects/simple-office/p3.png`
      ]
    },
    {
      id: "eco-park-house",
      title: "Eco Park House",
      tags: ["architectural"],
      desc: "A residential house project featuring architectural 3D visualization alongside a coordinated structural framing layout.",
      link: `${BASE_URL}/eco-park.html`,
      images: [
        `${BASE_URL}/images/projects/eco-park/p3.png`,
        `${BASE_URL}/images/projects/eco-park/p1.png`,
        `${BASE_URL}/images/projects/eco-park/p4.png`
      ]
    },
    {
      id: "marple-cross-house",
      title: "Marple Cross House",
      tags: ["architectural", "autocad"],
      desc: "A complete permit-drawing set — site plan, floor layouts, elevations, sections and electrical distribution details.",
      link: `${BASE_URL}/marple-cross.html`,
      images: [
        `${BASE_URL}/images/projects/marple-cross/p4.png`,
        `${BASE_URL}/images/projects/marple-cross/p1.png`,
        `${BASE_URL}/images/projects/marple-cross/p8.png`
      ]
    }
  ];

  const tagLabels = {
    "architectural": "Architectural",
    "mep": "MEP",
    "point-cloud": "Point Cloud",
    "autocad": "AutoCAD"
  };

  function renderTagChip(tag) {
    const isAmber = tag === 'mep' || tag === 'autocad';
    const amberClass = isAmber ? ' amber' : '';
    const label = tagLabels[tag] || tag;
    return `<span class="tag-chip${amberClass}">${label}</span>`;
  }

  // DOM Elements Caching
  let grid, filterBar, backdrop, modalMainImg, modalThumbs, modalTitle, modalDesc, modalTags, modalLink, modalClose;

  function initProjects() {
    grid = document.getElementById('cardsGrid');
    filterBar = document.getElementById('filterBar');
    backdrop = document.getElementById('modalBackdrop');
    modalMainImg = document.getElementById('modalMainImg');
    modalThumbs = document.getElementById('modalThumbs');
    modalTitle = document.getElementById('modalTitle');
    modalDesc = document.getElementById('modalDesc');
    modalTags = document.getElementById('modalTags');
    modalLink = document.getElementById('modalLink');
    modalClose = document.getElementById('modalClose');

    if (!grid) return;

    renderCards();
    setupFiltering();
    setupModalListeners();
  }

  function renderCards() {
    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    projectsData.forEach((project, index) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.tags = project.tags.join(' ');
      card.dataset.index = index;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for project: ${project.title}`);

      card.innerHTML = `
        <div class="card-media">
          <img src="${project.images[0]}" alt="${project.title} preview" loading="lazy" width="400" height="300" />
          <div class="card-tags">${project.tags.map(renderTagChip).join('')}</div>
          <div class="card-overlay">
            <div class="view-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Project
            </div>
          </div>
          <div class="card-body">
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openModal(index));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(index);
        }
      });

      fragment.appendChild(card);
    });

    grid.appendChild(fragment);
  }

  function setupFiltering() {
    if (!filterBar) return;

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = grid.querySelectorAll('.card');

      cards.forEach(card => {
        const tags = card.dataset.tags.split(' ');
        const isMatch = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hide', !isMatch);
      });
    });
  }

  function openModal(index) {
    const project = projectsData[index];
    if (!project || !backdrop) return;

    modalMainImg.src = project.images[0];
    modalMainImg.alt = `${project.title} enlarged view`;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modalLink.href = project.link;
    modalTags.innerHTML = project.tags.map(renderTagChip).join('');

    modalThumbs.innerHTML = project.images.map((src, idx) => `
      <button type="button" class="modal-thumb ${idx === 0 ? 'active' : ''}" data-src="${src}" aria-label="View screenshot ${idx + 1}">
        <img src="${src}" alt="${project.title} screenshot ${idx + 1}" loading="lazy" width="64" height="48">
      </button>
    `).join('');

    const thumbs = modalThumbs.querySelectorAll('.modal-thumb');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        modalMainImg.src = thumb.dataset.src;
      });
    });

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setupModalListeners() {
    if (!backdrop) return;

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
  } else {
    initProjects();
  }
})();
