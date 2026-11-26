// Live pendulum wave. The same rule as Lab 001: pendulum i makes (18 + i) swings in 24 seconds.
(() => { const c = document.getElementById('wave'); if (!c) return; const g = c.getContext('2d'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nIn = document.getElementById('wave-n'), out = document.getElementById('wave-t'); let N = 15, t0 = performance.now(), run = !still, W, H, d;
  const size = () => { d = Math.min(2, devicePixelRatio || 1); W = c.clientWidth; H = c.clientHeight; c.width = W * d; c.height = H * d; }; size(); addEventListener('resize', size);
  const draw = now => { const t = (now - t0) / 1000; g.setTransform(d, 0, 0, d, 0, 0); g.clearRect(0, 0, W, H);
    const top = 26, gap = (H - 52) / (N - 1), cx = W / 2; g.strokeStyle = 'rgba(160,175,255,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx, 12); g.lineTo(cx, H - 12); g.stroke();
    for (let i = 0; i < N; i++) { const f = (18 + i * 14 / Math.max(1, N - 1)) / 24, L = 1 / (f * f), amp = Math.min(W * .42, 150) * L / (1 / (.75 * .75)), x = cx + amp * Math.cos(2 * Math.PI * f * t), y = top + (N - 1 - i) * gap;
      g.strokeStyle = 'rgba(255,255,255,.28)'; g.lineWidth = 1; g.beginPath(); g.moveTo(cx, y); g.lineTo(x, y); g.stroke();
      g.fillStyle = `hsl(${(25 + i * 280 / N) % 360} 90% 62%)`; g.beginPath(); g.arc(x, y, Math.max(5, Math.min(11, gap * .42)), 0, 7); g.fill(); }
    if (out) { const left = 24 - (t % 24); out.textContent = 'Back in step in ' + left.toFixed(1) + ' s'; }
    if (run) requestAnimationFrame(draw); };
  const restart = () => { t0 = performance.now(); if (!run) { run = true; } requestAnimationFrame(draw); };
  c.addEventListener('click', restart); document.getElementById('wave-restart')?.addEventListener('click', restart);
  nIn?.addEventListener('input', () => { N = +nIn.value; document.getElementById('wave-nv').textContent = N; restart(); });
  requestAnimationFrame(draw); })();
