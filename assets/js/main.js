/**
 * Angel Bard Laklo, S.Kom - Interactive Bilingual Portfolio JS
 * Modern, Responsive, Fast & Accessible
 * Supports Dual Language (Indonesian 🇮🇩 / English 🇬🇧) & Dark/Light Theming
 */

// Global Language State
let currentLang = localStorage.getItem('abl_lang') || 'id';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Dark / Light Mode)
  initTheme();

  // 2. Bilingual System (ID / EN)
  initLanguage();

  // 3. Typing Animation
  initTypeWriter();

  // 4. Navigation & ScrollSpy
  initNavigation();

  // 5. Metric Number Counter
  initCounters();

  // 6. Skill Bars Animation on Scroll
  initSkillBars();

  // 7. Project Filter & Details Modal
  initProjectFeatures();

  // 8. CV Modal Viewer
  initCvModal();

  // 9. Contact Form & WhatsApp Integration
  initContactForm();

  // 10. Clipboard Copy Helper
  initClipboard();

  // 11. Interactive Architecture Code Console
  initCodeConsole();
});

/* ===================================================================
   1. THEME SWITCHER
   =================================================================== */
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('abl_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('abl_theme', next);
      updateThemeIcon(next);
      const isIndo = currentLang === 'id';
      showToast(next === 'dark' ? (isIndo ? '🌙 Mode Gelap aktif' : '🌙 Dark mode activated') : (isIndo ? '☀️ Mode Terang aktif' : '☀️ Light mode activated'));
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.innerHTML = `<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  } else {
    icon.innerHTML = `<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
  }
}

/* ===================================================================
   2. BILINGUAL DICTIONARY & SWITCHER
   =================================================================== */
const translations = {
  id: {
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_experience: "Pengalaman",
    nav_projects: "Proyek",
    nav_skills: "Keahlian",
    nav_contact: "Kontak",
    nav_chat_wa: "Chat WhatsApp",

    hero_badge: "Vibe Coder & AI-Assisted Builder",
    hero_specializing: "Spesialisasi:",
    hero_bio: "Vibe Coder bergelar Sarjana Komputer (S.Kom) dengan latar belakang kuat di bidang Healthcare Information Systems. Memanfaatkan alur kerja AI modern (vibe coding) untuk merancang, menyelesaikan bugs (SIMRS bug hunting), serta membangun aplikasi Web (React), Mobile (Flutter), dan integrasi API (Laravel & PHP) dengan eksekusi cepat, bersih, dan fungsional.",
    hero_quote: "“Eccedentesiast • Fortis Solus Stabit”",
    hero_btn_projects: "Lihat Proyek & Solusi",
    hero_btn_cv: "Buka CV Digital",
    hero_btn_contact: "Hubungi Saya",
    hero_connect: "Terhubung:",

    chip_tech: "Modern Tech Stack",
    chip_diagnostics: "System Diagnostics",
    chip_backend: "Backend Power",

    hero_console_role: "Vibe Coder • Modern AI-Driven Engineering",
    hero_console_status: "SYSTEM OPTIMAL",

    console_badge: "Vibe Coding Console & Code Inspector",
    console_heading: "Alur Vibe Coding & Forensik Kode Riil",
    console_subheading: "Eksplorasi bagaimana ide dan arsitektur dieksekusi secara nyata: dari forensik SIMRS, komponen React modern, gateway Laravel WebServices, hingga antrean mobile Flutter.",

    metric_bugs_label: "Bugs Sistem Dituntaskan",
    metric_bugs_sub: "Forensik troubleshooting & stabilisasi transaksi",
    metric_stack_label: "Tech Stacks Utama",
    metric_stack_sub: "React, Flutter, Laravel, PHP Native, CodeIgniter",
    metric_api_label: "API & WebServices",
    metric_api_sub: "Integrasi sistem, bridging & microservices",
    metric_uptime_label: "Keandalan Sistem",
    metric_uptime_sub: "Ketersediaan layanan & integritas data",

    about_tag: "Tentang Saya",
    about_title: "Filosofi Vibe Coding & Solusi Software",
    about_desc: "Mewujudkan ide menjadi aplikasi nyata secara cepat melalui kolaborasi intuisi manusia dan akselerasi AI modern.",
    about_story_title: "Kenapa Memilih Pendekatan Vibe Coding?",
    about_story_p1: "Sebagai Sarjana Komputer (S.Kom), saya melihat bahwa cara membangun perangkat lunak telah bertransformasi. Vibe Coding adalah metode modern di mana saya memegang kendali penuh atas visi, logika sistem, dan arsitektur solusi, sementara AI menjadi akselerator penulisan kode yang sangat cepat.",
    about_story_p2: "Didukung latar belakang di bidang Sistem Informasi Rumah Sakit (SIMRS) dan investigasi bugs kritis, saya memadukan intuisi teknis di lapangan dengan kecerdasan AI untuk menghasilkan sistem yang tidak hanya cepat dibuat, tapi juga stabil, aman, dan mudah dirawat.",
    about_story_p3: "Dari antarmuka web interaktif (React), aplikasi mobile praktis (Flutter), hingga backend andal (Laravel & PHP Native), vibe coding memungkinkan saya menghadirkan solusi fungsional 10x lebih efisien.",
    about_bio_title: "Biodata Singkat",
    about_bio_desc: "Informasi data diri dan kualifikasi akademik:",
    meta_name: "Nama Lengkap",
    meta_location: "Lokasi",
    meta_loc_val: "Kupang, NTT, Indonesia (Batuplat)",
    meta_education: "Pendidikan",
    meta_edu_val: "S1 Ilmu Komputer (UNWIRA)",
    meta_degree_status: "Status Gelar",
    meta_deg_val: "On track Insinyur (Ir.)",
    meta_dob: "Tanggal Lahir",
    meta_dob_val: "04 Oktober (28 Tahun)",
    meta_job_status: "Status Profesional",
    meta_job_val: "Terbuka untuk Kolaborasi",
    about_spec_title: "Fokus & Keahlian Vibe Coding",
    about_spec_desc: "Mengombinasikan pemecahan bugs, pembuatan aplikasi web modern, mobile computing, dan integrasi API:",
    spec_1: "SIMRS Bug Hunting & System Troubleshooting",
    spec_2: "Frontend Modern dengan React.js & Tailwind",
    spec_3: "Backend Laravel & Script PHP Native",
    spec_4: "Pengembangan Mobile Multiplatform Flutter",
    spec_5: "Arsitektur API & Enterprise WebServices",
    spec_6: "Real-Time Systems (WebSocket) & Bot Automations",
    about_motto_title: "Filosofi & Prinsip Kerja",
    about_motto_p1: "“Fortis Solus Stabit” — Kuat Berdiri Sendiri, Teguh Menghadapi Tantangan. Di dunia rekayasa perangkat lunak, keandalan dan integritas sistem adalah prioritas mutlak.",
    about_motto_p2: "Setiap baris kode, query database, dan endpoint API dirancang dengan pertimbangan keamanan tinggi, skalabilitas, dan efisiensi performa.",

    exp_tag: "Jejak Langkah",
    exp_title: "Pengalaman & Riwayat Pendidikan",
    exp_desc: "Rekam jejak kepemimpinan teknis dan kontribusi nyata dalam pengembangan sistem informasi.",
    exp_btn_cv: "Pratinjau & Cetak Curriculum Vitae (CV)",
    timeline_work_title: "Pengalaman Profesional",
    timeline_edu_title: "Pendidikan & Kualifikasi",
    role_1_badge: "Sekarang / Present",
    role_1_title: "Head of Infrastructure & System Development Unit",
    role_1_org: "Healthcare Information Technology Division",
    role_1_desc: "Bertanggung jawab penuh memimpin, merencanakan, mengimplementasikan, dan mengendalikan infrastruktur teknologi informasi serta pengembangan sistem terpadu guna memastikan layanan IT yang aman, andal, dan efisien.",
    role_2_badge: "2023 - 2024",
    role_2_title: "Head of Hospital Information System Installation",
    role_2_org: "Hospital Systems Division",
    role_2_desc: "Memimpin koordinasi dan supervisi proses instalasi, kustomisasi konfigurasi, serta deployment Sistem Informasi Manajemen Rumah Sakit (SIMRS) di seluruh modul operasional.",
    role_3_badge: "2022 - 2023",
    role_3_title: "Person In Charge (PIC) of HIS Installation",
    role_3_org: "Hospital Systems Division",
    role_3_desc: "Menjadi penanggung jawab teknis dalam integrasi dan operasional harian SIMRS, memastikan alur data dan stabilitas sistem berjalan optimal.",
    role_4_badge: "2022 - 2025",
    role_4_title: "IT Specialist & System Support",
    role_4_org: "Information Technology Unit",
    role_4_desc: "Mengembangkan aplikasi web dan mobile berbasis CodeIgniter, Laravel, Android Studio & Flutter, integrasi API sistem, pemeliharaan basis data, serta riset WebSocket real-time dan bot WhatsApp.",
    edu_1_title: "Bachelor of Computer Science (S.Kom)",
    edu_1_org: "Universitas Katolik Widya Mandira (UNWIRA)",
    edu_1_desc: "Konsentrasi Bidang: Mobile Computing & Software Engineering. Menyelesaikan studi Sarjana Ilmu Komputer dengan IPK 3.30.",
    edu_2_title: "Program Profesi Insinyur (Ir.)",
    edu_2_org: "Informatika / Computer Science Track",
    edu_2_desc: "Melanjutkan peningkatan kompetensi profesional keinsinyuran untuk sertifikasi gelar Insinyur (Ir.).",
    edu_3_title: "Kepemimpinan Teknis & Manajemen Tim",
    edu_3_org: "IT Leadership & Governance",
    edu_3_desc: "Berpengalaman memimpin tim teknis IT, manajemen proyek software, mitigasi bugs, dan standarisasi SOP teknologi.",

    projects_tag: "Portofolio Karya",
    projects_title: "Proyek Unggulan & Solusi Nyata",
    projects_desc: "Implementasi sistem informasi, integrasi API, otomatisasi bot, dan aplikasi mobile modern.",
    filter_all: "Semua Solusi",
    filter_simrs: "🐞 SIMRS & Bug Hunting",
    filter_react: "⚛️ React & Web",
    filter_laravel: "🔴 Laravel & WebService",
    filter_flutter: "📱 Flutter & Mobile",
    view_details: "Lihat Detail Arsitektur",

    skills_tag: "Keahlian Teknis",
    skills_title: "Keahlian & Teknologi Pilihan",
    skills_desc: "Penguasaan perangkat lunak, bahasa pemrograman, dan infrastruktur sistem dengan standar efisiensi industri.",
    cat_frontend: "Frontend & Modern Web",
    cat_backend: "Backend & WebServices",
    cat_mobile: "Mobile & Real-Time Tech",
    cat_diagnostics: "SIMRS & Bug Diagnostics",

    contact_tag: "Kontak & Diskusi",
    contact_title: "Mari Terhubung & Berkolaborasi",
    contact_desc: "Punya pertanyaan seputar konsultasi sistem informasi, pengembangan web/mobile, atau peluang kerja sama profesional?",
    contact_direct_title: "Hubungi Langsung",
    contact_direct_p: "Saya selalu terbuka untuk berdiskusi mengenai proyek rekayasa software, arsitektur IT, maupun konsultasi sistem.",
    channel_wa_title: "WhatsApp Langsung",
    channel_email_title: "Alamat Email",
    channel_loc_title: "Kota Domisili",
    channel_loc_val: "Batuplat, Kota Kupang, NTT",
    copy_btn: "Salin",
    social_title: "Media Sosial",
    form_title: "Kirim Pesan Instan",
    form_desc: "Formulir ini otomatis menyiapkan pesan WhatsApp terformat agar komunikasi lebih cepat dan langsung ke smartphone saya.",
    form_name_label: "Nama Lengkap *",
    form_name_placeholder: "Contoh: Budi Pratama",
    form_email_label: "Email Anda",
    form_email_placeholder: "budi@example.com",
    form_subject_label: "Topik Diskusi / Subjek",
    form_subject_placeholder: "Contoh: Konsultasi Sistem / Proyek Web & Mobile",
    form_msg_label: "Pesan Anda *",
    form_msg_placeholder: "Tuliskan kebutuhan atau detail diskusi Anda di sini...",
    form_submit: "Kirim Pesan via WhatsApp",

    cv_badge_role: "Vibe Coder & Healthcare IT Specialist",
    cv_summary_title: "Ringkasan Profesional",
    cv_summary_text: "Sarjana Komputer (S.Kom) dan Vibe Coder yang adaptif, mengombinasikan logika komputasi, investigasi SIMRS bugs, dan akselerasi workflow AI modern untuk mengembangkan solusi Web modern (React), Mobile cross-platform (Flutter), serta integrasi API & WebServices (Laravel & PHP) secara cepat, efisien, dan tepat sasaran.",
    cv_skills_title: "Keahlian Teknis & Tools",
    cv_exp_title: "Pengalaman Kerja",
    cv_projects_title: "Proyek & Pencapaian Utama",
    cv_edu_title: "Riwayat Pendidikan",
    cv_lang_title: "Penguasaan Bahasa",
    cv_print_btn: "Cetak / Simpan PDF",

    footer_motto: "Eccedentesiast • Fortis Solus Stabit",
    footer_copy: "Angel Bard Laklo, S.Kom. All Rights Reserved."
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_experience: "Experience",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_contact: "Contact",
    nav_chat_wa: "Chat WhatsApp",

    hero_badge: "Vibe Coder & AI-Assisted Builder",
    hero_specializing: "Specializing in:",
    hero_bio: "Vibe Coder holding a Bachelor's degree in Computer Science (S.Kom) with deep experience in Healthcare Information Systems. Leveraging modern AI-assisted workflows (vibe coding) to troubleshoot SIMRS bugs, conceptualize solutions, and rapidly build clean, functional Web (React), Mobile (Flutter), and API (Laravel & PHP) applications.",
    hero_quote: "“Eccedentesiast • Fortis Solus Stabit”",
    hero_btn_projects: "Explore Projects & Solutions",
    hero_btn_cv: "Open Digital CV",
    hero_btn_contact: "Contact Me",
    hero_connect: "Connect:",

    chip_tech: "Modern Tech Stack",
    chip_diagnostics: "System Diagnostics",
    chip_backend: "Backend Power",

    hero_console_role: "Vibe Coder • Modern AI-Driven Engineering",
    hero_console_status: "SYSTEM OPTIMAL",

    console_badge: "Vibe Coding Console & Code Inspector",
    console_heading: "Vibe Coding Workflow & Production Code",
    console_subheading: "Explore how ideas and architecture are brought to life: from SIMRS deadlock forensics, reactive React components, Laravel WebServices gateway, to Flutter queue engines.",

    metric_bugs_label: "System Bugs Resolved",
    metric_bugs_sub: "Forensic troubleshooting & transaction stabilization",
    metric_stack_label: "Core Tech Stacks",
    metric_stack_sub: "React, Flutter, Laravel, PHP Native, CodeIgniter",
    metric_api_label: "APIs & WebServices",
    metric_api_sub: "System bridging, integrations & microservices",
    metric_uptime_label: "System Reliability",
    metric_uptime_sub: "Service uptime & clinical data integrity",

    about_tag: "About Me",
    about_title: "Vibe Coding Philosophy & Software Solutions",
    about_desc: "Turning ideas into working software at high speed through human intuition and modern AI acceleration.",
    about_story_title: "Why the Vibe Coding Approach?",
    about_story_p1: "As a Computer Science graduate (S.Kom), I believe software development has fundamentally evolved. Vibe Coding is a modern methodology where I steer the vision, business logic, and solution architecture, while AI acts as a high-speed execution engine.",
    about_story_p2: "Backed by experience in Hospital Information Systems (HIS/SIMRS) and critical bug hunting, I combine practical domain intuition with AI acceleration to build systems that are not only delivered fast, but also stable, secure, and maintainable.",
    about_story_p3: "From interactive web interfaces (React), responsive mobile apps (Flutter), to robust backends (Laravel & PHP Native), vibe coding empowers me to ship functional solutions 10x more efficiently.",
    about_bio_title: "Brief Profile",
    about_bio_desc: "Personal information and academic qualifications:",
    meta_name: "Full Name",
    meta_location: "Location",
    meta_loc_val: "Kupang, NTT, Indonesia (Batuplat)",
    meta_education: "Education",
    meta_edu_val: "B.Sc. in Computer Science (UNWIRA)",
    meta_degree_status: "Degree Status",
    meta_deg_val: "On track for Insinyur (Ir.) title",
    meta_dob: "Birth Date",
    meta_dob_val: "04 October (28 Years)",
    meta_job_status: "Professional Status",
    meta_job_val: "Open for Opportunities",
    about_spec_title: "Core Vibe Coding Pillars",
    about_spec_desc: "Combining critical bug hunting, modern web development, mobile computing, and API integration:",
    spec_1: "SIMRS Bug Hunting & System Troubleshooting",
    spec_2: "Modern Frontend with React.js & Tailwind",
    spec_3: "Backend Laravel & PHP Native Scripting",
    spec_4: "Cross-Platform Mobile with Flutter & Dart",
    spec_5: "API Architecture & Enterprise WebServices",
    spec_6: "Real-Time Systems (WebSocket) & Bot Automations",
    about_motto_title: "Philosophy & Principles",
    about_motto_p1: "“Fortis Solus Stabit” — Standing Strong Alone, Resolute Against Challenges. In software engineering, system reliability and data integrity are non-negotiable priorities.",
    about_motto_p2: "Every line of code, database query, and API endpoint is architected with a strict emphasis on high security, scalability, and execution efficiency.",

    exp_tag: "Milestones",
    exp_title: "Experience & Education History",
    exp_desc: "Track record of technical leadership and hands-on contributions to enterprise information systems.",
    exp_btn_cv: "Preview & Print Curriculum Vitae (CV)",
    timeline_work_title: "Professional Experience",
    timeline_edu_title: "Education & Qualifications",
    role_1_badge: "Present",
    role_1_title: "Head of Infrastructure & System Development Unit",
    role_1_org: "Healthcare Information Technology Division",
    role_1_desc: "Responsible for leading, planning, implementing, and controlling IT infrastructure and integrated system development to ensure secure, reliable, efficient, and sustainable services.",
    role_2_badge: "2023 - 2024",
    role_2_title: "Head of Hospital Information System Installation",
    role_2_org: "Hospital Systems Division",
    role_2_desc: "Led coordination and supervision of the installation, configuration, and deployment of Hospital Information Systems across all operational modules.",
    role_3_badge: "2022 - 2023",
    role_3_title: "Person In Charge (PIC) of HIS Installation",
    role_3_org: "Hospital Systems Division",
    role_3_desc: "Technical lead for day-to-day HIS operational integration, ensuring seamless workflow and continuous system stability.",
    role_4_badge: "2022 - 2025",
    role_4_title: "IT Specialist & System Support",
    role_4_org: "Information Technology Unit",
    role_4_desc: "Developed web and mobile applications using CodeIgniter, Laravel, Android Studio & Flutter, API system integrations, database maintenance, real-time WebSocket, and automated bots.",
    edu_1_title: "Bachelor of Computer Science (S.Kom)",
    edu_1_org: "Universitas Katolik Widya Mandira (UNWIRA)",
    edu_1_desc: "Concentration: Mobile Computing & Software Engineering. Completed Bachelor’s degree in Computer Science with GPA 3.30.",
    edu_2_title: "Engineer Professional Program (Ir.)",
    edu_2_org: "Computer Science & Informatics Track",
    edu_2_desc: "Pursuing advanced engineering professional qualifications for the Insinyur (Ir.) certification.",
    edu_3_title: "Technical Leadership & Team Management",
    edu_3_org: "IT Leadership & Governance",
    edu_3_desc: "Experienced in leading technical teams, software project management, bug mitigation, and technology standard operating procedures.",

    projects_tag: "Portfolio Showcase",
    projects_title: "Featured Projects & Solutions",
    projects_desc: "Implementation of information systems, API integrations, automated bots, and modern mobile apps.",
    filter_all: "All Solutions",
    filter_simrs: "🐞 SIMRS & Bug Hunting",
    filter_react: "⚛️ React & Web",
    filter_laravel: "🔴 Laravel & WebService",
    filter_flutter: "📱 Flutter & Mobile",
    view_details: "View Architecture Details",

    skills_tag: "Technical Arsenal",
    skills_title: "Skills & Featured Technologies",
    skills_desc: "Mastery of software frameworks, programming languages, and system infrastructure with industry performance standards.",
    cat_frontend: "Frontend & Modern Web",
    cat_backend: "Backend & WebServices",
    cat_mobile: "Mobile & Real-Time Tech",
    cat_diagnostics: "SIMRS & Bug Diagnostics",

    contact_tag: "Contact & Collaboration",
    contact_title: "Let's Connect & Collaborate",
    contact_desc: "Have inquiries regarding information systems consulting, web/mobile development, or professional collaboration opportunities?",
    contact_direct_title: "Direct Reach",
    contact_direct_p: "I am always open to discussing software engineering projects, IT architecture, and technical consulting.",
    channel_wa_title: "Direct WhatsApp",
    channel_email_title: "Email Address",
    channel_loc_title: "Location City",
    channel_loc_val: "Kupang City, NTT, Indonesia",
    copy_btn: "Copy",
    social_title: "Social Media",
    form_title: "Send Instant Message",
    form_desc: "This form formats your message directly into WhatsApp for quick and immediate communication.",
    form_name_label: "Full Name *",
    form_name_placeholder: "e.g. John Doe",
    form_email_label: "Your Email",
    form_email_placeholder: "john@example.com",
    form_subject_label: "Discussion Topic / Subject",
    form_subject_placeholder: "e.g. System Consulting / Web & Mobile Project",
    form_msg_label: "Your Message *",
    form_msg_placeholder: "Write your requirements or discussion details here...",
    form_submit: "Send Message via WhatsApp",

    cv_badge_role: "Vibe Coder & Healthcare IT Specialist",
    cv_summary_title: "Professional Summary",
    cv_summary_text: "Computer Science graduate (S.Kom) and agile Vibe Coder, merging computational logic, SIMRS bug hunting, and modern AI acceleration workflows to rapidly build modern Web (React), cross-platform Mobile (Flutter), and API/WebServices (Laravel & PHP) solutions with efficiency and precision.",
    cv_skills_title: "Technical Skills & Competencies",
    cv_exp_title: "Work Experience",
    cv_projects_title: "Key Projects & Impact",
    cv_edu_title: "Education & Qualifications",
    cv_lang_title: "Languages",
    cv_print_btn: "Print / Save PDF",

    footer_motto: "Eccedentesiast • Fortis Solus Stabit",
    footer_copy: "Angel Bard Laklo, S.Kom. All Rights Reserved."
  }
};

const typedRoles = {
  id: [
    'Vibe Coder & AI Software Builder',
    'SIMRS Bug Hunter & Problem Solver',
    'React Frontend & Tailwind Creator',
    'Laravel & PHP Backend Builder',
    'Flutter Cross-Platform Mobile Engineer',
    'API & WebServices Integrator'
  ],
  en: [
    'Vibe Coder & AI Software Builder',
    'SIMRS Bug Hunter & Problem Solver',
    'React Frontend & Tailwind Creator',
    'Laravel & PHP Backend Builder',
    'Flutter Cross-Platform Mobile Engineer',
    'API & WebServices Integrator'
  ]
};

function initLanguage() {
  const langToggle = document.getElementById('lang-toggle');
  
  // Apply current language
  applyLanguage(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'id' ? 'en' : 'id';
      localStorage.setItem('abl_lang', currentLang);
      applyLanguage(currentLang);
      showToast(currentLang === 'id' ? '🇮🇩 Bahasa Indonesia aktif' : '🇬🇧 Switched to English');
    });
  }
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.id;
  document.documentElement.setAttribute('lang', lang);

  // Update language pills in switcher
  const langIdPill = document.getElementById('lang-id');
  const langEnPill = document.getElementById('lang-en');
  if (langIdPill && langEnPill) {
    if (lang === 'id') {
      langIdPill.className = 'lang-active';
      langEnPill.className = 'lang-inactive';
    } else {
      langIdPill.className = 'lang-inactive';
      langEnPill.className = 'lang-active';
    }
  }

  // Update text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update placeholder elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Re-render code console comments in selected language
  if (typeof renderConsoleCode === 'function') {
    renderConsoleCode();
  }
}

/* ===================================================================
   3. TYPING EFFECT
   =================================================================== */
let typeTimer = null;

function initTypeWriter() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  if (typeTimer) clearTimeout(typeTimer);

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function type() {
    const activeRoles = typedRoles[currentLang] || typedRoles.id;
    const current = activeRoles[roleIdx % activeRoles.length];

    if (isDeleting) {
      typedTarget.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      typedTarget.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 1900; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % activeRoles.length;
      typingSpeed = 400; // Pause before next
    }

    typeTimer = setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   4. NAVIGATION & SCROLLSPY
   =================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ===================================================================
   5. METRICS NUMBER COUNTERS
   =================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1600; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const stepValue = target / totalSteps;

          const timer = setInterval(() => {
            count += stepValue;
            if (count >= target) {
              counter.textContent = (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (target % 1 === 0 ? Math.floor(count) : count.toFixed(1)) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) observer.observe(metricsSection);
}

/* ===================================================================
   6. SKILL BARS ON SCROLL
   =================================================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const target = bar.getAttribute('data-progress');
          bar.style.width = target;
        });
      }
    });
  }, { threshold: 0.25 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

/* ===================================================================
   7. PROJECT FILTER & DETAILS MODAL (BILINGUAL)
   =================================================================== */
const projectData = {
  'simrs-bug-hunter': {
    category: 'simrs',
    id: {
      title: 'SIMRS Bug Hunting, Forensic Diagnostics & System Optimization',
      categoryName: 'SIMRS & Bug Hunting',
      tags: ['SIMRS', 'Bug Hunting', 'Troubleshooting', 'PHP Native', 'SQL Optimization'],
      description: 'Investigasi mendalam, pencarian celah bugs, dan stabilisasi performa pada Sistem Informasi Manajemen Rumah Sakit (SIMRS). Menuntaskan deadlock database transaksi kasir, inkonsistensi billing, serta sinkronisasi rekam medis elektronik.',
      highlights: [
        'Menemukan dan menuntaskan critical bugs pada alur pendaftaran, rekam medis dan billing pasien.',
        'Melakukan profiling query SQL intensif dan restrukturisasi tabel untuk eliminasi bottle-neck.',
        'Meningkatkan reliabilitas transaksi concurrent hingga 300% saat beban puncak antrean.',
        'Menyusun SOP penanganan error dan mekanisme defensive coding untuk stabilitas jangka panjang.'
      ],
      techStack: 'PHP Native 8+, PostgreSQL, MySQL, Redis, SQL Profiler, Bash Linux'
    },
    en: {
      title: 'SIMRS Bug Hunting, Forensic Diagnostics & System Optimization',
      categoryName: 'SIMRS & Bug Diagnostics',
      tags: ['SIMRS', 'Bug Hunting', 'Troubleshooting', 'PHP Native', 'SQL Optimization'],
      description: 'In-depth investigation, bug elimination, and performance stabilization for Hospital Information Systems (HIS/SIMRS). Resolved cashier transaction database deadlocks, billing discrepancies, and electronic medical record synchronization bottlenecks.',
      highlights: [
        'Identified and resolved critical bugs across patient registration, medical records, and billing workflows.',
        'Performed intensive SQL query profiling and table restructuring to eliminate locking bottlenecks.',
        'Boosted concurrent transaction reliability by 300% during peak outpatient rush hours.',
        'Authored robust error-handling procedures and defensive coding guidelines for long-term stability.'
      ],
      techStack: 'PHP Native 8+, PostgreSQL, MySQL, Redis, SQL Profiler, Bash Linux'
    }
  },
  'react-portal': {
    category: 'react',
    id: {
      title: 'Modern Healthcare Web Application with React',
      categoryName: 'React & Web',
      tags: ['React.js', 'Tailwind CSS', 'Vibe Coding', 'SPA', 'REST API'],
      description: 'Pengembangan web portal modern dan responsif menggunakan React dan Tailwind CSS dengan alur vibe coding. Menghadirkan antarmuka pengguna interaktif, cepat, dan intuitif untuk monitoring operasional.',
      highlights: [
        'Arsitektur Single Page Application (SPA) berbasis komponen modular yang mudah di-maintain.',
        'State management reaktif dengan pembaruan data instan tanpa refresh halaman.',
        'Desain estetik modern dengan dukungan dark & light mode responsif di semua perangkat.',
        'Integrasi seamless ke backend Laravel dan WebServices menggunakan Axios & Custom Hooks.'
      ],
      techStack: 'React.js 18+, Vite, Tailwind CSS, JavaScript ES6+, Axios, React Router'
    },
    en: {
      title: 'Modern Healthcare Web Application with React',
      categoryName: 'React & Web',
      tags: ['React.js', 'Tailwind CSS', 'Vibe Coding', 'SPA', 'REST API'],
      description: 'Modern, high-performance web portal built with React and Tailwind CSS. Features interactive, fast, and responsive user interfaces for clinical monitoring and healthcare operational management.',
      highlights: [
        'Modular Single Page Application (SPA) component architecture for rapid maintenance.',
        'Reactive state management providing instant data updates without page reloads.',
        'Aesthetic modern styling with dark & light mode support fully responsive across devices.',
        'Seamless integration with Laravel backends and WebServices via Axios & Custom Hooks.'
      ],
      techStack: 'React.js 18+, Vite, Tailwind CSS, JavaScript ES6+, Axios, React Router'
    }
  },
  'laravel-webservice': {
    category: 'laravel',
    id: {
      title: 'Laravel & PHP Native Enterprise WebService Gateway',
      categoryName: 'Laravel & WebService',
      tags: ['Laravel', 'PHP Native', 'WebServices', 'RESTful API', 'Microservices'],
      description: 'Arsitektur backend berkemampuan tinggi yang memadukan ekosistem modern framework Laravel dan kecepatan eksekusi PHP Native untuk menyajikan WebServices dan API bagi ekosistem rumah sakit.',
      highlights: [
        'Penyediaan endpoint RESTful API dan WebService dengan response time di bawah 100ms.',
        'Arsitektur hybrid: fleksibilitas routing Laravel dipadukan dengan performa script PHP Native.',
        'Keamanan tingkat tinggi dengan token bearer, validasi payload ketat, dan enkripsi data.',
        'Dokumentasi API interaktif dan terstandarisasi untuk integrasi antar-aplikasi.'
      ],
      techStack: 'Laravel 11, PHP Native 8.3, Composer, MySQL/PostgreSQL, Redis Caching, Postman'
    },
    en: {
      title: 'Laravel & PHP Native Enterprise WebService Gateway',
      categoryName: 'Laravel & WebService',
      tags: ['Laravel', 'PHP Native', 'WebServices', 'RESTful API', 'Microservices'],
      description: 'High-throughput backend architecture fusing the modern Laravel framework with raw PHP Native execution speed to provide resilient WebServices and APIs for enterprise healthcare ecosystems.',
      highlights: [
        'Engineered high-speed RESTful API and WebService endpoints with sub-100ms latency.',
        'Hybrid architecture balancing Laravel routing flexibility with PHP Native execution speed.',
        'Enterprise-grade security using bearer tokens, strict payload validation, and encryption.',
        'Interactive, standardized API documentation for cross-application system integration.'
      ],
      techStack: 'Laravel 11, PHP Native 8.3, Composer, MySQL/PostgreSQL, Redis Caching, Postman'
    }
  },
  'flutter-mobile': {
    category: 'flutter',
    id: {
      title: 'Healthcare Cross-Platform Mobile App with Flutter',
      categoryName: 'Flutter & Mobile',
      tags: ['Flutter', 'Dart', 'Cross-Platform', 'Android & iOS', 'Mobile UI'],
      description: 'Aplikasi mobile multiplatform modern (Android & iOS) yang dibangun dengan Flutter dan Dart. Memudahkan pengguna memantau antrean, jadwal dokter, dan layanan kesehatan langsung dari smartphone.',
      highlights: [
        'Single codebase untuk Android dan iOS dengan animasi UI 60fps yang super mulus.',
        'State management terstruktur dengan dukungan offline data caching saat jaringan lambat.',
        'Integrasi push notification real-time (FCM) dan koneksi aman ke WebService backend.',
        'Pengalaman pengguna (UX) elegan, simpel, dan sangat mudah digunakan.'
      ],
      techStack: 'Flutter 3+, Dart, Provider/Bloc, Dio HTTP, Hive Local DB, Firebase Cloud Messaging'
    },
    en: {
      title: 'Healthcare Cross-Platform Mobile App with Flutter',
      categoryName: 'Flutter & Mobile',
      tags: ['Flutter', 'Dart', 'Cross-Platform', 'Android & iOS', 'Mobile UI'],
      description: 'Modern cross-platform mobile application (Android & iOS) engineered with Flutter and Dart. Enables patients and clinical staff to monitor queues, lab readiness, and medical schedules on the go.',
      highlights: [
        'Single codebase for Android and iOS delivering silky-smooth 60fps UI animations.',
        'Clean state management architecture with offline data caching for poor connection areas.',
        'Real-time push notifications (FCM) integrated with secure backend WebServices.',
        'Elegant, clutter-free user experience tailored for intuitive navigation.'
      ],
      techStack: 'Flutter 3+, Dart, Provider/Bloc, Dio HTTP, Hive Local DB, Firebase Cloud Messaging'
    }
  },
  'simrs-ben-mboi': {
    category: 'simrs',
    id: {
      title: 'Hospital Information System (HIS / SIMRS) Core Deployment',
      categoryName: 'SIMRS Core',
      tags: ['CodeIgniter', 'PHP', 'PostgreSQL/MySQL', 'Hospital System', 'HIS'],
      description: 'Implementasi dan pengelolaan komprehensif Sistem Informasi Manajemen Rumah Sakit (SIMRS). Mengorkestrasi digitalisasi rekam medis, rawat jalan, rawat inap, farmasi, kasir, dan alur laboratorium.',
      highlights: [
        'Memimpin instalasi dan integrasi operasional end-to-end untuk seluruh departemen klinis.',
        'Membangun protokol failover basis data tangguh menjamin uptime sistem klinis 99.9%.',
        'Memangkas waktu tunggu pasien hingga 40% melalui rekam medis terpadu dan sinkronisasi antrean.',
        'Melatih staf medis dan administrasi dalam pengoperasian sistem.'
      ],
      techStack: 'CodeIgniter 4, PHP 8+, MySQL/PostgreSQL, Redis, Apache/Nginx, Linux Server'
    },
    en: {
      title: 'Hospital Information System (HIS / SIMRS) Core Deployment',
      categoryName: 'SIMRS Core',
      tags: ['CodeIgniter', 'PHP', 'PostgreSQL/MySQL', 'Hospital System', 'HIS'],
      description: 'Comprehensive implementation and management of core Hospital Information Systems (HIS/SIMRS). Orchestrated digital electronic medical records, outpatient, inpatient, pharmacy, and billing workflows.',
      highlights: [
        'Led end-to-end installation and operational integration across all clinical departments.',
        'Architected robust database failover protocols ensuring 99.9% clinical system uptime.',
        'Reduced patient waiting times by 40% through unified digital records and queue synchronization.',
        'Trained administrative and medical staff on system operations.'
      ],
      techStack: 'CodeIgniter 4, PHP 8+, MySQL/PostgreSQL, Redis, Apache/Nginx, Linux Server'
    }
  },
  'websocket-queue': {
    category: 'react',
    id: {
      title: 'Real-Time Patient Queue & Display Synchronizer',
      categoryName: 'Real-Time Tech',
      tags: ['WebSocket', 'JavaScript', 'Node.js', 'PHP', 'Real-Time'],
      description: 'Sistem antrean publik real-time berlatensi rendah untuk poliklinik dan loket farmasi. Menggantikan pemanggilan manual dengan pemanggilan suara otomatis (TTS), layar status, dan monitor counter.',
      highlights: [
        'Pembaruan tampilan instan sub-50ms menggunakan protokol ringan WebSocket.',
        'Pemanggilan multi-ruangan dengan pengumuman suara otomatis Bahasa Indonesia & Inggris.',
        'Sinkronisasi status langsung di puluhan monitor secara serentak.',
        'Toleransi kegagalan tinggi dengan rekoneksi otomatis client saat jaringan terputus.'
      ],
      techStack: 'WebSocket, Node.js / Socket.io, JavaScript ES6+, HTML5 Audio API'
    },
    en: {
      title: 'Real-Time Patient Queue & Display Synchronizer',
      categoryName: 'Real-Time Tech',
      tags: ['WebSocket', 'JavaScript', 'Node.js', 'PHP', 'Real-Time'],
      description: 'Low-latency real-time queuing and public display system for outpatient clinics and pharmacy counters. Replaces manual calling with live WebSocket broadcast audio announcements and status monitors.',
      highlights: [
        'Sub-50ms instant display updates using lightweight WebSocket protocol.',
        'Multi-counter calling with automated text-to-speech voice announcements.',
        'Live synchronized state across dozens of public display monitors simultaneously.',
        'High fault tolerance with automatic client reconnection on network dropouts.'
      ],
      techStack: 'WebSocket, Node.js / Socket.io, JavaScript ES6+, HTML5 Audio API'
    }
  }
};

function initProjectFeatures() {
  // Tabs filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Modal setup
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const detailButtons = document.querySelectorAll('.btn-details');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const item = projectData[projectId];
      if (!item) return;

      const data = item[currentLang] || item.id;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-category').textContent = data.categoryName;
      document.getElementById('modal-desc').textContent = data.description;
      document.getElementById('modal-tech').textContent = data.techStack;

      const highlightsList = document.getElementById('modal-highlights');
      highlightsList.innerHTML = '';
      data.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        highlightsList.appendChild(li);
      });

      const tagsWrap = document.getElementById('modal-tags');
      tagsWrap.innerHTML = '';
      data.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.textContent = t;
        tagsWrap.appendChild(span);
      });

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ===================================================================
   8. CV MODAL VIEWER
   =================================================================== */
function initCvModal() {
  const openCvBtn1 = document.getElementById('open-cv-btn');
  const openCvBtn2 = document.getElementById('open-cv-btn-2');
  const cvModal = document.getElementById('cv-modal');
  const cvCloseBtn = document.getElementById('cv-close-btn');

  function openModal() {
    if (cvModal) {
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (cvModal) {
      cvModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openCvBtn1) openCvBtn1.addEventListener('click', openModal);
  if (openCvBtn2) openCvBtn2.addEventListener('click', openModal);
  if (cvCloseBtn) cvCloseBtn.addEventListener('click', closeModal);
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   9. CONTACT FORM & DIRECT WHATSAPP INTEGRATION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !message) {
      showToast(currentLang === 'id' ? '⚠️ Harap isi nama dan pesan Anda.' : '⚠️ Please enter your name and message.');
      return;
    }

    // Compose formatted WhatsApp message
    const waPhone = '6285333921117';
    const waText = encodeURIComponent(
      `*Halo Angel Bard Laklo, S.Kom!*\n\n` +
      `Saya ingin berdiskusi mengenai proyek / kolaborasi:\n` +
      `👤 *Nama:* ${name}\n` +
      `✉️ *Email:* ${email || '-'}\n` +
      `📌 *Subjek:* ${subject || 'Kolaborasi / Proyek'}\n\n` +
      `💬 *Pesan:*\n${message}\n\n` +
      `_Dikirim melalui angelbardlaklo portfolio website_`
    );

    const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

    showToast(currentLang === 'id' ? '🚀 Mengalihkan ke WhatsApp...' : '🚀 Redirecting to WhatsApp...');
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 600);
  });
}

/* ===================================================================
   10. CLIPBOARD COPY HELPER & TOAST NOTIFICATION
   =================================================================== */
function initClipboard() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(currentLang === 'id' ? `📋 Berhasil disalin: ${textToCopy}` : `📋 Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`📋 ${textToCopy}`);
        });
      }
    });
  });
}

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
  }, 3200);
}

/* ===================================================================
   11. INTERACTIVE ARCHITECTURE CODE CONSOLE (HERO)
   =================================================================== */
let activeConsoleTab = 'simrs';

const consoleSnippets = {
  simrs: {
    filename: 'SIMRS_Forensics.php',
    meta: 'PHP Native 8.3 • MySQL InnoDB • Deadlock Triage & BPJS Bridging',
    telemetry: '● Triage: 0 Deadlocks • Autocommit Latency: 3.8ms • Status: RESOLVED',
    code: (lang) => [
      { line: '01', html: '<span class="syntax-keyword">&lt;?php</span>' },
      { line: '02', html: '<span class="syntax-keyword">declare</span>(strict_types=1);' },
      { line: '03', html: '<span class="syntax-keyword">namespace</span> App\\SIMRS\\Forensics;' },
      { line: '04', html: '' },
      { line: '05', html: `<span class="syntax-comment">// ${lang === 'id' ? 'Triage deadlock transaksi billing kasir & antrean saat beban puncak' : 'Deadlock triage for cashier billing & queue transactions under peak load'}</span>` },
      { line: '06', html: '<span class="syntax-keyword">final class</span> <span class="syntax-function">SIMRSTransactionInterceptor</span> {' },
      { line: '07', html: '    <span class="syntax-keyword">public function</span> <span class="syntax-function">resolveConcurrentBilling</span>(<span class="syntax-variable">string $noRM</span>, <span class="syntax-variable">int $idPoli</span>): <span class="syntax-variable">array</span> {' },
      { line: '08', html: '        <span class="syntax-variable">$maxRetries</span> = 3; <span class="syntax-variable">$attempt</span> = 0;' },
      { line: '09', html: '        <span class="syntax-keyword">while</span> (<span class="syntax-variable">$attempt</span> &lt; <span class="syntax-variable">$maxRetries</span>) {' },
      { line: '10', html: '            <span class="syntax-keyword">try</span> {' },
      { line: '11', html: '                <span class="syntax-variable">$this</span>-&gt;<span class="syntax-variable">db</span>-&gt;<span class="syntax-function">beginTransaction</span>();' },
      { line: '12', html: `                <span class="syntax-comment">// ${lang === 'id' ? 'Lock baris pasien secara pesimistik untuk cegah tabrakan thread' : 'Pessimistic row-locking to prevent concurrent thread collisions'}</span>` },
      { line: '13', html: '                <span class="syntax-variable">$stmt</span> = <span class="syntax-variable">$this</span>-&gt;<span class="syntax-variable">db</span>-&gt;<span class="syntax-function">prepare</span>(<span class="syntax-string">"SELECT id_kunjungan FROM simrs_kunjungan WHERE no_rm = :rm FOR UPDATE"</span>);' },
      { line: '14', html: '                <span class="syntax-variable">$stmt</span>-&gt;<span class="syntax-function">execute</span>([<span class="syntax-string">\'rm\'</span> =&gt; <span class="syntax-variable">$noRM</span>]);' },
      { line: '15', html: '' },
      { line: '16', html: `                <span class="syntax-comment">// ${lang === 'id' ? 'Dispatch auto-bridging BPJS VClaim & update status billing' : 'Dispatch BPJS VClaim auto-bridging & update billing status'}</span>` },
      { line: '17', html: '                <span class="syntax-variable">$bridgeRes</span> = <span class="syntax-variable">$this</span>-&gt;<span class="syntax-function">dispatchBPJSBridging</span>(<span class="syntax-variable">$noRM</span>);' },
      { line: '18', html: '                <span class="syntax-variable">$this</span>-&gt;<span class="syntax-function">updateBillingStatus</span>(<span class="syntax-variable">$noRM</span>, <span class="syntax-string">\'PAID\'</span>);' },
      { line: '19', html: '                <span class="syntax-variable">$this</span>-&gt;<span class="syntax-variable">db</span>-&gt;<span class="syntax-function">commit</span>();' },
      { line: '20', html: '                <span class="syntax-keyword">return</span> [<span class="syntax-string">\'status\'</span> =&gt; <span class="syntax-string">\'RESOLVED\'</span>, <span class="syntax-string">\'attempts\'</span> =&gt; <span class="syntax-variable">$attempt</span> + 1];' },
      { line: '21', html: '            } <span class="syntax-keyword">catch</span> (\\Throwable <span class="syntax-variable">$e</span>) {' },
      { line: '22', html: '                <span class="syntax-variable">$this</span>-&gt;<span class="syntax-variable">db</span>-&gt;<span class="syntax-function">rollBack</span>(); <span class="syntax-variable">$attempt</span>++;' },
      { line: '23', html: `                <span class="syntax-comment">// ${lang === 'id' ? 'Exponential backoff jeda 50ms-150ms saat SQLSTATE 40001 (Deadlock)' : 'Exponential backoff delay of 50ms-150ms on SQLSTATE 40001 (Deadlock)'}</span>` },
      { line: '24', html: '                <span class="syntax-function">usleep</span>(50000 * <span class="syntax-variable">$attempt</span>);' },
      { line: '25', html: '            }' },
      { line: '26', html: '        }' },
      { line: '27', html: '        <span class="syntax-keyword">throw new</span> \\RuntimeException(<span class="syntax-string">"Deadlock auto-mitigation exceeded max retries."</span>);' },
      { line: '28', html: '    }' },
      { line: '29', html: '}' }
    ]
  },
  react: {
    filename: 'React_AntreanQueue.tsx',
    meta: 'React 19 • TypeScript • Tailwind CSS • Live WebSocket Feed',
    telemetry: '● WebSocket Feed: 128 Sockets • UI Frame: 60 FPS • Latency: 8ms',
    code: (lang) => [
      { line: '01', html: '<span class="syntax-keyword">import</span> React, { useState, useEffect, useCallback } <span class="syntax-keyword">from</span> <span class="syntax-string">\'react\'</span>;' },
      { line: '02', html: '<span class="syntax-keyword">import</span> { useWebSocket } <span class="syntax-keyword">from</span> <span class="syntax-string">\'@/hooks/useWebSocket\'</span>;' },
      { line: '03', html: '' },
      { line: '04', html: `<span class="syntax-comment">// ${lang === 'id' ? 'Display Panggilan Antrean Poliklinik & Farmasi Real-Time' : 'Real-Time Outpatient Clinic & Pharmacy Calling Display'}</span>` },
      { line: '05', html: '<span class="syntax-keyword">export const</span> <span class="syntax-function">DisplayAntreanPoli</span>: React.FC = () =&gt; {' },
      { line: '06', html: '  <span class="syntax-keyword">const</span> [activeTicket, setActiveTicket] = <span class="syntax-function">useState</span>&lt;<span class="syntax-variable">AntreanItem</span> | <span class="syntax-keyword">null</span>&gt;(<span class="syntax-keyword">null</span>);' },
      { line: '07', html: '  <span class="syntax-keyword">const</span> { lastMessage, isConnected } = <span class="syntax-function">useWebSocket</span>(<span class="syntax-string">\'/ws/antrean-live\'</span>);' },
      { line: '08', html: '' },
      { line: '09', html: `  <span class="syntax-comment">// ${lang === 'id' ? 'Sintesis audio vokal otomatis saat nomor antrean dipanggil' : 'Auto voice synthesizer trigger when queue ticket is called'}</span>` },
      { line: '10', html: '  <span class="syntax-keyword">const</span> <span class="syntax-function">triggerAudioCall</span> = <span class="syntax-function">useCallback</span>((item: <span class="syntax-variable">AntreanItem</span>) =&gt; {' },
      { line: '11', html: '    <span class="syntax-keyword">if</span> (<span class="syntax-string">\'speechSynthesis\'</span> <span class="syntax-keyword">in</span> window) {' },
      { line: '12', html: '      <span class="syntax-keyword">const</span> msg = <span class="syntax-keyword">new</span> SpeechSynthesisUtterance(`Nomor antrean ${item.nomorTiket}, menuju ${item.namaPoli}`);' },
      { line: '13', html: '      msg.lang = <span class="syntax-string">\'id-ID\'</span>; msg.rate = 0.9;' },
      { line: '14', html: '      window.speechSynthesis.<span class="syntax-function">speak</span>(msg);' },
      { line: '15', html: '    }' },
      { line: '16', html: '  }, []);' },
      { line: '17', html: '' },
      { line: '18', html: '  <span class="syntax-function">useEffect</span>(() =&gt; {' },
      { line: '19', html: '    <span class="syntax-keyword">if</span> (lastMessage?.data) {' },
      { line: '20', html: '      <span class="syntax-keyword">const</span> queueData: <span class="syntax-variable">AntreanItem</span> = JSON.<span class="syntax-function">parse</span>(lastMessage.data);' },
      { line: '21', html: '      <span class="syntax-function">setActiveTicket</span>(queueData);' },
      { line: '22', html: '      <span class="syntax-keyword">if</span> (queueData.status === <span class="syntax-string">\'DIPANGGIL\'</span>) <span class="syntax-function">triggerAudioCall</span>(queueData);' },
      { line: '23', html: '    }' },
      { line: '24', html: '  }, [lastMessage, triggerAudioCall]);' },
      { line: '25', html: '' },
      { line: '26', html: '  <span class="syntax-keyword">return</span> (' },
      { line: '27', html: '    &lt;<span class="syntax-function">div</span> <span class="syntax-variable">className</span>=<span class="syntax-string">"grid grid-cols-1 md:grid-cols-2 gap-6 p-6 font-mono"</span>&gt;' },
      { line: '28', html: '      &lt;<span class="syntax-function">QueueBox</span> <span class="syntax-variable">tiket</span>={activeTicket?.nomorTiket ?? <span class="syntax-string">\'--\'</span>} <span class="syntax-variable">poli</span>={activeTicket?.namaPoli} /&gt;' },
      { line: '29', html: '      &lt;<span class="syntax-function">StatusPill</span> <span class="syntax-variable">online</span>={isConnected} <span class="syntax-variable">label</span>=<span class="syntax-string">"WebSocket Sync Active"</span> /&gt;' },
      { line: '30', html: '    &lt;/<span class="syntax-function">div</span>&gt;' },
      { line: '31', html: '  );' },
      { line: '32', html: '};' }
    ]
  },
  laravel: {
    filename: 'Laravel_SatuSehatBridge.php',
    meta: 'Laravel 11 • RESTful API Gateway • Kemenkes SATUSEHAT Interop',
    telemetry: '● HMAC-SHA256 Validated • AES-256 Decrypted • Dispatch: 82ms',
    code: (lang) => [
      { line: '01', html: '<span class="syntax-keyword">&lt;?php</span>' },
      { line: '02', html: '<span class="syntax-keyword">declare</span>(strict_types=1);' },
      { line: '03', html: '<span class="syntax-keyword">namespace</span> App\\Http\\Controllers\\Api\\V1;' },
      { line: '04', html: '' },
      { line: '05', html: `<span class="syntax-comment">// ${lang === 'id' ? 'Gateway Interoperabilitas Kemenkes SATUSEHAT FHIR R4 & BPJS' : 'Kemenkes SATUSEHAT FHIR R4 & BPJS Interoperability Gateway'}</span>` },
      { line: '06', html: '<span class="syntax-keyword">final class</span> <span class="syntax-function">HealthcareBridgeController</span> <span class="syntax-keyword">extends</span> <span class="syntax-function">Controller</span> {' },
      { line: '07', html: '    <span class="syntax-keyword">public function</span> <span class="syntax-function">dispatchEncounter</span>(<span class="syntax-variable">Request $request</span>, <span class="syntax-variable">SatuSehatService $bridge</span>): <span class="syntax-variable">JsonResponse</span> {' },
      { line: '08', html: '        <span class="syntax-variable">$validated</span> = <span class="syntax-variable">$request</span>-&gt;<span class="syntax-function">validate</span>([' },
      { line: '09', html: '            <span class="syntax-string">\'no_rekam_medis\'</span> =&gt; <span class="syntax-string">\'required|string|size:10\'</span>,' },
      { line: '10', html: '            <span class="syntax-string">\'ihs_patient_id\'</span> =&gt; <span class="syntax-string">\'required|string\'</span>, <span class="syntax-comment">// SATUSEHAT IHS ID</span>' },
      { line: '11', html: '            <span class="syntax-string">\'timestamp\'</span>      =&gt; <span class="syntax-string">\'required|integer\'</span>,' },
      { line: '12', html: '        ]);' },
      { line: '13', html: '' },
      { line: '14', html: `        <span class="syntax-comment">// ${lang === 'id' ? 'Cache OAuth2 token terenkripsi di Redis (TTL 50 menit)' : 'Cache encrypted OAuth2 bearer token in Redis (TTL 50 mins)'}</span>` },
      { line: '15', html: '        <span class="syntax-variable">$token</span> = Cache::<span class="syntax-function">remember</span>(<span class="syntax-string">\'satusehat_token\'</span>, 3000, fn() =&gt; <span class="syntax-variable">$bridge</span>-&gt;<span class="syntax-function">requestToken</span>());' },
      { line: '16', html: '' },
      { line: '17', html: `        <span class="syntax-comment">// ${lang === 'id' ? 'Format payload standar HL7 FHIR R4 Encounter' : 'Format standard HL7 FHIR R4 Encounter payload'}</span>` },
      { line: '18', html: '        <span class="syntax-variable">$fhirPayload</span> = [' },
      { line: '19', html: '            <span class="syntax-string">\'resourceType\'</span> =&gt; <span class="syntax-string">\'Encounter\'</span>,' },
      { line: '20', html: '            <span class="syntax-string">\'status\'</span>       =&gt; <span class="syntax-string">\'in-progress\'</span>,' },
      { line: '21', html: '            <span class="syntax-string">\'subject\'</span>      =&gt; [<span class="syntax-string">\'reference\'</span> =&gt; <span class="syntax-string">\'Patient/\'</span> . <span class="syntax-variable">$validated</span>[<span class="syntax-string">\'ihs_patient_id\'</span>]],' },
      { line: '22', html: '        ];' },
      { line: '23', html: '' },
      { line: '24', html: '        <span class="syntax-variable">$response</span> = <span class="syntax-variable">$bridge</span>-&gt;<span class="syntax-function">postFHIR</span>(<span class="syntax-variable">$token</span>, <span class="syntax-variable">$fhirPayload</span>);' },
      { line: '25', html: '        <span class="syntax-keyword">return</span> <span class="syntax-function">response</span>()-&gt;<span class="syntax-function">json</span>([' },
      { line: '26', html: '            <span class="syntax-string">\'status\'</span> =&gt; 200, <span class="syntax-string">\'encounter_id\'</span> =&gt; <span class="syntax-variable">$response</span>[<span class="syntax-string">\'id\'</span>],' },
      { line: '27', html: '            <span class="syntax-string">\'latency\'</span> =&gt; <span class="syntax-function">round</span>((<span class="syntax-function">microtime</span>(<span class="syntax-keyword">true</span>) - LARAVEL_START) * 1000, 2) . <span class="syntax-string">\'ms\'</span>' },
      { line: '28', html: '        ]);' },
      { line: '29', html: '    }' },
      { line: '30', html: '}' }
    ]
  },
  flutter: {
    filename: 'Flutter_PatientQueue.dart',
    meta: 'Flutter 3.x • Dart • Bloc State Pattern • Mobile Patient Kiosk',
    telemetry: '● Reactive Bloc State • Zero Dropped Frames (60fps) • Offline Hive Cache',
    code: (lang) => [
      { line: '01', html: '<span class="syntax-keyword">import</span> <span class="syntax-string">\'package:flutter/material.dart\'</span>;' },
      { line: '02', html: '<span class="syntax-keyword">import</span> <span class="syntax-string">\'package:flutter_bloc/flutter_bloc.dart\'</span>;' },
      { line: '03', html: '' },
      { line: '04', html: `<span class="syntax-comment">// ${lang === 'id' ? 'State Management Antrean Mandiri Pasien (Mobile & Kiosk)' : 'Patient Self-Service Queue State Management (Mobile & Kiosk)'}</span>` },
      { line: '05', html: '<span class="syntax-keyword">class</span> <span class="syntax-function">PatientQueueScreen</span> <span class="syntax-keyword">extends</span> <span class="syntax-function">StatelessWidget</span> {' },
      { line: '06', html: '  <span class="syntax-keyword">const</span> <span class="syntax-function">PatientQueueScreen</span>({<span class="syntax-variable">super.key</span>});' },
      { line: '07', html: '' },
      { line: '08', html: '  <span class="syntax-keyword">@override</span>' },
      { line: '09', html: '  <span class="syntax-variable">Widget</span> <span class="syntax-function">build</span>(<span class="syntax-variable">BuildContext</span> context) {' },
      { line: '10', html: '    <span class="syntax-keyword">return</span> <span class="syntax-function">BlocProvider</span>(' },
      { line: '11', html: '      <span class="syntax-variable">create</span>: (ctx) =&gt; <span class="syntax-variable">QueueBloc</span>()..<span class="syntax-function">add</span>(<span class="syntax-keyword">const</span> <span class="syntax-function">ListenLiveQueueEvent</span>()),' },
      { line: '12', html: '      <span class="syntax-variable">child</span>: <span class="syntax-function">Scaffold</span>(' },
      { line: '13', html: '        <span class="syntax-variable">appBar</span>: <span class="syntax-function">AppBar</span>(' },
      { line: '14', html: '          <span class="syntax-variable">title</span>: <span class="syntax-keyword">const</span> <span class="syntax-function">Text</span>(<span class="syntax-string">\'Antrean Pasien Poliklinik\'</span>),' },
      { line: '15', html: '          <span class="syntax-variable">actions</span>: [' },
      { line: '16', html: '            <span class="syntax-function">IconButton</span>(<span class="syntax-variable">icon</span>: <span class="syntax-keyword">const</span> <span class="syntax-function">Icon</span>(Icons.qr_code_scanner), <span class="syntax-variable">onPressed</span>: () =&gt; <span class="syntax-function">scanCheckInQR</span>(context)),' },
      { line: '17', html: '          ],' },
      { line: '18', html: '        ),' },
      { line: '19', html: '        <span class="syntax-variable">body</span>: <span class="syntax-function">BlocConsumer</span>&lt;<span class="syntax-variable">QueueBloc</span>, <span class="syntax-variable">QueueState</span>&gt;(' },
      { line: '20', html: '          <span class="syntax-variable">listener</span>: (ctx, state) {' },
      { line: '21', html: '            <span class="syntax-keyword">if</span> (state <span class="syntax-keyword">is</span> <span class="syntax-variable">QueueTicketCalled</span>) {' },
      { line: '22', html: '              <span class="syntax-function">showCallBanner</span>(ctx, `Giliran Anda di Poli: ${state.namaPoli}`);' },
      { line: '23', html: '            }' },
      { line: '24', html: '          },' },
      { line: '25', html: '          <span class="syntax-variable">builder</span>: (ctx, state) {' },
      { line: '26', html: '            <span class="syntax-keyword">if</span> (state <span class="syntax-keyword">is</span> <span class="syntax-variable">QueueLoading</span>) <span class="syntax-keyword">return</span> <span class="syntax-keyword">const</span> <span class="syntax-function">LinearProgressIndicator</span>();' },
      { line: '27', html: '            <span class="syntax-keyword">return</span> <span class="syntax-function">ListView.builder</span>(' },
      { line: '28', html: '              <span class="syntax-variable">itemCount</span>: state.antreanList.length,' },
      { line: '29', html: '              <span class="syntax-variable">itemBuilder</span>: (_, i) =&gt; <span class="syntax-function">AntreanCard</span>(<span class="syntax-variable">item</span>: state.antreanList[i]),' },
      { line: '30', html: '            );' },
      { line: '31', html: '          },' },
      { line: '32', html: '        ),' },
      { line: '33', html: '      ),' },
      { line: '34', html: '    );' },
      { line: '35', html: '  }' },
      { line: '36', html: '}' }
    ]
  }
};

function renderConsoleCode() {
  const codeContainer = document.getElementById('console-code-body');
  const telemetryEl = document.getElementById('console-telemetry-text');
  const modeLabel = document.getElementById('console-mode-label');

  if (!codeContainer) return;

  const data = consoleSnippets[activeConsoleTab] || consoleSnippets.simrs;
  const lines = data.code(currentLang);

  const htmlLines = lines.map(item => `
    <div class="code-line">
      <span class="line-no">${item.line}</span>
      <span>${item.html}</span>
    </div>
  `).join('');

  codeContainer.innerHTML = htmlLines;

  if (telemetryEl) telemetryEl.textContent = data.telemetry;
  if (modeLabel) modeLabel.textContent = data.meta;
}

function initCodeConsole() {
  const tabs = document.querySelectorAll('.console-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      if (!target || !consoleSnippets[target]) return;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeConsoleTab = target;
      renderConsoleCode();
    });
  });

  renderConsoleCode();
}
