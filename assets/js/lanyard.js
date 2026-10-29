/* ===================================================================
   3D REALISTIC INTERACTIVE LANYARD ENGINE (Three.js + Verlet Physics)
   Exact realistic draggable physics badge inspired by alfari.my.id / pmndrs
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
    if (!container.clientHeight) container.style.height = '620px';
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
    hintPill.style.bottom = '15px';
    hintPill.style.left = '50%';
    hintPill.style.transform = 'translateX(-50%)';
    hintPill.style.background = 'rgba(5, 7, 19, 0.75)';
    hintPill.style.border = '1px solid rgba(0, 240, 255, 0.3)';
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
      <span>Tarik atau goyangkan ID Card • Double-click untuk membalik</span>
    `;
    container.appendChild(hintPill);

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 420;
    const height = container.clientHeight || 620;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Lighting Setup (Cyberpunk Studio reflections)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.4);
    dirLight1.position.set(3, 4, 3.5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 1.1);
    dirLight2.position.set(-3.5, -2, 2.5);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xec4899, 1.3, 8);
    rimLight.position.set(0, -1.2, 2.2);
    scene.add(rimLight);

    // 3. Card Front Texture Canvas (1024 x 1536)
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 1024;
    cardCanvas.height = 1536;
    const ctx = cardCanvas.getContext('2d');

    const profileImg = new Image();
    profileImg.crossOrigin = 'anonymous';
    profileImg.src = 'assets/img/profile-img.jpg';

    function drawCardTexture() {
      // Dark cyber metallic background
      const grad = ctx.createLinearGradient(0, 0, 1024, 1536);
      grad.addColorStop(0, '#0a0f26');
      grad.addColorStop(0.5, '#050713');
      grad.addColorStop(1, '#0b1333');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1536);

      // Cyber Grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 2;
      for (let x = 0; x < 1024; x += 64) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1536); ctx.stroke();
      }
      for (let y = 0; y < 1536; y += 64) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
      }

      // Outer Neon Cyan Border
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 8;
      ctx.strokeRect(32, 32, 960, 1472);

      // Inner Accent Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, 928, 1440);

      // Top Lanyard Slot Punchout Graphic (Hole where clip securely attaches)
      ctx.fillStyle = '#050713';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(432, 38, 160, 36, 18);
      ctx.fill();
      ctx.stroke();

      // Header Tag Pill
      ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 95, 864, 85, 42);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ABL // VIBE CODER', 130, 150);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 26px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('• ONLINE 2026', 890, 148);

      // Profile Photo Frame
      const photoSize = 420;
      const photoX = (1024 - photoSize) / 2;
      const photoY = 225;

      // Glow circle behind photo
      const radGrad = ctx.createRadialGradient(512, photoY + photoSize / 2, 50, 512, photoY + photoSize / 2, 260);
      radGrad.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
      radGrad.addColorStop(0.6, 'rgba(59, 130, 246, 0.25)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(512, photoY + photoSize / 2, 250, 0, Math.PI * 2);
      ctx.fill();

      // Clip & Draw Photo
      ctx.save();
      ctx.beginPath();
      ctx.arc(512, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
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
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(512, photoY + photoSize / 2, photoSize / 2 + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Gold IC Chip + NFC icon
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#fef3c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(100, 680, 130, 95, 12);
      ctx.fill();
      ctx.stroke();

      // Chip internal circuit lines
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(145, 680); ctx.lineTo(145, 775);
      ctx.moveTo(185, 680); ctx.lineTo(185, 775);
      ctx.moveTo(100, 727); ctx.lineTo(230, 727);
      ctx.stroke();

      // NFC Waves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(265, 727, 18, -0.8, 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(265, 727, 34, -0.8, 0.8);
      ctx.stroke();

      // Name & Title (Reflecting Vibe Coder & HealthTech Systems)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Angel Bard Laklo, S.Kom', 512, 850);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText('Vibe Coder // HealthTech Systems', 512, 915);

      // Meta Data Box
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 970, 864, 280, 20);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '28px "JetBrains Mono", monospace';
      ctx.fillText('IDENTIFIER:', 120, 1040);
      ctx.fillText('EDUCATION :', 120, 1110);
      ctx.fillText('LOCATION  :', 120, 1180);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px "Space Grotesk", sans-serif';
      ctx.fillText('ABL-2026-NTT', 370, 1040);
      ctx.fillText('S.Kom (UNWIRA) • Insinyur Track', 370, 1110);
      ctx.fillText('Kupang, NTT, Indonesia', 370, 1180);

      // Barcode at bottom
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      const barcodeY = 1310;
      const barPattern = [4, 2, 8, 3, 12, 4, 3, 7, 2, 9, 3, 14, 4, 2, 8, 3, 12, 5, 2, 8, 4, 15, 3, 6, 2, 10, 4, 6];
      let barX = 120;
      for (let i = 0; i < barPattern.length; i++) {
        const w = barPattern[i] * 3.5;
        if (i % 2 === 0) {
          ctx.fillRect(barX, barcodeY, w, 90);
        }
        barX += w + 8;
      }

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 30px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('VERIFIED BADGE ✓', 900, 1370);

      if (cardTexture) cardTexture.needsUpdate = true;
    }

    profileImg.onload = drawCardTexture;

    const cardTexture = new THREE.CanvasTexture(cardCanvas);
    cardTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    drawCardTexture();

    // 4. Card Back Texture Canvas
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 1024;
    backCanvas.height = 1536;
    const bCtx = backCanvas.getContext('2d');

    const bGrad = bCtx.createLinearGradient(0, 0, 1024, 1536);
    bGrad.addColorStop(0, '#040714');
    bGrad.addColorStop(0.5, '#0a102b');
    bGrad.addColorStop(1, '#050713');
    bCtx.fillStyle = bGrad;
    bCtx.fillRect(0, 0, 1024, 1536);

    bCtx.strokeStyle = '#ec4899';
    bCtx.lineWidth = 8;
    bCtx.strokeRect(32, 32, 960, 1472);

    bCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    bCtx.lineWidth = 2;
    bCtx.strokeRect(48, 48, 928, 1440);

    bCtx.fillStyle = '#ffffff';
    bCtx.font = 'bold 48px "Space Grotesk", sans-serif';
    bCtx.textAlign = 'center';
    bCtx.fillText('ANGEL BARD LAKLO', 512, 200);

    bCtx.fillStyle = '#00f0ff';
    bCtx.font = '32px "JetBrains Mono", monospace';
    bCtx.fillText('“Fortis Solus Stabit”', 512, 260);

    bCtx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    bCtx.font = '28px "Space Grotesk", sans-serif';
    bCtx.fillText('Vibe Coder • Creative Problem Solver', 512, 330);

    // QR code Graphic representation
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(256, 440, 512, 512);
    bCtx.fillStyle = '#050713';
    bCtx.fillRect(280, 464, 464, 464);

    bCtx.fillStyle = '#00f0ff';
    bCtx.fillRect(320, 504, 120, 120);
    bCtx.fillRect(584, 504, 120, 120);
    bCtx.fillRect(320, 768, 120, 120);
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(350, 534, 60, 60);
    bCtx.fillRect(614, 534, 60, 60);
    bCtx.fillRect(350, 798, 60, 60);

    // QR pattern data blocks
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if ((r + c) % 2 === 0) {
          bCtx.fillRect(470 + c * 24, 504 + r * 24, 18, 18);
        }
      }
    }

    bCtx.fillStyle = '#94a3b8';
    bCtx.font = '28px "JetBrains Mono", monospace';
    bCtx.fillText('SCAN TO VISIT LIVE PORTFOLIO', 512, 1030);

    bCtx.fillStyle = '#00f0ff';
    bCtx.font = 'bold 36px "Space Grotesk", sans-serif';
    bCtx.fillText('https://angelbardlaklo.vercel.app', 512, 1110);

    bCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    bCtx.font = '24px "JetBrains Mono", monospace';
    bCtx.fillText('NTT • INDONESIA // GLOBAL VIBE', 512, 1340);

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 5. Build 3D Card & Hardware Clip Assembly
    // NOTE: Origin (0,0,0) of cardGroup is the TOP ATTACHMENT RING where the rope ends!
    // The entire card hangs naturally below (0,0,0).
    // This GUARANTEES the rope NEVER overlaps or cuts across the face of the card!
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
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;

    // Card hangs strictly below the top clip:
    // Top of card is at y = -0.08, center is at y = -0.08 - (cardHeight / 2) = -0.855
    const cardCenterY = -0.08 - cardHeight / 2;
    cardMesh.position.set(0, cardCenterY, 0);

    // Realistic Chrome Metal Hardware:
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      metalness: 0.95,
      roughness: 0.15
    });

    // Ring at (0, 0, 0) — rope terminates exactly here
    const ringGeo = new THREE.TorusGeometry(0.045, 0.012, 16, 24);
    const ringMesh = new THREE.Mesh(ringGeo, metalMat);
    ringMesh.position.set(0, 0, 0);

    // Swivel joint cylinder connecting ring to clamp
    const swivelGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.045, 16);
    const swivelMesh = new THREE.Mesh(swivelGeo, metalMat);
    swivelMesh.position.set(0, -0.035, 0);

    // Metal clip clamping onto the top of the card
    const clipGeo = new THREE.BoxGeometry(0.13, 0.065, 0.046);
    const clipMesh = new THREE.Mesh(clipGeo, metalMat);
    clipMesh.position.set(0, -0.075, 0);

    // Invisible Hitbox Mesh for frictionless mobile touch & mouse interaction
    const hitboxGeo = new THREE.BoxGeometry(cardWidth + 0.2, cardHeight + 0.25, 0.25);
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitboxMesh = new THREE.Mesh(hitboxGeo, hitboxMat);
    hitboxMesh.position.set(0, cardCenterY, 0);

    // Card assembly group: (0, 0, 0) is the ring
    const cardGroup = new THREE.Group();
    cardGroup.add(cardMesh);
    cardGroup.add(ringMesh);
    cardGroup.add(swivelMesh);
    cardGroup.add(clipMesh);
    cardGroup.add(hitboxMesh);
    scene.add(cardGroup);

    // 6. Lanyard Strap Chain (Verlet Physics with 12 nodes)
    const nodeCount = 12;
    const anchorY = 1.70;
    const restLength = 1.0;
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
    strapCanvas.width = 256;
    strapCanvas.height = 512;
    const sCtx = strapCanvas.getContext('2d');
    sCtx.fillStyle = '#0a0f26';
    sCtx.fillRect(0, 0, 256, 512);

    // Glowing cyan edge borders along the strap ribbon
    sCtx.fillStyle = '#00f0ff';
    sCtx.fillRect(6, 0, 14, 512);
    sCtx.fillRect(236, 0, 14, 512);

    // Subtle weave pattern
    sCtx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let y = 0; y < 512; y += 8) {
      sCtx.fillRect(24, y, 208, 4);
    }

    // Repeating branded typography woven into the strap
    sCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    sCtx.font = 'bold 22px "JetBrains Mono", monospace';
    sCtx.textAlign = 'center';
    sCtx.save();
    sCtx.translate(128, 256);
    sCtx.rotate(-Math.PI / 2);
    sCtx.fillText('ABL // VIBE CODER • 2026', 0, 8);
    sCtx.restore();

    const strapTexture = new THREE.CanvasTexture(strapCanvas);
    strapTexture.wrapS = THREE.RepeatWrapping;
    strapTexture.wrapT = THREE.RepeatWrapping;
    strapTexture.repeat.set(1, 3);

    // Lanyard Strap Visual Mesh (Smooth CatmullRom Tube)
    const curve = new THREE.CatmullRomCurve3(nodes);
    let tubeGeo = new THREE.TubeGeometry(curve, 36, 0.02, 8, false);

    const strapMat = new THREE.MeshStandardMaterial({
      map: strapTexture,
      roughness: 0.65,
      metalness: 0.15
    });

    const strapMesh = new THREE.Mesh(tubeGeo, strapMat);
    strapMesh.castShadow = true;
    scene.add(strapMesh);

    // Ceiling Anchor Mount
    const hookGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 16);
    const hookMesh = new THREE.Mesh(hookGeo, metalMat);
    hookMesh.position.set(0, anchorY + 0.02, 0);
    scene.add(hookMesh);

    // 7. Interactive Draggable Physics (Touch + Mouse Pointer)
    let isDragging = false;
    const grabOffset = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const planeIntersect = new THREE.Vector3();

    // Rotational momentum & inertia
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

      // Check intersect with card, clip, or hit box
      const hits = raycaster.intersectObjects([hitboxMesh, cardMesh, clipMesh, ringMesh], true);
      if (hits.length > 0) {
        isDragging = true;
        canvas.style.cursor = 'grabbing';

        const hitPoint = hits[0].point;
        dragPlane.constant = -hitPoint.z;
        raycaster.ray.intersectPlane(dragPlane, planeIntersect);

        // Vector from hit point to the ring attachment node
        grabOffset.copy(nodes[nodeCount - 1]).sub(planeIntersect);

        lastDragX = e.clientX;
        lastDragTime = performance.now();
        prevMousePos.copy(planeIntersect);
        dragVelocity.set(0, 0, 0);

        if (canvas.setPointerCapture) {
          try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        }
      }
    }

    function onPointerMove(e) {
      updateMouseCoords(e.clientX, e.clientY);

      if (!isDragging) {
        // Hover cursor check
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects([hitboxMesh, cardMesh, clipMesh], true);
        canvas.style.cursor = hits.length > 0 ? 'grab' : 'default';
        return;
      }

      raycaster.setFromCamera(mouse, camera);
      if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
        const now = performance.now();
        const dt = Math.max((now - lastDragTime) / 1000, 0.001);

        // Calculate drag velocity for flick physics
        dragVelocity.copy(planeIntersect).sub(prevMousePos).divideScalar(dt);
        prevMousePos.copy(planeIntersect);

        // Horizontal flick imparts rotation to spin the badge
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

        // Apply release inertia to end node
        const endNode = nodes[nodeCount - 1];
        const velImpulse = dragVelocity.clone().clampLength(0, 3.5).multiplyScalar(0.016);
        endNode.add(velImpulse);

        if (canvas.releasePointerCapture) {
          try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        }
      }
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Double-click to flip card
    canvas.addEventListener('dblclick', () => {
      rotVelY += Math.PI * 4;
    });

    // Touch support for mobile devices with double-tap detection
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) onPointerDown(e.touches[0]);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) onPointerMove(e.touches[0]);
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const now = performance.now();
      if (now - lastTap < 350 && now - lastTap > 0) {
        rotVelY += Math.PI * 4; // Flip on double tap
      }
      lastTap = now;
      onPointerUp(e);
    });

    // 8. REALTIME PHYSICS INTEGRATION LOOP (Verlet Relaxation + 3D Pendulum)
    let clock = new THREE.Clock();
    let breezeTime = 0;
    const cardPrevPos = nodes[nodeCount - 1].clone();
    const targetEuler = new THREE.Euler(0, 0, 0, 'YXZ');
    const targetQuat = new THREE.Quaternion();

    function stepPhysics() {
      const dt = Math.min(clock.getDelta(), 0.033);
      breezeTime += dt;

      // Gentle natural breeze when idle
      const breezeX = Math.sin(breezeTime * 1.1) * 0.035 + Math.sin(breezeTime * 2.3) * 0.015;
      const breezeZ = Math.cos(breezeTime * 0.8) * 0.025;

      // Pin first node to top anchor
      nodes[0].set(0, anchorY, 0);

      // Gravity & Verlet update for rope nodes
      for (let i = 1; i < nodeCount; i++) {
        const vel = nodes[i].clone().sub(prevNodes[i]).multiplyScalar(0.975); // Damping
        prevNodes[i].copy(nodes[i]);

        // Gravity
        vel.y -= 9.8 * dt * dt * 0.8;
        vel.x += breezeX * dt;
        vel.z += breezeZ * dt;

        nodes[i].add(vel);
      }

      // If user is dragging the card
      if (isDragging) {
        const targetEnd = planeIntersect.clone().add(grabOffset);
        // Clamp to prevent out-of-screen stretch
        targetEnd.x = THREE.MathUtils.clamp(targetEnd.x, -1.7, 1.7);
        targetEnd.y = THREE.MathUtils.clamp(targetEnd.y, -1.3, 1.1);
        targetEnd.z = THREE.MathUtils.clamp(targetEnd.z, -0.6, 0.8);

        nodes[nodeCount - 1].lerp(targetEnd, 0.55);
      }

      // Relax constraints (Rope tension - 10 iterations)
      for (let iter = 0; iter < 10; iter++) {
        nodes[0].set(0, anchorY, 0); // Pin top

        for (let i = 0; i < nodeCount - 1; i++) {
          const p1 = nodes[i];
          const p2 = nodes[i + 1];
          const delta = p2.clone().sub(p1);
          const dist = delta.length();
          if (dist > 0.00001) {
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

      // 9. Synchronize Card Rigid Body with Last Rope Node
      const endNode = nodes[nodeCount - 1];
      const prevNode = nodes[nodeCount - 2];

      // Card hangs strictly with its top ring at endNode
      cardGroup.position.copy(endNode);

      // Rope direction vector at connection point
      const ropeDir = endNode.clone().sub(prevNode).normalize();

      // Pendulum tilt from rope angle
      const rollAngle = Math.atan2(ropeDir.x, -ropeDir.y);
      const pitchAngle = Math.atan2(ropeDir.z, -ropeDir.y);

      // Dynamic inertia from movement velocity
      const vel = endNode.clone().sub(cardPrevPos);
      cardPrevPos.copy(endNode);

      const dynRoll = rollAngle - vel.x * 7.5;
      const dynPitch = pitchAngle + vel.y * 5.0;

      // Spin / Yaw physics (Torsional spring back to 0)
      rotY += rotVelY * dt;
      rotVelY *= 0.94; // Angular damping
      rotVelY += (0 - rotY) * 5.5 * dt; // Torsion return spring

      // Combine rotations smoothly
      targetEuler.set(dynPitch, rotY, dynRoll, 'YXZ');
      targetQuat.setFromEuler(targetEuler);
      cardGroup.quaternion.slerp(targetQuat, 0.22);

      // 10. Update Curved Rope Geometry
      curve.points = nodes;
      strapMesh.geometry.dispose();
      strapMesh.geometry = new THREE.TubeGeometry(curve, 36, 0.02, 8, false);

      renderer.render(scene, camera);
      requestAnimationFrame(stepPhysics);
    }

    stepPhysics();

    // Responsive Canvas Resize Handler
    function handleResize() {
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 620;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);
  }
})();
