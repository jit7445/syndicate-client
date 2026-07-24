import { useEffect, useRef } from "react";

export function TranscriptWaveform({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    const seeds: number[] = [];
    const BAR_W = 5;
    const GAP = 5;
    let count = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      count = Math.ceil(w / (BAR_W + GAP));
      seeds.length = 0;
      for (let i = 0; i < count; i++) seeds.push(Math.random() * Math.PI * 2);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const start = performance.now();
    const RADIUS = 200;

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      const midY = h / 2;
      const { x: mx, active } = mouseRef.current;

      for (let i = 0; i < count; i++) {
        const x = i * (BAR_W + GAP) + GAP / 2;
        const phase = seeds[i];
        const osc = reduced ? 0.5 : Math.sin(t * 1.2 + phase) * 0.5 + 0.5;
        const baseH = h * 0.18 + osc * h * 0.62;

        // proximity influence
        let glow = 0;
        if (active) {
          const dx = x + BAR_W / 2 - mx;
          const d = Math.abs(dx);
          if (d < RADIUS) {
            glow = Math.pow(1 - d / RADIUS, 2);
          }
        }
        const barH = baseH * (1 + glow * 0.7);
        const alpha = 0.3 + glow * 0.3;

        ctx.fillStyle = `rgba(232,148,26,${alpha})`;
        const y = midY - barH / 2;
        const r = BAR_W / 2;
        // rounded rect
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + BAR_W - r, y);
        ctx.quadraticCurveTo(x + BAR_W, y, x + BAR_W, y + r);
        ctx.lineTo(x + BAR_W, y + barH - r);
        ctx.quadraticCurveTo(x + BAR_W, y + barH, x + BAR_W - r, y + barH);
        ctx.lineTo(x + r, y + barH);
        ctx.quadraticCurveTo(x, y + barH, x, y + barH - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();
      }



      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
