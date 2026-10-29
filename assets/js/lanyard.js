/* ===================================================================
   3D REALISTIC INTERACTIVE LANYARD ENGINE (Three.js + Verlet Physics)
   Ultra-Reliable & High Performance: Clamped Reach, Zero-NaN Safety
   Created for Angel Bard Laklo, S.Kom — Vibe Coder & HealthTech Innovator
   =================================================================== */

(function initReal3DLanyard() {
  const container = document.getElementById('lanyard-card-container');
  if (!container) return;

  // Ensure Three.js is loaded
  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => setupLanyardScene();
    document.head.appendChild(script);
  } else {
    setupLanyardScene();
  }

  function setupLanyardScene() {
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '600px';
    container.style.overflow = 'visible';

    // Canvas Element
    const canvas = document.createElement('canvas');
    canvas.id = 'lanyard-three-canvas';
    canvas.className = 'lanyard-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.cursor = 'grab';
    canvas.style.outline = 'none';
    canvas.style.touchAction = 'none';
    canvas.style.userSelect = 'none';
    container.appendChild(canvas);

    // Interactive Hint Pill under badge
    const hintPill = document.createElement('div');
    hintPill.className = 'lanyard-interaction-hint';
    hintPill.style.position = 'absolute';
    hintPill.style.bottom = '14px';
    hintPill.style.left = '50%';
    hintPill.style.transform = 'translateX(-50%)';
    hintPill.style.background = 'rgba(5, 7, 19, 0.8)';
    hintPill.style.border = '1px solid rgba(0, 240, 255, 0.35)';
    hintPill.style.borderRadius = '20px';
    hintPill.style.padding = '6px 14px';
    hintPill.style.fontSize = '12px';
    hintPill.style.color = '#94a3b8';
    hintPill.style.pointerEvents = 'none';
    hintPill.style.backdropFilter = 'blur(8px)';
    hintPill.style.display = 'flex';
    hintPill.style.alignItems = 'center';
    hintPill.style.gap = '6px';
    hintPill.style.zIndex = '5';
    hintPill.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2">
        <path d="M15 15l5-5-5-5"></path><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
      </svg>
      <span>Tarik ID Card • Double-click untuk membalik</span>
    `;
    container.appendChild(hintPill);

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.4);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 1.1);
    dirLight2.position.set(-3, -2, 2.5);
    scene.add(dirLight2);

    // 3. Card Front Texture Canvas (512 x 768)
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 512;
    cardCanvas.height = 768;
    const ctx = cardCanvas.getContext('2d');

    const profileImg = new Image();
    profileImg.crossOrigin = 'anonymous';
    profileImg.src = 'assets/img/profile-img.jpg';

    function drawCardTexture() {
      // Dark cyber metallic background
      const grad = ctx.createLinearGradient(0, 0, 512, 768);
      grad.addColorStop(0, '#0a0f26');
      grad.addColorStop(0.5, '#050713');
      grad.addColorStop(1, '#0b1333');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 768);

      // Cyber Grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 512; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 768); ctx.stroke();
      }
      for (let y = 0; y < 768; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
      }

      // Outer Neon Cyan Border
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 5;
      ctx.strokeRect(16, 16, 480, 736);

      // Inner Accent Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(24, 24, 464, 720);

      // Top Lanyard Slot Graphic
      ctx.fillStyle = '#050713';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(216, 18, 80, 18, 9);
      ctx.fill();
      ctx.stroke();

      // Header Tag Pill
      ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 48, 432, 42, 21);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 18px "Space Grotesk", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ABL // VIBE CODER', 65, 75);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('• ONLINE 2026', 445, 74);

      // Profile Photo Frame
      const photoSize = 210;
      const photoX = (512 - photoSize) / 2;
      const photoY = 112;

      // Glow circle behind photo
      const radGrad = ctx.createRadialGradient(256, photoY + photoSize / 2, 25, 256, photoY + photoSize / 2, 130);
      radGrad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
      radGrad.addColorStop(0.6, 'rgba(59, 130, 246, 0.2)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(256, photoY + photoSize / 2, 125, 0, Math.PI * 2);
      ctx.fill();

      // Clip & Draw Photo
      ctx.save();
      ctx.beginPath();
      ctx.arc(256, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
      ctx.clip();
      if (profileImg.complete && profileImg.naturalWidth > 0) {
        ctx.drawImage(profileImg, photoX, photoY, photoSize, photoSize);
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(photoX, photoY, photoSize, photoSize);
      }
      ctx.restore();

      // Photo Ring
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(256, photoY + photoSize / 2, photoSize / 2 + 2, 0, Math.PI * 2);
      ctx.stroke();

      // Gold IC Chip + NFC icon
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#fef3c7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(50, 340, 65, 48, 6);
      ctx.fill();
      ctx.stroke();

      // Chip internal circuit lines
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(72, 340); ctx.lineTo(72, 388);
      ctx.moveTo(92, 340); ctx.lineTo(92, 388);
      ctx.moveTo(50, 364); ctx.lineTo(115, 364);
      ctx.stroke();

      // NFC Waves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(132, 364, 9, -0.8, 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(132, 364, 17, -0.8, 0.8);
      ctx.stroke();

      // Name & Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 27px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Angel Bard Laklo, S.Kom', 256, 425);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 18px "Space Grotesk", sans-serif';
      ctx.fillText('Vibe Coder // HealthTech Systems', 256, 458);

      // Meta Data Box
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(40, 485, 432, 140, 10);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillText('IDENTIFIER:', 60, 520);
      ctx.fillText('EDUCATION :', 60, 555);
      ctx.fillText('LOCATION  :', 60, 590);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "Space Grotesk", sans-serif';
      ctx.fillText('ABL-2026-NTT', 185, 520);
      ctx.fillText('S.Kom (UNWIRA) • Insinyur Track', 185, 555);
      ctx.fillText('Kupang, NTT, Indonesia', 185, 590);

      // Barcode at bottom
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      const barcodeY = 655;
      const barPattern = [4, 2, 8, 3, 12, 4, 3, 7, 2, 9, 3, 14, 4, 2, 8, 3, 12, 5, 2, 8, 4, 15, 3, 6, 2, 10, 4, 6];
      let barX = 60;
      for (let i = 0; i < barPattern.length; i++) {
        const w = barPattern[i] * 1.75;
        if (i % 2 === 0) ctx.fillRect(barX, barcodeY, w, 45);
        barX += w + 4;
      }

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('VERIFIED BADGE ✓', 450, 685);

      if (cardTexture) cardTexture.needsUpdate = true;
    }

    const cardTexture = new THREE.CanvasTexture(cardCanvas);
    cardTexture.anisotropy = 4;
    profileImg.onload = drawCardTexture;
    drawCardTexture();

    // 4. Card Back Texture Canvas (512 x 768)
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 512;
    backCanvas.height = 768;
    const bCtx = backCanvas.getContext('2d');

    function drawBackTexture() {
      const bGrad = bCtx.createLinearGradient(0, 0, 512, 768);
      bGrad.addColorStop(0, '#040714');
      bGrad.addColorStop(0.5, '#0a102b');
      bGrad.addColorStop(1, '#050713');
      bCtx.fillStyle = bGrad;
      bCtx.fillRect(0, 0, 512, 768);

      bCtx.strokeStyle = '#ec4899';
      bCtx.lineWidth = 4;
      bCtx.strokeRect(16, 16, 480, 736);

      bCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      bCtx.lineWidth = 1;
      bCtx.strokeRect(24, 24, 464, 720);

      bCtx.fillStyle = '#ffffff';
      bCtx.font = 'bold 24px "Space Grotesk", sans-serif';
      bCtx.textAlign = 'center';
      bCtx.fillText('ANGEL BARD LAKLO', 256, 100);

      bCtx.fillStyle = '#00f0ff';
      bCtx.font = '16px "JetBrains Mono", monospace';
      bCtx.fillText('“Fortis Solus Stabit”', 256, 130);

      bCtx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      bCtx.font = '14px "Space Grotesk", sans-serif';
      bCtx.fillText('Vibe Coder • Creative Problem Solver', 256, 165);

      // QR code Graphic representation
      bCtx.fillStyle = '#ffffff';
      bCtx.fillRect(128, 220, 256, 256);
      bCtx.fillStyle = '#050713';
      bCtx.fillRect(140, 232, 232, 232);

      bCtx.fillStyle = '#00f0ff';
      bCtx.fillRect(160, 252, 60, 60);
      bCtx.fillRect(292, 252, 60, 60);
      bCtx.fillRect(160, 384, 60, 60);
      bCtx.fillStyle = '#ffffff';
      bCtx.fillRect(175, 267, 30, 30);
      bCtx.fillRect(307, 267, 30, 30);
      bCtx.fillRect(175, 399, 30, 30);

      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if ((r + c) % 2 === 0) {
            bCtx.fillRect(235 + c * 12, 252 + r * 12, 9, 9);
          }
        }
      }

      bCtx.fillStyle = '#94a3b8';
      bCtx.font = '14px "JetBrains Mono", monospace';
      bCtx.fillText('SCAN TO VISIT LIVE PORTFOLIO', 256, 515);

      bCtx.fillStyle = '#00f0ff';
      bCtx.font = 'bold 18px "Space Grotesk", sans-serif';
      bCtx.fillText('https://angelbardlaklo.vercel.app', 256, 555);

      bCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      bCtx.font = '12px "JetBrains Mono", monospace';
      bCtx.fillText('NTT • INDONESIA // GLOBAL VIBE', 256, 670);

      if (backTexture) backTexture.needsUpdate = true;
    }

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.anisotropy = 4;
    drawBackTexture();

    // 5. Build 3D Card & Hardware Clip Assembly
    const cardWidth = 1.05;
    const cardHeight = 1.55;
    const cardDepth = 0.028;

    const cardGeo = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({
        map: cardTexture,
        metalness: 0.35,
        roughness: 0.25
      }),
      new THREE.MeshStandardMaterial({
        map: backTexture,
        metalness: 0.45,
        roughness: 0.3
      })
    ];

    const cardMesh = new THREE.Mesh(cardGeo, materials);

    // Card hangs strictly below the top clip:
    const cardCenterY = -0.06 - cardHeight / 2; // -0.835
    cardMesh.position.set(0, cardCenterY, 0);

    // Realistic Chrome Metal Hardware:
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      metalness: 0.95,
      roughness: 0.15
    });

    const ringGeo = new THREE.TorusGeometry(0.045, 0.012, 12, 18);
    const ringMesh = new THREE.Mesh(ringGeo, metalMat);
    ringMesh.position.set(0, 0, 0);

    const swivelGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.045, 12);
    const swivelMesh = new THREE.Mesh(swivelGeo, metalMat);
    swivelMesh.position.set(0, -0.03, 0);

    const clipGeo = new THREE.BoxGeometry(0.13, 0.06, 0.046);
    const clipMesh = new THREE.Mesh(clipGeo, metalMat);
    clipMesh.position.set(0, -0.06, 0);

    // Reliable Invisible Hitbox Mesh (transparent material so raycaster detects it!)
    const hitboxGeo = new THREE.BoxGeometry(cardWidth + 0.25, cardHeight + 0.3, 0.3);
    const hitboxMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const hitboxMesh = new THREE.Mesh(hitboxGeo, hitboxMat);
    hitboxMesh.position.set(0, cardCenterY, 0);

    const cardGroup = new THREE.Group();
    cardGroup.add(cardMesh);
    cardGroup.add(ringMesh);
    cardGroup.add(swivelMesh);
    cardGroup.add(clipMesh);
    cardGroup.add(hitboxMesh);
    scene.add(cardGroup);

    // 6. Lanyard Strap Chain
    const nodeCount = 9;
    const anchorY = 1.55;
    const restLength = 0.85;
    const segmentLength = restLength / (nodeCount - 1);

    const nodes = [];
    const prevNodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const y = anchorY - i * segmentLength;
      nodes.push(new THREE.Vector3(0, y, 0));
      prevNodes.push(new THREE.Vector3(0, y, 0));
    }

    // High-tech Woven Lanyard Strap Texture
    const strapCanvas = document.createElement('canvas');
    strapCanvas.width = 128;
    strapCanvas.height = 256;
    const sCtx = strapCanvas.getContext('2d');
    sCtx.fillStyle = '#0a0f26';
    sCtx.fillRect(0, 0, 128, 256);

    sCtx.fillStyle = '#00f0ff';
    sCtx.fillRect(4, 0, 8, 256);
    sCtx.fillRect(116, 0, 8, 256);

    sCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    sCtx.font = 'bold 16px "JetBrains Mono", monospace';
    sCtx.textAlign = 'center';
    sCtx.save();
    sCtx.translate(64, 128);
    sCtx.rotate(-Math.PI / 2);
    sCtx.fillText('ABL // VIBE CODER', 0, 6);
    sCtx.restore();

    const strapTexture = new THREE.CanvasTexture(strapCanvas);
    strapTexture.wrapS = THREE.RepeatWrapping;
    strapTexture.wrapT = THREE.RepeatWrapping;
    strapTexture.repeat.set(1, 2);

    const curve = new THREE.CatmullRomCurve3(nodes);
    let tubeGeo = new THREE.TubeGeometry(curve, 18, 0.02, 6, false);

    const strapMat = new THREE.MeshStandardMaterial({
      map: strapTexture,
      roughness: 0.65,
      metalness: 0.15
    });

    const strapMesh = new THREE.Mesh(tubeGeo, strapMat);
    scene.add(strapMesh);

    // Ceiling Anchor Mount
    const hookGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 12);
    const hookMesh = new THREE.Mesh(hookGeo, metalMat);
    hookMesh.position.set(0, anchorY + 0.02, 0);
    scene.add(hookMesh);

    // Initial positioning of card
    cardGroup.position.copy(nodes[nodeCount - 1]);

    // 7. Interactive Draggable Physics
    let isDragging = false;
    const grabOffset = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const planeIntersect = new THREE.Vector3();

    let rotY = 0;
    let rotVelY = 0;
    let lastDragX = 0;
    let lastDragTime = performance.now();
    let dragVelocity = new THREE.Vector3();
    let prevMousePos = new THREE.Vector3();
    let lastTap = 0;

    function updateMouseCoords(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onPointerDown(e) {
      updateMouseCoords(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse, camera);

      const hits = raycaster.intersectObjects([hitboxMesh, cardMesh, clipMesh, ringMesh], true);
      if (hits.length > 0) {
        isDragging = true;
        canvas.style.cursor = 'grabbing';

        const hitPoint = hits[0].point;
        dragPlane.constant = -hitPoint.z;
        raycaster.ray.intersectPlane(dragPlane, planeIntersect);

        grabOffset.copy(nodes[nodeCount - 1]).sub(planeIntersect);

        lastDragX = e.clientX;
        lastDragTime = performance.now();
        prevMousePos.copy(planeIntersect);
        dragVelocity.set(0, 0, 0);

        if (canvas.setPointerCapture && e.pointerId !== undefined) {
          try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        }
      }
    }

    function onPointerMove(e) {
      if (!isDragging) {
        updateMouseCoords(e.clientX, e.clientY);
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects([hitboxMesh, cardMesh], true);
        canvas.style.cursor = hits.length > 0 ? 'grab' : 'default';
        return;
      }

      updateMouseCoords(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
        const now = performance.now();
        const dt = Math.max((now - lastDragTime) / 1000, 0.001);

        dragVelocity.copy(planeIntersect).sub(prevMousePos).divideScalar(dt);
        prevMousePos.copy(planeIntersect);

        const dx = e.clientX - lastDragX;
        rotVelY += -dx * 0.015;
        lastDragX = e.clientX;
        lastDragTime = now;
      }
    }

    function onPointerUp(e) {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = 'grab';

        const endNode = nodes[nodeCount - 1];
        const velImpulse = dragVelocity.clone().clampLength(0, 2.5).multiplyScalar(0.016);
        endNode.add(velImpulse);

        if (canvas.releasePointerCapture && e.pointerId !== undefined) {
          try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        }
      }
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('blur', () => { isDragging = false; });

    // Double-click to flip card
    canvas.addEventListener('dblclick', () => {
      rotVelY += Math.PI * 4;
    });

    // Tap detection for double-tap flip
    canvas.addEventListener('pointerup', () => {
      const now = performance.now();
      if (now - lastTap < 350 && now - lastTap > 0) {
        rotVelY += Math.PI * 4;
      }
      lastTap = now;
    });

    // 8. HIGH-PERFORMANCE PHYSICS & RENDER LOOP
    let clock = new THREE.Clock();
    let breezeTime = 0;
    const cardPrevPos = nodes[nodeCount - 1].clone();
    const targetEuler = new THREE.Euler(0, 0, 0, 'YXZ');
    const targetQuat = new THREE.Quaternion();

    let isSectionVisible = true;
    let isLoopRunning = false;

    // IntersectionObserver: Pause 3D engine completely when scrolled away!
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isSectionVisible = entry.isIntersecting;
          if (isSectionVisible && !isLoopRunning) {
            isLoopRunning = true;
            clock.start();
            requestAnimationFrame(stepPhysics);
          }
        });
      }, { threshold: 0.05 });
      obs.observe(container);
    }

    function stepPhysics() {
      if (!isSectionVisible) {
        isLoopRunning = false;
        return; // HALT RENDERING when not in view
      }

      isLoopRunning = true;
      const dt = Math.min(clock.getDelta(), 0.033);
      breezeTime += dt;

      const breezeX = Math.sin(breezeTime * 1.1) * 0.03 + Math.sin(breezeTime * 2.3) * 0.015;
      const breezeZ = Math.cos(breezeTime * 0.8) * 0.02;

      nodes[0].set(0, anchorY, 0);

      // Verlet integration
      for (let i = 1; i < nodeCount; i++) {
        const vel = nodes[i].clone().sub(prevNodes[i]).multiplyScalar(0.975);
        prevNodes[i].copy(nodes[i]);

        vel.y -= 9.8 * dt * dt * 0.8;
        vel.x += breezeX * dt;
        vel.z += breezeZ * dt;

        nodes[i].add(vel);
      }

      // CRITICAL CLAMP: Rope can NEVER stretch further than its physical reach!
      // This guarantees the card CAN NEVER fall off the screen!
      if (isDragging) {
        const targetEnd = planeIntersect.clone().add(grabOffset);

        const fromAnchor = targetEnd.clone().sub(nodes[0]);
        const maxReach = restLength * 1.08;
        if (fromAnchor.length() > maxReach) {
          fromAnchor.setLength(maxReach);
          targetEnd.copy(nodes[0]).add(fromAnchor);
        }

        nodes[nodeCount - 1].lerp(targetEnd, 0.55);
      }

      // Relax constraints (7 iterations for stable rigid rope)
      for (let iter = 0; iter < 7; iter++) {
        nodes[0].set(0, anchorY, 0);

        for (let i = 0; i < nodeCount - 1; i++) {
          const p1 = nodes[i];
          const p2 = nodes[i + 1];
          const delta = p2.clone().sub(p1);
          const dist = delta.length();
          if (dist > 0.0001) {
            const diff = (dist - segmentLength) / dist;
            if (i === 0) {
              p2.sub(delta.multiplyScalar(diff));
            } else {
              p1.add(delta.clone().multiplyScalar(diff * 0.5));
              p2.sub(delta.multiplyScalar(diff * 0.5));
            }
          }
        }
      }

      // Sync Card position
      const endNode = nodes[nodeCount - 1];
      const prevNode = nodes[nodeCount - 2];

      // Zero-NaN Safety guard
      if (isNaN(endNode.x) || isNaN(endNode.y) || isNaN(endNode.z)) {
        endNode.set(0, anchorY - restLength, 0);
      }

      cardGroup.position.copy(endNode);

      const ropeDir = endNode.clone().sub(prevNode).normalize();
      const rollAngle = Math.atan2(ropeDir.x, -ropeDir.y);
      const pitchAngle = Math.atan2(ropeDir.z, -ropeDir.y);

      const vel = endNode.clone().sub(cardPrevPos);
      cardPrevPos.copy(endNode);

      const dynRoll = rollAngle - vel.x * 7.5;
      const dynPitch = pitchAngle + vel.y * 5.0;

      rotY += rotVelY * dt;
      rotVelY *= 0.94;
      rotVelY += (0 - rotY) * 5.5 * dt;

      if (isNaN(rotY)) rotY = 0;
      if (isNaN(rotVelY)) rotVelY = 0;

      targetEuler.set(dynPitch, rotY, dynRoll, 'YXZ');
      targetQuat.setFromEuler(targetEuler);
      cardGroup.quaternion.slerp(targetQuat, 0.22);

      // Update tube geometry
      curve.points = nodes;
      strapMesh.geometry.dispose();
      strapMesh.geometry = new THREE.TubeGeometry(curve, 18, 0.02, 6, false);

      renderer.render(scene, camera);
      requestAnimationFrame(stepPhysics);
    }

    isLoopRunning = true;
    stepPhysics();

    // Resize Handler
    function handleResize() {
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);
  }
})();
