import React, { useEffect, useRef } from 'react';
import { MessageCircle, ArrowRight, Star, GraduationCap } from 'lucide-react';

const AnimatedGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let angle = 0;

    const dots: { lat: number; lng: number; size: number; opacity: number }[] = [
      { lat: 37.5, lng: 127, size: 5, opacity: 1 },
      { lat: 51.5, lng: -0.1, size: 5, opacity: 1 },
      { lat: 40.7, lng: -74, size: 5, opacity: 1 },
      { lat: 43.7, lng: -79.4, size: 4, opacity: 1 },
      { lat: 3.1, lng: 101.7, size: 4, opacity: 1 },
      { lat: 35.1, lng: 136.9, size: 4, opacity: 1 },
      { lat: 48.9, lng: 2.3, size: 4, opacity: 1 },
      { lat: 52.5, lng: 13.4, size: 4, opacity: 1 },
      { lat: 23.8, lng: 90.4, size: 7, opacity: 1 },
      { lat: 35.0, lng: 33.0, size: 3, opacity: 1 },
      ...Array.from({ length: 60 }, () => ({
        lat: (Math.random() * 160) - 80,
        lng: (Math.random() * 360) - 180,
        size: 1.5,
        opacity: 0.3,
      })),
    ];

    const arcPairs = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,6],[8,9]];

    function project(lat: number, lng: number, rotY: number, size: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + rotY) * (Math.PI / 180);
      const x = size * Math.sin(phi) * Math.cos(theta);
      const y = size * Math.cos(phi);
      const z = size * Math.sin(phi) * Math.sin(theta);
      return { x, y, z };
    }

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.38;
      ctx!.clearRect(0, 0, W, H);

      const grad = ctx!.createRadialGradient(cx - R*0.3, cy - R*0.3, R*0.1, cx, cy, R);
      grad.addColorStop(0, 'rgba(30,58,138,0.18)');
      grad.addColorStop(1, 'rgba(10,20,80,0.08)');
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = grad;
      ctx!.fill();
      ctx!.strokeStyle = 'rgba(99,140,255,0.2)';
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx!.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = project(lat, lng, angle, R);
          if (p.z > 0) {
            const sx = cx + p.x, sy = cy - p.y;
            if (first) { ctx!.moveTo(sx, sy); first = false; } else ctx!.lineTo(sx, sy);
          } else { first = true; }
        }
        ctx!.strokeStyle = 'rgba(99,140,255,0.12)';
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
      }

      for (let lng = 0; lng < 360; lng += 30) {
        ctx!.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = project(lat, lng, angle, R);
          if (p.z > 0) {
            const sx = cx + p.x, sy = cy - p.y;
            if (first) { ctx!.moveTo(sx, sy); first = false; } else ctx!.lineTo(sx, sy);
          } else { first = true; }
        }
        ctx!.strokeStyle = 'rgba(99,140,255,0.12)';
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
      }

      arcPairs.forEach(([from, to]) => {
        const a = dots[from], b = dots[to];
        const pa = project(a.lat, a.lng, angle, R);
        const pb = project(b.lat, b.lng, angle, R);
        if (pa.z > 0 && pb.z > 0) {
          const ax = cx+pa.x, ay = cy-pa.y, bx = cx+pb.x, by = cy-pb.y;
          const mx = (ax+bx)/2, my = (ay+by)/2;
          const dist = Math.sqrt((bx-ax)**2+(by-ay)**2);
          const arcGrad = ctx!.createLinearGradient(ax,ay,bx,by);
          arcGrad.addColorStop(0, 'rgba(239,68,68,0.8)');
          arcGrad.addColorStop(1, 'rgba(99,140,255,0.4)');
          ctx!.beginPath();
          ctx!.moveTo(ax, ay);
          ctx!.quadraticCurveTo(mx, my - dist*0.35, bx, by);
          ctx!.strokeStyle = arcGrad;
          ctx!.lineWidth = 1.2;
          ctx!.setLineDash([4,4]);
          ctx!.stroke();
          ctx!.setLineDash([]);
        }
      });

      dots.forEach((d, i) => {
        const p = project(d.lat, d.lng, angle, R);
        if (p.z > 0) {
          const sx = cx+p.x, sy = cy-p.y;
          const isDhaka = i === 8;
          const isHub = i < 9;
          if (isDhaka) {
            const pulse = Math.sin(Date.now()/400)*0.5+0.5;
            ctx!.beginPath();
            ctx!.arc(sx, sy, d.size*3*pulse+d.size, 0, Math.PI*2);
            ctx!.fillStyle = `rgba(239,68,68,${0.15*pulse})`;
            ctx!.fill();
          }
          ctx!.beginPath();
          ctx!.arc(sx, sy, d.size, 0, Math.PI*2);
          ctx!.fillStyle = isDhaka ? 'rgba(239,68,68,1)' : isHub ? 'rgba(147,197,253,0.9)' : `rgba(99,140,255,${d.opacity})`;
          ctx!.fill();
        }
      });

      angle += 0.2;
      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return <canvas ref={canvasRef} width={520} height={520} className="w-full h-full" />;
};

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full border border-slate-100 opacity-50" />
        <div className="absolute top-[5%] right-[-5%] w-[400px] h-[400px] rounded-full border border-slate-100 opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full border border-slate-50 opacity-50" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#0f172a 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Keystone Overseas & Academy</span>
            </div>
            <p className="text-brand-blue font-medium italic mb-2 tracking-wide">"Where global dreams begin."</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Your Gateway to <span className="text-brand-blue">Global Education.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Empowering Bangladeshi students to achieve their international education goals with excellence.
              We provide expert counseling and visa processing for top universities in Cyprus, Romania, Malaysia, South Korea, Hungary, and Canada.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-blue-dark text-white px-8 py-4 rounded-full font-semibold transition-all hover:bg-brand-blue hover:shadow-xl active:scale-95 group"
              >
                <MessageCircle size={20} className="text-green-400" />
                Start Your Journey
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#academy"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 rounded-full font-semibold transition-all hover:bg-red-700 hover:shadow-xl active:scale-95"
              >
                Language Academy
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 py-4 border-t border-slate-100">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={14} className="fill-blue-600 text-brand-blue" />)}
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  Trusted by <span className="text-slate-900 font-bold">500+ Students</span> across Bangladesh
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-xl lg:max-w-none flex items-center justify-center">
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="relative w-[320px] h-[320px] lg:w-[440px] lg:h-[440px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-transparent blur-2xl opacity-70" />
                <AnimatedGlobe />
                <div className="absolute top-4 right-0 bg-white shadow-lg border border-slate-100 rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 animate-bounce" style={{animationDuration:'3s'}}>
                  🇨🇾 Cyprus (No India Trip)
                </div>
                <div className="absolute bottom-10 right-0 bg-white shadow-lg border border-slate-100 rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 animate-bounce" style={{animationDuration:'4s',animationDelay:'0.5s'}}>
                  🇷🇴 Romania (0 IELTS)
                </div>
                <div className="absolute bottom-10 left-0 bg-white shadow-lg border border-slate-100 rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 animate-bounce" style={{animationDuration:'3.5s',animationDelay:'1s'}}>
                  🇰🇷 South Korea
                </div>
                <div className="absolute top-4 left-0 bg-white shadow-lg border border-slate-100 rounded-2xl px-3 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 animate-bounce" style={{animationDuration:'4.5s',animationDelay:'0.2s'}}>
                  🇲🇾 Malaysia (Fast eVAL)
                </div>
              </div>

              <div className="mt-4 bg-white shadow-xl border border-slate-100 rounded-2xl px-6 py-4 flex items-center gap-4">
                <div className="bg-brand-blue p-3 rounded-xl text-white">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-blue uppercase tracking-wider">Success Rate</p>
                  <p className="text-lg font-bold text-slate-900">98% Visa Approval</p>
                </div>
                <div className="ml-4 pl-4 border-l border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Since</p>
                  <p className="text-lg font-bold text-slate-900">2022</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-full h-full bg-blue-50 rounded-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
