/* ===================================================================
   3D INTERACTIVE LANYARD BADGE ENGINE (Three.js + Verlet Physics)
   Exact realistic draggable physics card inspired by alfari.my.id
   Tailored for Angel Bard Laklo, S.Kom (Vibe Coder)
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
    // 1. Clean existing static badge if present
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
    container.appendChild(canvas);

    // 2. Three.js Scene, Camera, Renderer
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

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

    // 3. Lighting Setup (Cyberpunk & Holographic reflections)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.4);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2c67ed, 1.2);
    dirLight2.position.set(-4, -2, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xec4899, 1.5, 10);
    pointLight.position.set(0, -1, 2.5);
    scene.add(pointLight);

    // 4. Card Front Texture Generation (High-res 2D Canvas)
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 1024;
    cardCanvas.height = 1536;
    const ctx = cardCanvas.getContext('2d');

    // Create Card Texture
    const profileImg = new Image();
    profileImg.crossOrigin = 'anonymous';
    profileImg.src = 'assets/img/profile-img.jpg';

    function drawCardTexture() {
      // Dark cyber metallic background
      const grad = ctx.createLinearGradient(0, 0, 1024, 1536);
      grad.addColorStop(0, '#090e24');
      grad.addColorStop(0.5, '#050713');
      grad.addColorStop(1, '#0c1330');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1536);

      // Cyber Grid lines subtle
      ctx.strokeStyle = 'rgba(44, 103, 237, 0.12)';
      ctx.lineWidth = 2;
      for (let x = 0; x < 1024; x += 64) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1536); ctx.stroke();
      }
      for (let y = 0; y < 1536; y += 64) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
      }

      // Neon Cyan Outer Border
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 8;
      ctx.strokeRect(32, 32, 960, 1472);

      // Inner Accent Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, 928, 1440);

      // Header Tag Pill
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(80, 80, 864, 90, 45);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ABL // VIBE CODER', 130, 138);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('• ONLINE 2026', 890, 136);

      // Profile Photo Frame
      const photoSize = 420;
      const photoX = (1024 - photoSize) / 2;
      const photoY = 220;

      // Glow circle behind photo
      const radGrad = ctx.createRadialGradient(512, photoY + photoSize / 2, 50, 512, photoY + photoSize / 2, 260);
      radGrad.addColorStop(0, 'rgba(0, 240, 255, 0.5)');
      radGrad.addColorStop(0.6, 'rgba(44, 103, 237, 0.3)');
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
      ctx.lineWidth = 12;
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

      // NFC Waves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(260, 725, 20, -0.8, 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(260, 725, 36, -0.8, 0.8);
      ctx.stroke();

      // Name & Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Angel Bard Laklo, S.Kom', 512, 850);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText('Healthcare Systems Specialist', 512, 915);

      // Meta Data Box
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
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

    // 5. Back Card Texture (Holographic QR & Credentials)
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

    bCtx.fillStyle = '#ffffff';
    bCtx.font = 'bold 48px "Space Grotesk", sans-serif';
    bCtx.textAlign = 'center';
    bCtx.fillText('ANGEL BARD LAKLO', 512, 220);

    bCtx.fillStyle = '#00f0ff';
    bCtx.font = '32px "JetBrains Mono", monospace';
    bCtx.fillText('“Fortis Solus Stabit”', 512, 280);

    bCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    bCtx.font = '28px "Space Grotesk", sans-serif';
    bCtx.fillText('Healthcare Systems & Full-Stack Solutions', 512, 350);

    // Giant QR code graphic representation
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(256, 460, 512, 512);
    bCtx.fillStyle = '#050713';
    bCtx.fillRect(280, 484, 464, 464);

    bCtx.fillStyle = '#00f0ff';
    bCtx.fillRect(320, 524, 120, 120);
    bCtx.fillRect(584, 524, 120, 120);
    bCtx.fillRect(320, 788, 120, 120);
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(350, 554, 60, 60);
    bCtx.fillRect(614, 554, 60, 60);
    bCtx.fillRect(350, 818, 60, 60);

    // Random QR data blocks
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if ((r + c) % 2 === 0) {
          bCtx.fillRect(470 + c * 24, 524 + r * 24, 18, 18);
        }
      }
    }

    bCtx.fillStyle = '#94a3b8';
    bCtx.font = '28px "JetBrains Mono", monospace';
    bCtx.fillText('SCAN TO CONNECT WITH ME', 512, 1050);

    bCtx.fillStyle = '#00f0ff';
    bCtx.font = 'bold 36px "Space Grotesk", sans-serif';
    bCtx.fillText('https://angelbardlaklo.vercel.app', 512, 1140);

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 6. Build Card 3D Mesh
    const cardWidth = 1.05;
    const cardHeight = 1.55;
    const cardDepth = 0.03;

    // Card Geometry
    const cardGeo = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }), // right
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }), // left
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }), // top
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.8, roughness: 0.2 }), // bottom
      new THREE.MeshStandardMaterial({
        map: cardTexture,
        metalness: 0.35,
        roughness: 0.25
      }), // front
      new THREE.MeshStandardMaterial({
        map: backTexture,
        metalness: 0.45,
        roughness: 0.3
      })  // back
    ];

    const cardMesh = new THREE.Mesh(cardGeo, materials);
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;

    // Metal Clip at Top
    const clipGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.12, 16);
    const clipMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.1 });
    const clipMesh = new THREE.Mesh(clipGeo, clipMat);
    clipMesh.position.set(0, cardHeight / 2 + 0.04, 0);
    clipMesh.rotation.z = Math.PI / 2;

    const ringGeo = new THREE.TorusGeometry(0.05, 0.015, 12, 24);
    const ringMesh = new THREE.Mesh(ringGeo, clipMat);
    ringMesh.position.set(0, cardHeight / 2 + 0.1, 0);

    // Card Assembly Group
    const cardGroup = new THREE.Group();
    cardGroup.add(cardMesh);
    cardGroup.add(clipMesh);
    cardGroup.add(ringMesh);
    scene.add(cardGroup);

    // 7. Lanyard Strap Chain with Dynamic Physics (10 Verlet Nodes)
    const nodeCount = 10;
    const anchorY = 1.65;
    const restLength = 1.35;
    const segmentLength = restLength / nodeCount;

    const nodes = [];
    const prevNodes = [];

    for (let i = 0; i <= nodeCount; i++) {
      const y = anchorY - i * segmentLength;
      nodes.push(new THREE.Vector3(0, y, 0));
      prevNodes.push(new THREE.Vector3(0, y, 0));
    }

    // Card rigid body physics
    const cardPos = nodes[nodeCount];
    let cardVel = new THREE.Vector3(0, 0, 0);
    let cardPrevPos = cardPos.clone();
    let cardQuat = new THREE.Quaternion();
    let cardAngVel = new THREE.Vector3(0, 0, 0);

    // Strap Mesh (CatmullRomCurve3 Tube)
    const curve = new THREE.CatmullRomCurve3(nodes);
    let tubeGeo = new THREE.TubeGeometry(curve, 32, 0.024, 8, false);

    // Strap Material with woven pattern
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.1
    });

    const strapMesh = new THREE.Mesh(tubeGeo, strapMat);
    strapMesh.castShadow = true;
    scene.add(strapMesh);

    // Top Ceiling Anchor Hook
    const hookGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.1, 16);
    const hookMesh = new THREE.Mesh(hookGeo, clipMat);
    hookMesh.position.set(0, anchorY, 0);
    scene.add(hookMesh);

    // 8. INTERACTIVE POINTER DRAG & PHYSICS (Exact alfari.my.id feel)
    let isDragging = false;
    let dragPoint = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function updateMousePos(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onPointerDown(e) {
      updateMousePos(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse, camera);

      // Raycast against card or plane
      const intersects = raycaster.intersectObject(cardMesh);
      if (intersects.length > 0 || Math.abs(mouse.x) < 0.6) {
        isDragging = true;
        canvas.style.cursor = 'grabbing';
        raycaster.ray.intersectPlane(planeZ, dragPoint);
        if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
      }
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      updateMousePos(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(planeZ, dragPoint);
    }

    function onPointerUp(e) {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = 'grab';
        if (canvas.releasePointerCapture) canvas.releasePointerCapture(e.pointerId);
      }
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        onPointerMove(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);

    // 9. REALTIME PHYSICS INTEGRATION LOOP (Verlet Relaxation + Pendulum)
    let clock = new THREE.Clock();
    let breezeTime = 0;

    function stepPhysics() {
      const dt = Math.min(clock.getDelta(), 0.033);
      breezeTime += dt;

      // Natural gentle breeze when not dragging
      const breezeX = Math.sin(breezeTime * 0.8) * 0.04 + Math.sin(breezeTime * 1.7) * 0.02;
      const breezeZ = Math.cos(breezeTime * 0.6) * 0.03;

      // Pin first node to anchor
      nodes[0].set(0, anchorY, 0);

      // Gravity & Verlet update for rope nodes
      for (let i = 1; i <= nodeCount; i++) {
        const vel = nodes[i].clone().sub(prevNodes[i]).multiplyScalar(0.96); // damping
        prevNodes[i].copy(nodes[i]);

        // Gravity
        vel.y -= 9.8 * dt * dt * 0.7;
        vel.x += breezeX * dt;
        vel.z += breezeZ * dt;

        nodes[i].add(vel);
      }

      // If user is dragging the card
      if (isDragging && dragPoint) {
        // Clamp drag range so it doesn't break
        const clampedX = THREE.MathUtils.clamp(dragPoint.x, -1.8, 1.8);
        const clampedY = THREE.MathUtils.clamp(dragPoint.y, -1.2, 1.2);
        const clampedZ = THREE.MathUtils.clamp(dragPoint.z, -0.6, 0.8);

        nodes[nodeCount].lerp(new THREE.Vector3(clampedX, clampedY, clampedZ), 0.45);
      }

      // Relax constraints (Rope tension - 8 iterations)
      for (let iter = 0; iter < 10; iter++) {
        nodes[0].set(0, anchorY, 0); // Pin top

        for (let i = 0; i < nodeCount; i++) {
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

      // 10. Update Card Rigid Body Position & 3D Rotation
      const endNode = nodes[nodeCount];
      const prevNode = nodes[nodeCount - 1];

      // Card hangs below the last rope node
      cardGroup.position.copy(endNode);

      // Calculate tilt based on rope direction vector and inertia
      const dir = endNode.clone().sub(prevNode).normalize();
      const targetQuat = new THREE.Quaternion();

      // Look along rope direction
      const up = new THREE.Vector3(0, -1, 0);
      targetQuat.setFromUnitVectors(up, dir);

      // Add velocity tilt effect
      const vel = endNode.clone().sub(cardPrevPos);
      cardPrevPos.copy(endNode);

      const tiltZ = -vel.x * 12;
      const tiltX = vel.y * 8;
      const dynamicTilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(tiltX, 0, tiltZ));
      targetQuat.multiply(dynamicTilt);

      // Smooth rotation interpolation
      cardGroup.quaternion.slerp(targetQuat, 0.2);

      // 11. Update Curved Rope Geometry
      curve.points = nodes;
      strapMesh.geometry.dispose();
      strapMesh.geometry = new THREE.TubeGeometry(curve, 32, 0.022, 8, false);

      renderer.render(scene, camera);
      requestAnimationFrame(stepPhysics);
    }

    stepPhysics();

    // Resize Handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }
})();
