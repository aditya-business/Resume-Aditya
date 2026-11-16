import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 300;
const getFramePath = (index: number) =>
  `/frames/frame_${String(index + 1).padStart(4, '0')}.jpg`;

export function BackgroundScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let isMounted = true;
    let rafId: number | null = null;
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const decoded = new Uint8Array(FRAME_COUNT);

    let lastDrawKey = '';
    let target = 0;
    let current = 0;
    let lastTime = performance.now();

    /* ---------- Sizing & Device Pixel Ratio ---------- */
    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      ctx.imageSmoothingQuality = 'high';
      lastDrawKey = '';
      if (frames[0] || frames[Math.floor(current)]) {
        render(current);
      }
    };

    /* ---------- Cover-fit Image Drawing ---------- */
    const drawImage = (img: HTMLImageElement, alpha: number) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s;
      const h = ih * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    /* Find nearest loaded frame to prevent blank flashes */
    const findNearest = (index: number) => {
      if (frames[index]) return index;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (index - d >= 0 && frames[index - d]) return index - d;
        if (index + d < FRAME_COUNT && frames[index + d]) return index + d;
      }
      return -1;
    };

    /* ---------- Render with sub-frame interpolation ---------- */
    const render = (pos: number) => {
      const a = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(pos)));
      const b = Math.min(FRAME_COUNT - 1, a + 1);
      let t = pos - a;
      if (t < 0.002) t = 0;

      const ia = findNearest(a);
      if (ia < 0) return;
      const ib = t > 0 ? findNearest(b) : -1;

      const key = `${ia}|${ib}|${t.toFixed(3)}`;
      if (key === lastDrawKey) return;
      lastDrawKey = key;

      const imgA = frames[ia];
      if (imgA) drawImage(imgA, 1);

      if (ib >= 0 && ib !== ia) {
        const imgB = frames[ib];
        if (imgB) drawImage(imgB, t);
      }
      ctx.globalAlpha = 1;
    };

    /* ---------- Scroll reading ---------- */
    const readScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      target = progress * (FRAME_COUNT - 1);
    };

    /* ---------- Pre-warm decode window ---------- */
    const warm = (center: number) => {
      const radius = 32;
      const lo = Math.max(0, Math.floor(center) - radius);
      const hi = Math.min(FRAME_COUNT - 1, Math.floor(center) + radius);
      for (let i = lo; i <= hi; i++) {
        const img = frames[i];
        if (img && !decoded[i]) {
          decoded[i] = 1;
          img.decode().catch(() => {});
        }
      }
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (decoded[i] && (i < lo - 70 || i > hi + 70)) decoded[i] = 0;
      }
    };

    /* ---------- Animation Tick Loop ---------- */
    const tick = (now: number) => {
      if (!isMounted) return;
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      // Smooth exponential easing
      const k = 1 - Math.exp(-dt * 9);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.003) current = target;

      warm(current);
      render(current);

      rafId = requestAnimationFrame(tick);
    };

    /* ---------- Progressive Coarse-to-Fine Loading ---------- */
    const generateLoadOrder = () => {
      const seen = new Set<number>();
      const order: number[] = [];
      const push = (i: number) => {
        if (i < FRAME_COUNT && !seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      };
      push(0);
      for (const step of [60, 30, 15, 6, 3, 1]) {
        for (let i = 0; i < FRAME_COUNT; i += step) push(i);
      }
      push(FRAME_COUNT - 1);
      return order;
    };

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!isMounted) return resolve();
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!isMounted) return resolve();
          frames[index] = img;
          lastDrawKey = '';
          resolve();
        };
        img.onerror = () => resolve();
        img.src = getFramePath(index);
      });
    };

    const loadAllFrames = async () => {
      const order = generateLoadOrder();
      let cursor = 0;

      // Reveal canvas immediately upon frame 0 load
      await loadFrame(order[cursor++]);
      if (!isMounted) return;
      setIsReady(true);
      render(current);

      // Concurrent parallel batch workers
      const workers = Array.from({ length: 6 }, async () => {
        while (cursor < order.length && isMounted) {
          const idx = order[cursor++];
          if (idx !== undefined) {
            await loadFrame(idx);
          }
        }
      });
      await Promise.all(workers);
    };

    /* ---------- Reduced Motion Check ---------- */
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', readScroll, { passive: true });

    resize();
    readScroll();
    current = target;

    if (prefersReducedMotion) {
      loadFrame(0).then(() => {
        if (isMounted) {
          setIsReady(true);
          render(0);
        }
      });
    } else {
      rafId = requestAnimationFrame(tick);
      loadAllFrames();
    }

    return () => {
      isMounted = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-1000 ease-out ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ display: 'block' }}
      />
      {/* 
        Tasteful dark tint overlay: allows the background 3D scroll animation 
        to shine through vividly while keeping text contrast strictly WCAG AAA.
      */}
      <div className="absolute inset-0 bg-[#212428]/60 backdrop-blur-[0.5px]" />
    </div>
  );
}
