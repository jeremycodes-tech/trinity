import { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Zap, Globe, TrendingUp, BarChart3, PieChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Count-up hook ──────────────────────────────────────────────────────────
// Counts a DOM element's text from 0 → target over `duration` seconds,
// triggered once when the element enters the viewport.
function useCountUp(
  ref: React.RefObject<HTMLSpanElement | null>,
  target: number,
  suffix: string,
  duration = 2.2
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { val: 0 };
    let tween: gsap.core.Tween | null = null;
    let fired = false;

    const start = () => {
      if (fired) return;
      fired = true;
      tween = gsap.to(counter, {
        val: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          // display integer during count, decimal only for very small numbers
          const display = target % 1 === 0
            ? Math.round(counter.val)
            : counter.val.toFixed(1);
          el.textContent = `${display}${suffix}`;
        },
        onComplete: () => {
          el.textContent = `${target}${suffix}`;
        },
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [ref, target, suffix, duration]);
}

// ─── Stat Card ──────────────────────────────────────────────────────────────
interface StatConfig {
  numTarget: number;
  numSuffix: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  bg: 'orange' | 'black' | 'white';
}

const StatCard = ({ stat }: { stat: StatConfig }) => {
  const numRef = useRef<HTMLSpanElement>(null);
  useCountUp(numRef, stat.numTarget, stat.numSuffix);

  const bgClass =
    stat.bg === 'orange' ? 'bg-[#FF5F00] text-white'
      : stat.bg === 'black' ? 'bg-black/40 backdrop-blur-md border border-white/10 text-white'
        : 'bg-white/5 backdrop-blur-md border border-white/10 text-white';

  const iconBg =
    stat.bg === 'orange' ? 'bg-white/20'
      : stat.bg === 'black' ? 'bg-white/10'
        : 'bg-white/10';

  return (
    <div className={`rounded-2xl p-6 lg:p-8 ${bgClass}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
          <stat.icon className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        {/* The animated number lives here */}
        <span ref={numRef} className="stat-number">0{stat.numSuffix}</span>
        {stat.label && (
          <span className="text-xl lg:text-2xl font-medium opacity-80 ml-1">{stat.label}</span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-white/70">
        {stat.desc}
      </p>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', end: 'top 50%', scrub: true }
        }
      );

      const statCards = statsRef.current?.children || [];
      gsap.fromTo(statCards,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: statsRef.current, start: 'top 75%', end: 'top 45%', scrub: true }
        }
      );

      gsap.fromTo(graphRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8,
          scrollTrigger: { trigger: graphRef.current, start: 'top 80%', end: 'top 50%', scrub: true }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats: StatConfig[] = [
    {
      numTarget: 500, numSuffix: 'k', label: 'users',
      desc: 'Trinity rapidly attracting a substantial user base of over 500,000 customers within its first year of operation.',
      icon: Users, bg: 'orange',
    },
    {
      numTarget: 98, numSuffix: '%', label: '',
      desc: 'Users enjoy faster transaction processing time.',
      icon: Zap, bg: 'black',
    },
    {
      numTarget: 24, numSuffix: 'k', label: '',
      desc: 'A network of over 200,000 partner ATMs worldwide.',
      icon: Globe, bg: 'white',
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#130b24] py-20 lg:py-28 z-about">
      <div className="w-full px-6 lg:px-12">

        {/* Header */}
        <div ref={headingRef} className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="micro-label-orange mb-4">ABOUT US</p>
            <h2 className="heading-section text-white">GETTING TO<br />KNOW TRINITY</h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              We are more than just a financial service provider; we are your trusted partner in
              navigating the complexities of finance.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div ref={statsRef} className="grid md:grid-cols-3 gap-4 mb-12">
          {stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
        </div>

        {/* Financial Graph Section */}
        <div ref={graphRef} className="bg-[#0F1629] rounded-3xl p-6 lg:p-8 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#FF5F00] text-sm font-semibold mb-2">FINANCIAL ANALYTICS</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Real-Time Financial Monitoring
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Track your spending, monitor investments, and analyze your financial health
                with our advanced analytics dashboard.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <TrendingUp className="w-6 h-6 text-[#FF5F00] mb-2" />
                  <p className="text-white font-bold text-xl">+127%</p>
                  <p className="text-white/50 text-xs">Growth Rate</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <BarChart3 className="w-6 h-6 text-[#FF5F00] mb-2" />
                  <p className="text-white font-bold text-xl">$2.4M</p>
                  <p className="text-white/50 text-xs">Total Volume</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <PieChart className="w-6 h-6 text-[#FF5F00] mb-2" />
                  <p className="text-white font-bold text-xl">89%</p>
                  <p className="text-white/50 text-xs">Success Rate</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <Zap className="w-6 h-6 text-[#FF5F00] mb-2" />
                  <p className="text-white font-bold text-xl">0.3s</p>
                  <p className="text-white/50 text-xs">Avg. Transaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/financial-graph.jpg"
                alt="Financial Analytics Dashboard"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
