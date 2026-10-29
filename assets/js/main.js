/* ===================================================================
   ANGEL BARD LAKLO, S.Kom - EXECUTIVE PORTFOLIO (ALFARI INITIATIVE)
   Ultra-Modern Cosmic Space, 3D Lanyard, Glassmorphism & Cyberpunk
   Inspired by alfari.my.id • Tailored for Vibe Coder & Healthcare IT
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Welcome Screen Preloader
  initPreloader();

  // 2. Cosmic Space Starfield Canvas
  initStarfield();

  // 3. Falling Meteors System
  initMeteors();

  // 4. Floating Glass Navbar & Active Indicator
  initNavbar();

  // 5. 3D Interactive Lanyard ID Badge
  initLanyard3D();

  // 6. Dynamic Mouse Border Glow (Bento Cards)
  initBorderGlow();

  // 7. Spotify / Coding Vibes Audio Player
  initSpotifyPlayer();

  // 8. Tabbed Portfolio Hub (Projects, Skills, Certs)
  initPortfolioTabs();

  // 9. Architecture Code Inspector Console
  initArchitectureConsole();

  // 10. CV Modal & Printable PDF
  initCvModal();

  // 11. WhatsApp Direct Contact Form
  initContactForm();

  // 12. Bilingual Engine (ID ⇄ EN)
  initLanguageEngine();

  // 13. Typewriter Effect
  initTypewriter();
});

/* -------------------------------------------------------------------
   1. WELCOME SCREEN PRELOADER (alfari.my.id)
   ------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('welcome-preloader');
  const countEl = document.getElementById('welcome-loader-count');
  const progressFill = document.getElementById('welcome-progress-fill');
  const statusEl = document.getElementById('welcome-loader-status');

  if (!preloader || !countEl || !progressFill) return;

  const statuses = [
    'INITIALIZING CORE KERNEL...',
    'SYNCING HEALTHCARE DATA STACKS...',
    'CONFIGURING 3D LANYARD BADGE...',
    'VIBE CODING WORKFLOWS READY'
  ];

  let current = 0;
  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 8) + 4;
    if (current > 100) current = 100;

    countEl.textContent = current;
    progressFill.style.transform = `scaleX(${current / 100})`;

    const statusIndex = Math.min(Math.floor((current / 100) * statuses.length), statuses.length - 1);
    if (statusEl) statusEl.textContent = statuses[statusIndex];

    if (current >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('is-leaving');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 750);
      }, 250);
    }
  }, 45);
}

/* -------------------------------------------------------------------
   2. COSMIC STARFIELD CANVAS
   ------------------------------------------------------------------- */
function initStarfield() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const starCount = Math.floor((width * height) / 8000);
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  function renderStars() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.alpha += s.speed * s.direction;
      if (s.alpha > 0.95 || s.alpha < 0.15) {
        s.direction *= -1;
      }

      ctx.fillStyle = `rgba(240, 240, 255, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(renderStars);
  }

  renderStars();
}

/* -------------------------------------------------------------------
   3. FALLING METEORS GENERATOR
   ------------------------------------------------------------------- */
function initMeteors() {
  const container = document.getElementById('meteor-background');
  if (!container) return;

  const meteorCount = 8;
  for (let i = 0; i < meteorCount; i++) {
    const meteor = document.createElement('span');
    meteor.className = 'meteor';
    meteor.style.setProperty('--meteor-top', `${Math.random() * 80}%`);
    meteor.style.setProperty('--meteor-left', `${50 + Math.random() * 50}%`);
    meteor.style.setProperty('--meteor-duration', `${Math.random() * 4 + 4}s`);
    meteor.style.setProperty('--meteor-delay', `${Math.random() * 6}s`);
    container.appendChild(meteor);
  }
}

/* -------------------------------------------------------------------
   4. FLOATING GLASS NAVBAR & ACTIVE PILL INDICATOR
   ------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.navbar-link-item');
  const sections = document.querySelectorAll('section[id]');
  const activePill = document.getElementById('navbar-active-pill');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach(link => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
            if (activePill) {
              const rect = link.getBoundingClientRect();
              const parentRect = link.parentElement.getBoundingClientRect();
              activePill.style.width = `${rect.width}px`;
              activePill.style.transform = `translateX(${rect.left - parentRect.left}px)`;
              activePill.style.opacity = '1';
            }
          }
        });
      }
    });

    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateActiveLink);
  setTimeout(updateActiveLink, 200);

  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('navbar-mobile-toggle');
  const drawer = document.getElementById('navbar-mobile-drawer');
  const mobileLinks = document.querySelectorAll('.navbar-mobile-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('is-open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('is-open');
      });
    });
  }
}

/* -------------------------------------------------------------------
   5. 3D INTERACTIVE LANYARD ID BADGE (alfari.my.id marquee feature)
   ------------------------------------------------------------------- */
function initLanyard3D() {
  const card = document.getElementById('lanyard-badge-card');
  const container = document.getElementById('lanyard-card-container');
  const sheen = document.getElementById('lanyard-sheen');

  if (!card || !container) return;

  let isHovered = false;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;

  container.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotateX = 0;
    targetRotateY = 0;
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Calculate 3D tilt angles (max ~18 degrees)
    targetRotateX = -(y / (rect.height / 2)) * 18;
    targetRotateY = (x / (rect.width / 2)) * 18;

    // Holographic sheen position
    if (sheen) {
      const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
      const sheenY = ((e.clientY - rect.top) / rect.height) * 100;
      sheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(0,240,255,0.3) 0%, rgba(236,72,153,0.2) 35%, rgba(44,103,237,0.2) 65%, transparent 85%)`;
    }
  });

  // Smooth Physics RAF loop
  let idleTime = 0;
  function updateCardPhysics() {
    if (!isHovered) {
      idleTime += 0.02;
      // Gentle natural breeze swinging
      targetRotateY = Math.sin(idleTime) * 3.5;
      targetRotateX = Math.cos(idleTime * 0.7) * 2.5;
    }

    currentRotateX += (targetRotateX - currentRotateX) * 0.12;
    currentRotateY += (targetRotateY - currentRotateY) * 0.12;

    card.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale3d(1, 1, 1)`;

    requestAnimationFrame(updateCardPhysics);
  }

  updateCardPhysics();
}

/* -------------------------------------------------------------------
   6. DYNAMIC MOUSE BORDER GLOW (alfari.my.id bento cards)
   ------------------------------------------------------------------- */
function initBorderGlow() {
  const cards = document.querySelectorAll('.border-glow-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* -------------------------------------------------------------------
   7. REAL MUSIC / CODING VIBES AUDIO PLAYER
   Song: VENDETTA RAP — Tangkap Basah (feat. Bringin Home)
   ------------------------------------------------------------------- */
function initSpotifyPlayer() {
  const playBtn = document.getElementById('spotify-play-btn');
  const audioNavBtn = document.getElementById('navbar-audio-btn');
  const audio = document.getElementById('coding-audio-player');
  const statusDot = document.getElementById('spotify-status-dot');
  const statusText = document.getElementById('spotify-status-text');
  const albumArt = document.getElementById('spotify-album-art');
  const scrubber = document.getElementById('spotify-scrubber');
  const scrubberFill = document.getElementById('spotify-scrubber-fill');
  const curTimeEl = document.getElementById('spotify-cur-time');
  const totalTimeEl = document.getElementById('spotify-total-time');

  if (!audio) return;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updatePlayState(isPlaying) {
    if (isPlaying) {
      if (playBtn) {
        playBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
        playBtn.setAttribute('title', 'Jeda Musik');
      }
      if (audioNavBtn) {
        audioNavBtn.classList.add('is-playing');
        audioNavBtn.setAttribute('title', 'Musik Sedang Diputar: Tangkap Basah (Klik untuk Jeda)');
      }
      if (albumArt) albumArt.classList.add('is-playing');
      if (statusDot) statusDot.classList.add('is-active');
      if (statusText) statusText.textContent = 'NOW PLAYING • REAL AUDIO // VIBE CODING';
    } else {
      if (playBtn) {
        playBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        playBtn.setAttribute('title', 'Putar Musik Nyata');
      }
      if (audioNavBtn) {
        audioNavBtn.classList.remove('is-playing');
        audioNavBtn.setAttribute('title', 'Putar Musik Pengiring Vibe Coding');
      }
      if (albumArt) albumArt.classList.remove('is-playing');
      if (statusDot) statusDot.classList.remove('is-active');
      if (statusText) statusText.textContent = 'PAUSED // KLIK PLAY UNTUK MEMUTAR';
    }
  }

  function toggleAudio() {
    if (audio.paused) {
      audio.play().then(() => {
        updatePlayState(true);
      }).catch(err => {
        console.warn('Playback error / user gesture needed:', err);
      });
    } else {
      audio.pause();
      updatePlayState(false);
    }
  }

  if (playBtn) playBtn.addEventListener('click', toggleAudio);
  if (audioNavBtn) audioNavBtn.addEventListener('click', toggleAudio);

  // Time & Progress update
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    if (scrubberFill) scrubberFill.style.width = `${progress}%`;
    if (curTimeEl) curTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    if (totalTimeEl && audio.duration) {
      totalTimeEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play().catch(() => updatePlayState(false));
  });

  // Interactive scrubber seek
  if (scrubber) {
    scrubber.addEventListener('click', (e) => {
      const rect = scrubber.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const pct = Math.max(0, Math.min(1, clickX / width));
      if (audio.duration) {
        audio.currentTime = pct * audio.duration;
      }
    });
  }
}

/* -------------------------------------------------------------------
   8. TABBED PORTFOLIO HUB (Projects, Skills, Certificates)
   ------------------------------------------------------------------- */
function initPortfolioTabs() {
  const tabBtns = document.querySelectorAll('.portfolio-tab-btn');
  const panels = document.querySelectorAll('.portfolio-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const activePanel = document.getElementById(`tab-panel-${tabTarget}`);
      if (activePanel) activePanel.classList.add('is-active');
    });
  });
}

/* -------------------------------------------------------------------
   9. ARCHITECTURE CODE INSPECTOR CONSOLE
   ------------------------------------------------------------------- */
function initArchitectureConsole() {
  const tabs = document.querySelectorAll('.console-tab');
  const codes = document.querySelectorAll('.console-code');
  const copyBtn = document.getElementById('console-copy-btn');
  const telemetry = document.getElementById('console-telemetry-text');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      codes.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const activeCode = document.getElementById(`code-${target}`);
      if (activeCode) activeCode.classList.add('active');

      if (telemetry) {
        const lat = Math.floor(Math.random() * 8) + 8;
        telemetry.textContent = `Architecture Validated • Latency: ${lat}ms • Memory: 14.2MB`;
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const activeCode = document.querySelector('.console-code.active code');
      if (activeCode) {
        navigator.clipboard.writeText(activeCode.innerText).then(() => {
          showToast('Snippet kode berhasil disalin ke clipboard!');
        });
      }
    });
  }
}

/* -------------------------------------------------------------------
   10. CV DIGITAL MODAL & PRINT HANDLER
   ------------------------------------------------------------------- */
function initCvModal() {
  const openBtns = document.querySelectorAll('.btn-open-cv');
  const modal = document.getElementById('cv-modal');
  const closeBtn = document.getElementById('cv-close-btn');

  function open() {
    if (modal) modal.classList.add('active');
  }

  function close() {
    if (modal) modal.classList.remove('active');
  }

  openBtns.forEach(btn => btn.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }
}

/* -------------------------------------------------------------------
   11. WHATSAPP DIRECT CONTACT FORM
   ------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value || 'Klien / Rekruter';
    const email = document.getElementById('form-email')?.value || '-';
    const subject = document.getElementById('form-subject')?.value || 'Konsultasi Vibe Coding / Healthcare IT';
    const message = document.getElementById('form-message')?.value || 'Halo Angel Bard Laklo, saya tertarik berdiskusi.';

    const fullMessage = `Halo Angel Bard Laklo, S.Kom!%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Topik:* ${encodeURIComponent(subject)}%0A%0A*Pesan:*%0A${encodeURIComponent(message)}`;
    const url = `https://wa.me/6285333921117?text=${fullMessage}`;

    window.open(url, '_blank');
  });

  // Direct copy email buttons
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('bardlaklo04@gmail.com').then(() => {
        showToast('Email bardlaklo04@gmail.com berhasil disalin!');
      });
    });
  }
}

/* -------------------------------------------------------------------
   12. BILINGUAL ENGINE (ID ⇄ EN)
   ------------------------------------------------------------------- */
const translations = {
  id: {
    nav_about: 'Tentang',
    nav_arch: 'Arsitektur',
    nav_portfolio: 'Portofolio',
    nav_experience: 'Pengalaman',
    nav_contact: 'Kontak',
    nav_cv: 'CV Digital',

    hero_status: 'AVAILABLE FOR COLLABORATION // VIBE CODER',
    hero_greeting: 'Halo, Saya',
    hero_desc: 'Sarjana Komputer (S.Kom) & Vibe Coder yang memadukan intuisi teknis, logika sistem informasi kesehatan (SIMRS), dan alur kerja AI modern untuk membangun aplikasi berkecepatan tinggi, bersih, dan solutif.',
    hero_btn_projects: 'Jelajahi Karya',
    hero_btn_cv: 'Buka CV Digital',
    hero_btn_contact: 'WhatsApp Langsung',

    lanyard_tag: 'VIBE CODER // HEALTHCARE IT',
    lanyard_status: 'ACTIVE ON AIR',

    arch_badge: 'Live Code Inspector & System Architecture',
    arch_title: 'Arsitektur Sistem & Forensik Kode Riil',
    arch_desc: 'Inspeksi langsung cuplikan arsitektur sistem: forensik SIMRS, frontend React modern, gateway WebService Laravel, hingga antrean mobile Flutter.',

    about_badge: 'Filosofi & Keahlian',
    about_title: 'Evolusi Menuju Vibe Coding Modern',
    about_desc: 'Mewujudkan ide menjadi aplikasi nyata secara cepat melalui kolaborasi intuisi manusia dan akselerasi AI modern.',
    about_story_title: 'Kenapa Memilih Pendekatan Vibe Coding?',
    about_story_p1: 'Sebagai Sarjana Komputer (S.Kom), saya melihat bahwa cara membangun perangkat lunak telah bertransformasi. Vibe Coding adalah metode modern di mana saya memegang kendali penuh atas visi, logika sistem, dan arsitektur solusi, sementara AI menjadi akselerator penulisan kode yang sangat cepat.',
    about_story_p2: 'Didukung latar belakang di bidang Sistem Informasi Rumah Sakit (SIMRS) dan investigasi bugs kritis, saya memadukan intuisi teknis di lapangan dengan kecerdasan AI untuk menghasilkan sistem yang tidak hanya cepat dibuat, tapi juga stabil, aman, dan mudah dirawat.',
    about_story_p3: 'Dari antarmuka web interaktif (React), aplikasi mobile praktis (Flutter), hingga backend andal (Laravel & PHP Native), vibe coding memungkinkan saya menghadirkan solusi fungsional 10x lebih efisien.',

    spotify_badge: 'REAL MUSIC • CODING VIBES',
    spotify_title: 'A little music. <br><span>A lot of ideas.</span>',
    spotify_desc: 'Lagu pengiring sesi Vibe Coding & perancangan arsitektur sistem: <strong>VENDETTA RAP — Tangkap Basah (feat. Bringin Home)</strong>. Musik nyata penuh energi khas Kupang, NTT.',
    spotify_link: 'Dengarkan di Spotify',

    port_badge: 'KARYA & KOMPETENSI',
    port_title: 'Portofolio Terpadu',
    port_desc: 'Kumpulan proyek unggulan, keahlian teknis terkini, dan riwayat kualifikasi profesional.',
    tab_projects: '🚀 Proyek Unggulan',
    tab_skills: '⚡ Keahlian Teknis',
    tab_certs: '📜 Sertifikasi & Akademik',

    exp_badge: 'REKAM JEJAK',
    exp_title: 'Pengalaman Profesional',
    exp_desc: 'Jejak kontribusi dalam pengembangan sistem informasi kesehatan dan kepemimpinan infrastruktur TI.',

    contact_badge: 'HUBUNGI SAYA',
    contact_title: 'Mari Terhubung & Berkolaborasi',
    contact_desc: 'Punya ide proyek, kebutuhan integrasi sistem, atau peluang kerja sama profesional? Pintu komunikasi selalu terbuka.',

    cv_badge_role: 'Vibe Coder & Healthcare IT Specialist',
    cv_summary_title: 'Ringkasan Profesional',
    cv_summary_text: 'Sarjana Komputer (S.Kom) dan Vibe Coder yang adaptif, mengombinasikan logika komputasi, investigasi SIMRS bugs, dan akselerasi workflow AI modern untuk mengembangkan solusi Web modern (React), Mobile cross-platform (Flutter), serta integrasi API & WebServices (Laravel & PHP) secara cepat, efisien, dan tepat sasaran.',
    cv_skills_title: 'Keahlian Teknis & Tools',
    cv_exp_title: 'Pengalaman Kerja',
    cv_projects_title: 'Proyek & Pencapaian Utama',
    cv_edu_title: 'Riwayat Pendidikan',
    cv_lang_title: 'Penguasaan Bahasa',
    cv_print_btn: 'Cetak / Simpan PDF'
  },
  en: {
    nav_about: 'About',
    nav_arch: 'Architecture',
    nav_portfolio: 'Portfolio',
    nav_experience: 'Experience',
    nav_contact: 'Contact',
    nav_cv: 'Digital CV',

    hero_status: 'AVAILABLE FOR COLLABORATION // VIBE CODER',
    hero_greeting: "Hello, I'm",
    hero_desc: "Computer Science graduate (S.Kom) & Vibe Coder blending technical intuition, Healthcare Information Systems (HIS) domain logic, and modern AI workflows to rapidly build clean, high-performance, and resilient digital solutions.",
    hero_btn_projects: 'Explore Work',
    hero_btn_cv: 'Open Digital CV',
    hero_btn_contact: 'WhatsApp Chat',

    lanyard_tag: 'VIBE CODER // HEALTHCARE IT',
    lanyard_status: 'ACTIVE ON AIR',

    arch_badge: 'Live Code Inspector & System Architecture',
    arch_title: 'System Architecture & Production Code Forensics',
    arch_desc: 'Live inspection of system architecture snippets: SIMRS forensics, modern React frontend, Laravel WebServices gateway, and Flutter queue mobile engine.',

    about_badge: 'Philosophy & Competencies',
    about_title: 'The Shift Towards Modern Vibe Coding',
    about_desc: 'Turning ideas into working software at high speed through human intuition and modern AI acceleration.',
    about_story_title: 'Why the Vibe Coding Approach?',
    about_story_p1: 'As a Computer Science graduate (S.Kom), I believe software development has fundamentally evolved. Vibe Coding is a modern methodology where I steer the vision, business logic, and solution architecture, while AI acts as a high-speed execution engine.',
    about_story_p2: 'Backed by experience in Hospital Information Systems (HIS/SIMRS) and critical bug hunting, I combine practical domain intuition with AI acceleration to build systems that are not only delivered fast, but also stable, secure, and maintainable.',
    about_story_p3: 'From interactive web interfaces (React), responsive mobile apps (Flutter), to robust backends (Laravel & PHP Native), vibe coding empowers me to ship functional solutions 10x more efficiently.',

    spotify_badge: 'REAL MUSIC • CODING VIBES',
    spotify_title: 'A little music. <br><span>A lot of ideas.</span>',
    spotify_desc: 'Soundtrack powering late-night Vibe Coding & system architecture sessions: <strong>VENDETTA RAP — Tangkap Basah (feat. Bringin Home)</strong>. Authentic Kupang, NTT hip-hop energy.',
    spotify_link: 'Listen on Spotify',

    port_badge: 'CREATIVE WORKS & SKILLS',
    port_title: 'Unified Portfolio Hub',
    port_desc: 'Featured software engineering projects, modern tech competencies, and academic credentials.',
    tab_projects: '🚀 Featured Projects',
    tab_skills: '⚡ Technical Skills',
    tab_certs: '📜 Certifications & Honors',

    exp_badge: 'TRACK RECORD',
    exp_title: 'Professional Experience',
    exp_desc: 'Proven leadership in healthcare information technology and enterprise system deployments.',

    contact_badge: 'GET IN TOUCH',
    contact_title: "Let's Connect & Collaborate",
    contact_desc: 'Have a project idea, system integration challenge, or professional partnership opportunity? Let us connect.',

    cv_badge_role: 'Vibe Coder & Healthcare IT Specialist',
    cv_summary_title: 'Professional Summary',
    cv_summary_text: 'Computer Science graduate (S.Kom) and agile Vibe Coder, merging computational logic, SIMRS bug hunting, and modern AI acceleration workflows to rapidly build modern Web (React), cross-platform Mobile (Flutter), and API/WebServices (Laravel & PHP) solutions with efficiency and precision.',
    cv_skills_title: 'Technical Skills & Competencies',
    cv_exp_title: 'Work Experience',
    cv_projects_title: 'Key Projects & Impact',
    cv_edu_title: 'Education & Qualifications',
    cv_lang_title: 'Languages',
    cv_print_btn: 'Print / Save PDF'
  }
};

let currentLang = localStorage.getItem('site_lang') || 'id';

function initLanguageEngine() {
  const toggleBtn = document.getElementById('lang-toggle-btn');

  function apply(lang) {
    currentLang = lang;
    localStorage.setItem('site_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    if (toggleBtn) {
      toggleBtn.innerHTML = `🌐 ${lang.toUpperCase()}`;
    }
  }

  apply(currentLang);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = currentLang === 'id' ? 'en' : 'id';
      apply(next);
      showToast(next === 'en' ? 'Switched to English' : 'Beralih ke Bahasa Indonesia');
    });
  }
}

/* -------------------------------------------------------------------
   13. TYPEWRITER EFFECT
   ------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typed-text');
  if (!target) return;

  const roles = [
    'Vibe Coder & AI Software Builder',
    'Healthcare IT Specialist',
    'SIMRS Bug Hunter & Problem Solver',
    'React & Tailwind Web Creator',
    'Laravel & PHP Backend Builder',
    'Flutter Cross-Platform Mobile Engineer',
    'API & Enterprise WebServices Integrator'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* -------------------------------------------------------------------
   14. HELPER: TOAST NOTICE
   ------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
