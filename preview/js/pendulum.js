// Live pendulum wave (Lab 001). Pendulum i makes (18 + i) swings in 24 seconds. Drag sideways to pull them back, let go to release.
(() => { const c = document.getElementById('wave'); if (!c) return; const g = c.getContext('2d'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nIn = document.getElementById('wave-n'), out = document.getElementById('wave-t'), sBtn = document.getElementById('wave-sound'), PENT = [0, 3, 5, 7, 10];
  let N = 15, t0 = performance.now(), W, H, d, pull = 1, drag = false, ac = null, sound = false, lastK = [], seen = false;
  const size = () => { d = Math.min(2, devicePixelRatio || 1); W = c.clientWidth; H = c.clientHeight; c.width = W * d; c.height = H * d; }; size(); addEventListener('resize', size);
  const fr = i => (18 + i * 14 / Math.max(1, N - 1)) / 24;
  const note = i => { if (!sound || !ac) return; const k = Math.round(i * 14 / Math.max(1, N - 1)), o = ac.createOscillator(), a = ac.createGain(), n = ac.currentTime;
    o.type = 'triangle'; o.frequency.value = 220 * Math.pow(2, (PENT[k % 5] + 12 * Math.floor(k / 5)) / 12); a.gain.setValueAtTime(0, n); a.gain.linearRampToValueAtTime(.16, n + .008); a.gain.exponentialRampToValueAtTime(.0008, n + .9); o.connect(a).connect(ac.destination); o.start(n); o.stop(n + .95); };
  const draw = now => { const t = drag ? 0 : (now - t0) / 1000, cx = W / 2, top = 30, gap = (H - 60) / (N - 1), R = Math.max(5, Math.min(12, gap * .42));
    g.setTransform(d, 0, 0, d, 0, 0); g.fillStyle = drag || t < .05 ? 'rgba(10,15,42,1)' : 'rgba(10,15,42,.3)'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(160,175,255,.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, 14); g.lineTo(cx, H - 14); g.stroke();
    for (let i = 0; i < N; i++) { const f = fr(i), amp = Math.min(W * .43, 170) * (.5625 / (f * f)), x = cx + amp * pull * Math.cos(2 * Math.PI * f * t), y = top + (N - 1 - i) * gap, hue = (25 + i * 280 / N) % 360;
      g.strokeStyle = 'rgba(255,255,255,.22)'; g.lineWidth = 1; g.beginPath(); g.moveTo(cx, y); g.lineTo(x, y); g.stroke();
      g.shadowColor = `hsl(${hue} 95% 60%)`; g.shadowBlur = 18; g.fillStyle = `hsl(${hue} 92% 64%)`; g.beginPath(); g.arc(x, y, R, 0, 7); g.fill(); g.shadowBlur = 0;
      g.fillStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.arc(x - R * .3, y - R * .3, R * .28, 0, 7); g.fill();
      if (!drag) { const k = Math.floor(t * f + 1e-6); if (lastK[i] !== undefined && k > lastK[i]) note(i); lastK[i] = k; } }
    if (out) out.textContent = drag ? 'Let go' : 'Back in step in ' + (24 - (t % 24)).toFixed(1) + ' s';
    if (!still || drag) requestAnimationFrame(draw); };
  const go = () => { t0 = performance.now(); lastK = []; requestAnimationFrame(draw); };
  const at = e => { const r = c.getBoundingClientRect(); pull = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / (r.width * .43))); if (Math.abs(pull) < .15) pull = pull < 0 ? -.15 : .15; };
  c.addEventListener('pointerdown', e => { drag = true; c.setPointerCapture(e.pointerId); at(e); requestAnimationFrame(draw); });
  c.addEventListener('pointermove', e => { if (drag) at(e); });
  const up = () => { if (drag) { drag = false; go(); } }; c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
  document.getElementById('wave-restart')?.addEventListener('click', () => { pull = 1; go(); });
  sBtn?.addEventListener('click', () => { sound = !sound; if (sound && !ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac && sound) ac.resume(); sBtn.textContent = sound ? 'Sound on' : 'Sound off'; sBtn.setAttribute('aria-pressed', sound); });
  nIn?.addEventListener('input', () => { N = +nIn.value; document.getElementById('wave-nv').textContent = N; go(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { if (es[0].isIntersecting && !seen) { seen = true; go(); } }, { threshold: .4 }).observe(c); else go();
  requestAnimationFrame(draw); })();
