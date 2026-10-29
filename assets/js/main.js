/* ===================================================================
   ANGEL BARD LAKLO, S.Kom - EXECUTIVE PORTFOLIO
   Ultra-Modern Cosmic Space, 3D Lanyard, Glassmorphism & Cyberpunk
   Tailored for Vibe Coder & Healthcare IT Specialist
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
   1. WELCOME SCREEN PRELOADER (Instant Ultra-Fast Transition)
   ------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('welcome-preloader');
  const countEl = document.getElementById('welcome-loader-count');
  const progressFill = document.getElementById('welcome-progress-fill');
  if (!preloader) return;

  function dismiss() {
    if (countEl) countEl.textContent = '100';
    if (progressFill) progressFill.style.transform = 'scaleX(1)';
    setTimeout(() => {
      preloader.classList.add('is-leaving');
      setTimeout(() => { preloader.style.display = 'none'; }, 280);
    }, 60);
  }

  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
    setTimeout(dismiss, 350); // Fallback: never block user for more than 350ms
  }
}

/* -------------------------------------------------------------------
   2. COSMIC STARFIELD CANVAS (Hardware-Accelerated 30fps Quad Blit)
   ------------------------------------------------------------------- */
function initStarfield() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const starCount = 55;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.012 + 0.004,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  let lastTime = 0;
  function renderStars(time) {
    if (document.hidden) {
      requestAnimationFrame(renderStars);
      return;
    }
    // Throttle to 30fps for ultra-low battery & CPU usage
    if (time - lastTime < 33) {
      requestAnimationFrame(renderStars);
      return;
    }
    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.alpha += s.speed * s.direction;
      if (s.alpha > 0.9 || s.alpha < 0.15) {
        s.direction *= -1;
      }

      ctx.fillStyle = `rgba(220, 235, 255, ${s.alpha})`;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }

    requestAnimationFrame(renderStars);
  }

  requestAnimationFrame(renderStars);
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

  let isScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
      isScrollTicking = true;
      requestAnimationFrame(() => {
        updateActiveLink();
        isScrollTicking = false;
      });
    }
  }, { passive: true });
  setTimeout(updateActiveLink, 200);

  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('navbar-mobile-toggle');
  const closeBtn = document.getElementById('navbar-mobile-close');
  const drawer = document.getElementById('navbar-mobile-drawer');

  if (drawer) {
    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('is-open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    // Close on clicking any link or action button inside drawer
    drawer.querySelectorAll('a, button').forEach(item => {
      if (item !== closeBtn) {
        item.addEventListener('click', closeDrawer);
      }
    });
  }
}

/* -------------------------------------------------------------------
   5. 3D LANYARD BADGE (Managed by lanyard.js engine)
   ------------------------------------------------------------------- */
function initLanyard3D() {
  // 3D badge is driven autonomously by high-performance lanyard.js
}

/* -------------------------------------------------------------------
   6. DYNAMIC MOUSE BORDER GLOW (bento cards)
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
   7. REAL MULTI-TRACK PLAYLIST ENGINE
   Interactive Music Player with Prev, Next, Stop, Shuffle, Repeat & Auto-Play
   Featuring 9 curated NTT & Timur Coding Vibes tracks
   ------------------------------------------------------------------- */
function initSpotifyPlayer() {
  const audio = document.getElementById('coding-audio-player');
  const playBtn = document.getElementById('spotify-play-btn');
  const prevBtn = document.getElementById('spotify-prev-btn');
  const nextBtn = document.getElementById('spotify-next-btn');
  const stopBtn = document.getElementById('spotify-stop-btn');
  const shuffleBtn = document.getElementById('spotify-shuffle-btn');
  const repeatBtn = document.getElementById('spotify-repeat-btn');
  const audioNavBtn = document.getElementById('navbar-audio-btn');

  const coverImg = document.getElementById('spotify-cover-img');
  const albumArt = document.getElementById('spotify-album-art');
  const statusDot = document.getElementById('spotify-status-dot');
  const statusText = document.getElementById('spotify-status-text');
  const trackTitle = document.getElementById('spotify-track-title');
  const trackArtist = document.getElementById('spotify-track-artist');
  const trackGenre = document.getElementById('spotify-track-genre');
  const ytLink = document.getElementById('spotify-yt-link');
  const modeText = document.getElementById('spotify-mode-text');

  const scrubber = document.getElementById('spotify-scrubber');
  const scrubberFill = document.getElementById('spotify-scrubber-fill');
  const curTimeEl = document.getElementById('spotify-cur-time');
  const totalTimeEl = document.getElementById('spotify-total-time');

  const playlistToggle = document.getElementById('spotify-playlist-toggle');
  const playlistToggleLabel = document.getElementById('playlist-toggle-label');
  const playlistDrawer = document.getElementById('spotify-playlist-drawer');

  if (!audio) return;
  audio.preload = 'none'; // High-Performance: Never pre-buffer 5MB audio on page load!

  const PLAYLIST = [
    {
      id: 1,
      title: "Tangkap Basah",
      artist: "VENDETTA RAP (feat. Bringin Home)",
      genre: "NTT Hip-Hop",
      audio: "assets/audio/track-1.mp3",
      cover: "assets/img/track-1-cover.jpg",
      youtube: "https://youtu.be/rMpJ3LEYdOA?si=xqtnkVKteWYHX3Hk",
      duration: "03:47"
    },
    {
      id: 2,
      title: "Bebaskan Diriku",
      artist: "Mario G. Klau X MONE BAND",
      genre: "Pop NTT Live",
      audio: "assets/audio/track-2.mp3",
      cover: "assets/img/track-2-cover.jpg",
      youtube: "https://youtu.be/4oB6BjcHJec?si=pdD0rtBcHkuV2BXz",
      duration: "05:10"
    },
    {
      id: 3,
      title: "Jalan Pulang",
      artist: "Willy Sopacua",
      genre: "Timur Acoustic Pop",
      audio: "assets/audio/track-3.mp3",
      cover: "assets/img/track-3-cover.jpg",
      youtube: "https://youtu.be/dTBgUVuHnbA?si=nvsIaDCJrZXLTVKA",
      duration: "03:19"
    },
    {
      id: 4,
      title: "Trauma",
      artist: "Twenty Eigth (Vendetta Rap)",
      genre: "NTT Rap Melodic",
      audio: "assets/audio/track-4.mp3",
      cover: "assets/img/track-4-cover.jpg",
      youtube: "https://youtu.be/oNAlhcdkJuA?si=3zMthtiwJwW89tXq",
      duration: "04:17"
    },
    {
      id: 5,
      title: "LOVE KO YAA",
      artist: "ONE SCOOT (feat. X'TATION, Pecha)",
      genre: "Ambon / NTT Hip-Hop",
      audio: "assets/audio/track-5.mp3",
      cover: "assets/img/track-5-cover.jpg",
      youtube: "https://youtu.be/nckPqKcAr_4?si=IMP-LdVUJZkaiAxX",
      duration: "02:09"
    },
    {
      id: 6,
      title: "Trauma (Official Audio)",
      artist: "VENDETTA RAP (feat. Not Empty, Bringin Home)",
      genre: "NTT Hip-Hop Anthem",
      audio: "assets/audio/track-6.mp3",
      cover: "assets/img/track-6-cover.jpg",
      youtube: "https://youtu.be/db-VCm7wJDU?si=32u0hs14NzjGvkMP",
      duration: "04:15"
    },
    {
      id: 7,
      title: "Bercanda",
      artist: "Silet Open Up, SonaOne",
      genre: "Timur Hip-Hop",
      audio: "assets/audio/track-7.mp3",
      cover: "assets/img/track-7-cover.jpg",
      youtube: "https://youtu.be/nYV4y8bl6E0?si=SQ2-wX1Ta8NeSs4s",
      duration: "04:29"
    },
    {
      id: 8,
      title: "BODY PATA PATA",
      artist: "FARIS ADAM (feat. Diva Aurel)",
      genre: "Timur Party Vibes",
      audio: "assets/audio/track-8.mp3",
      cover: "assets/img/track-8-cover.jpg",
      youtube: "https://youtu.be/4VVvXjmRk6g?si=zeREWhWIigkRKDI1",
      duration: "04:29"
    },
    {
      id: 9,
      title: "Pulangkan Saja",
      artist: "Rendy Da Silva (feat. Martin hill & Elrio)",
      genre: "Kupang R&B Soul",
      audio: "assets/audio/track-9.mp3",
      cover: "assets/img/track-9-cover.jpg",
      youtube: "https://youtu.be/osG7_bX1qxA?si=v5KsEnh91X2g_Dq_",
      duration: "03:55"
    }
  ];

  let currentIndex = 0;
  let isShuffle = false;
  let repeatMode = 'all'; // 'all', 'one', 'none'
  let isPlaylistOpen = false;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function renderPlaylist() {
    if (!playlistDrawer) return;
    playlistDrawer.innerHTML = '';

    PLAYLIST.forEach((track, idx) => {
      const item = document.createElement('div');
      item.className = `playlist-item ${idx === currentIndex ? 'is-active' : ''}`;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `Putar ${track.title} oleh ${track.artist}`);
      item.innerHTML = `
        <span class="playlist-item-idx">${String(idx + 1).padStart(2, '0')}</span>
        <img src="${track.cover}" alt="${track.title}" class="playlist-item-thumb" loading="lazy" />
        <div class="playlist-item-info">
          <span class="playlist-item-title">${track.title}</span>
          <span class="playlist-item-artist">${track.artist}</span>
        </div>
        <div class="playlist-item-meta">
          <div class="playlist-mini-eq">
            <span class="mini-eq-bar"></span>
            <span class="mini-eq-bar"></span>
            <span class="mini-eq-bar"></span>
          </div>
          <span class="playlist-item-duration">${track.duration}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        loadTrack(idx, true);
      });

      playlistDrawer.appendChild(item);
    });
  }

  function highlightPlaylistItem() {
    const items = playlistDrawer ? playlistDrawer.querySelectorAll('.playlist-item') : [];
    items.forEach((item, idx) => {
      item.classList.toggle('is-active', idx === currentIndex);
    });
  }

  function updatePlayState(isPlaying) {
    if (isPlaying) {
      if (playBtn) {
        playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
        playBtn.setAttribute('title', 'Jeda Musik');
      }
      if (audioNavBtn) {
        audioNavBtn.classList.add('is-playing');
        audioNavBtn.setAttribute('title', `Sedang Memutar: ${PLAYLIST[currentIndex].title} (Klik untuk Jeda)`);
      }
      if (albumArt) albumArt.classList.add('is-playing');
      if (statusDot) statusDot.classList.add('is-active');
      if (statusText) statusText.textContent = `NOW PLAYING [${currentIndex + 1}/${PLAYLIST.length}] // VIBE CODING`;
    } else {
      if (playBtn) {
        playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        playBtn.setAttribute('title', 'Putar Musik Nyata');
      }
      if (audioNavBtn) {
        audioNavBtn.classList.remove('is-playing');
        audioNavBtn.setAttribute('title', 'Putar Playlist Musik Vibe Coding');
      }
      if (albumArt) albumArt.classList.remove('is-playing');
      if (statusDot) statusDot.classList.remove('is-active');
      if (statusText) statusText.textContent = `PAUSED [${currentIndex + 1}/${PLAYLIST.length}] // KLIK PLAY`;
    }
    highlightPlaylistItem();
  }

  function loadTrack(index, autoPlay = false) {
    currentIndex = index;
    const track = PLAYLIST[currentIndex];

    if (coverImg) coverImg.src = track.cover;
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
    if (trackGenre) trackGenre.textContent = track.genre;
    if (totalTimeEl) totalTimeEl.textContent = track.duration;
    if (curTimeEl) curTimeEl.textContent = '00:00';
    if (scrubberFill) scrubberFill.style.width = '0%';
    if (ytLink) ytLink.href = track.youtube;

    highlightPlaylistItem();

    if (autoPlay) {
      audio.src = track.audio;
      audio.play().then(() => {
        updatePlayState(true);
      }).catch(err => {
        console.warn('Playback error / user gesture needed:', err);
        updatePlayState(false);
      });
    } else {
      updatePlayState(false);
    }
  }

  function togglePlay() {
    if (!audio.src || audio.src === '' || audio.src.endsWith(window.location.pathname) || audio.src.endsWith('/')) {
      audio.src = PLAYLIST[currentIndex].audio;
    }
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

  function playNext() {
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * PLAYLIST.length);
      if (nextIndex === currentIndex && PLAYLIST.length > 1) {
        nextIndex = (currentIndex + 1) % PLAYLIST.length;
      }
    } else {
      nextIndex = (currentIndex + 1) % PLAYLIST.length;
    }
    loadTrack(nextIndex, true);
  }

  function playPrev() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }
    let prevIndex = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(prevIndex, true);
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    if (scrubberFill) scrubberFill.style.width = '0%';
    if (curTimeEl) curTimeEl.textContent = '00:00';
    updatePlayState(false);
    if (statusText) statusText.textContent = `STOPPED // KLIK PLAY UNTUK MEMUTAR`;
  }

  function toggleShuffle() {
    isShuffle = !isShuffle;
    if (shuffleBtn) {
      shuffleBtn.classList.toggle('is-active', isShuffle);
      shuffleBtn.setAttribute('title', isShuffle ? 'Acak Lagu: AKTIF' : 'Acak Lagu: NONAKTIF');
    }
    if (modeText) {
      modeText.textContent = isShuffle
        ? `Shuffle Mode Aktif (${PLAYLIST.length} Lagu)`
        : `Auto-Play Playlist Aktif (${PLAYLIST.length} Lagu)`;
    }
  }

  function toggleRepeat() {
    if (repeatMode === 'all') {
      repeatMode = 'one';
      if (repeatBtn) {
        repeatBtn.classList.add('is-active');
        repeatBtn.setAttribute('title', 'Ulangi 1 Lagu Ini Saja (Repeat One)');
        repeatBtn.innerHTML = `
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
          </svg>
        `;
      }
      if (modeText) modeText.textContent = 'Mengulang 1 Lagu Ini Saja';
    } else if (repeatMode === 'one') {
      repeatMode = 'none';
      if (repeatBtn) {
        repeatBtn.classList.remove('is-active');
        repeatBtn.setAttribute('title', 'Putar Sekali Lalu Berhenti (No Repeat)');
        repeatBtn.innerHTML = `
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        `;
      }
      if (modeText) modeText.textContent = 'Berhenti Setelah Lagu Terakhir Selesai';
    } else {
      repeatMode = 'all';
      if (repeatBtn) {
        repeatBtn.classList.add('is-active');
        repeatBtn.setAttribute('title', 'Mode Putar: Otomatis Lanjut Semua Lagu (Loop All)');
        repeatBtn.innerHTML = `
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        `;
      }
      if (modeText) modeText.textContent = `Auto-Play Playlist Aktif (${PLAYLIST.length} Lagu)`;
    }
  }

  function togglePlaylistDrawer() {
    isPlaylistOpen = !isPlaylistOpen;
    if (playlistDrawer) playlistDrawer.classList.toggle('is-open', isPlaylistOpen);
    if (playlistToggle) {
      playlistToggle.classList.toggle('is-open', isPlaylistOpen);
      playlistToggle.setAttribute('aria-expanded', isPlaylistOpen);
    }
    if (playlistToggleLabel) {
      playlistToggleLabel.textContent = isPlaylistOpen ? 'Tutup Playlist' : 'Lihat Playlist';
    }
  }

  // Event Listeners for Player Controls
  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (audioNavBtn) audioNavBtn.addEventListener('click', togglePlay);
  if (nextBtn) nextBtn.addEventListener('click', playNext);
  if (prevBtn) prevBtn.addEventListener('click', playPrev);
  if (stopBtn) stopBtn.addEventListener('click', stopAudio);
  if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
  if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeat);
  if (playlistToggle) playlistToggle.addEventListener('click', togglePlaylistDrawer);

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

  // AUTO-PLAY NEXT SONG WHEN FINISHED!
  audio.addEventListener('ended', () => {
    if (repeatMode === 'one') {
      audio.currentTime = 0;
      audio.play().catch(() => updatePlayState(false));
    } else if (repeatMode === 'all' || isShuffle) {
      playNext();
    } else {
      if (currentIndex < PLAYLIST.length - 1) {
        playNext();
      } else {
        stopAudio();
      }
    }
  });

  // Interactive scrubber seek (click or drag)
  if (scrubber) {
    let isScrubbing = false;

    function seekTo(clientX) {
      const rect = scrubber.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const width = rect.width;
      const pct = Math.max(0, Math.min(1, clickX / width));
      if (audio.duration) {
        audio.currentTime = pct * audio.duration;
      }
    }

    scrubber.addEventListener('mousedown', (e) => {
      isScrubbing = true;
      seekTo(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (isScrubbing) seekTo(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isScrubbing = false;
    });

    // Touch support for scrubber
    scrubber.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) seekTo(e.touches[0].clientX);
    }, { passive: true });

    scrubber.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) seekTo(e.touches[0].clientX);
    }, { passive: true });
  }

  // Keyboard controls shortcut (Space to play/pause when in view)
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      const rect = document.getElementById('spotify')?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        e.preventDefault();
        togglePlay();
      }
    }
  });

  // Initialize Playlist UI & Load Track 1
  renderPlaylist();
  loadTrack(0, false);
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

    spotify_badge: 'REAL MUSIC • TIMUR & CODING VIBES',
    spotify_title: 'A little music. <br><span>A lot of ideas.</span>',
    spotify_desc: 'Playlist musik pilihan khas Kupang & Indonesia Timur yang menemani sesi Vibe Coding larut malam, investigasi bugs SIMRS, dan perancangan integrasi API.',
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

    spotify_badge: 'REAL MUSIC • TIMUR & CODING VIBES',
    spotify_title: 'A little music. <br><span>A lot of ideas.</span>',
    spotify_desc: 'Curated Kupang & East Indonesia music playlist powering late-night Vibe Coding sessions, SIMRS bug forensics, and API bridging designs.',
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
