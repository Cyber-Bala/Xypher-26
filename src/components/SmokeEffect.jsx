import { useEffect, useRef } from "react";






const SmokeEffect = ({ density = 60 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    const particles =


    [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const spawn = () => {
      const maxLife = 150 + Math.random() * 100;
      particles.push({
        x: Math.random() * w(),
        y: h() + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(0.3 + Math.random() * 1.0),
        radius: 40 + Math.random() * 80,
        opacity: 0,
        life: 0,
        maxLife
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      if (particles.length < density && Math.random() < 0.5) spawn();
      if (particles.length < density && Math.random() < 0.3) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.06;
        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.25 ? progress / 0.25 * 0.35 : 0.35 * (1 - (progress - 0.25) / 0.75);
        p.radius += 0.4;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(130, 40, 200, ${p.opacity})`);
        grad.addColorStop(0.3, `rgba(100, 20, 160, ${p.opacity * 0.7})`);
        grad.addColorStop(0.6, `rgba(60, 10, 120, ${p.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(30, 0, 60, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-10`} />);


};

export default SmokeEffect;