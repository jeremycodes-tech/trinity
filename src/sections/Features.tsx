import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Shield, Zap, BarChart3, LineChart, Wallet, CreditCard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Live Chart ─────────────────────────────────────────────────────────────────

// ─── Monthly Spending Overview Chart ──────────────────────────────────────────

const initialChartData = [
  { label: 'Jan', inc: 12000, exp: 2500 },
  { label: '',    inc: 11500, exp: 6500 },
  { label: '',    inc: 11800, exp: 2000 },
  { label: '',    inc: 11800, exp: 6500 },
  { label: 'Feb', inc: 12200, exp: 1500 },
  { label: '',    inc: 12000, exp: 4000 },
  { label: '',    inc: 12500, exp: 5500 },
  { label: '',    inc: 3500,  exp: 2500 }, // The sharp drop
  { label: 'Mar', inc: 3500,  exp: 2500 },
  { label: '',    inc: 3800,  exp: 7000 },
  { label: '',    inc: 3800,  exp: 2000 },
  { label: '',    inc: 4000,  exp: 6500 },
  { label: 'Apr', inc: 4200,  exp: 6500 },
  { label: '',    inc: 4200,  exp: 2500 },
  { label: '',    inc: 4500,  exp: 5500 },
  { label: '',    inc: 4500,  exp: 6000 },
  { label: 'May', inc: 4500,  exp: 6500 },
  { label: '',    inc: 5500,  exp: 2000 },
  { label: '',    inc: 6000,  exp: 5000 },
];

let tickCounter = 19;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SpendingOverviewChart = () => {
  const [data, setData] = useState(initialChartData);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        
        // Calculate new values with smoothing
        const targetInc = last.inc + (Math.random() - 0.5) * 3000;
        const targetExp = last.exp + (Math.random() - 0.5) * 4000;
        
        const nextInc = Math.max(1000, Math.min(14000, targetInc));
        const nextExp = Math.max(500, Math.min(12000, targetExp));
        
        const isLabelTick = tickCounter % 4 === 0;
        const monthIndex = Math.floor(tickCounter / 4) % 12;
        const label = isLabelTick ? months[monthIndex] : '';
        
        tickCounter++;
        return [...prev.slice(1), { label, inc: nextInc, exp: nextExp }];
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);
  
  const W = 800, H = isMobile ? 400 : 260, PAD_L = 40, PAD_R = 20, PAD_V = 20;
  const N = data.length;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_V * 2;
  const maxY = 15000;

  const xOf = (i: number) => PAD_L + (i / (N - 1)) * chartW;
  const yOf = (val: number) => PAD_V + (1 - val / maxY) * chartH;
  
  const incPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xOf(i)},${yOf(d.inc)}`).join(' ');
  const incArea = `${incPath} L${xOf(N - 1)},${H - PAD_V} L${PAD_L},${H - PAD_V} Z`;
  
  const expPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xOf(i)},${yOf(d.exp)}`).join(' ');

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 z-10 relative">
        <div>
          <p className="text-[#FF5F00] text-xs font-bold tracking-wider mb-2 uppercase">Financial Analytics</p>
          <h2 className="text-white text-2xl lg:text-3xl font-bold">Monthly Spending Overview</h2>
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <div className="flex items-center bg-[#1E2330]/40 rounded-full p-1 border border-[#1E2330]/60 min-w-max">
            {['Weekly', 'Monthly', 'Quarterly', 'Yearly', 'All Time'].map((tab) => (
              <button key={tab} className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${tab === 'Monthly' ? 'bg-[#2A2F3D] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                {tab}
              </button>
            ))}
            <button className="ml-2 w-7 h-7 rounded-full bg-[#FF5F00] flex-shrink-0 flex items-center justify-center text-white hover:bg-[#FF7A30] transition-colors shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Legends */}
      <div className="flex flex-wrap justify-start lg:justify-end items-center gap-4 lg:gap-6 mb-4 lg:mb-2 mr-0 lg:mr-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
          <span className="text-gray-400 text-xs sm:text-sm font-medium">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]"></span>
          <span className="text-gray-400 text-xs sm:text-sm font-medium">Expenses</span>
        </div>
        <div className="flex items-center gap-2 ml-auto lg:ml-4">
          <span className="text-emerald-400 text-xs sm:text-sm font-bold">+ 2.45%</span>
        </div>
      </div>

      {/* Chart SVG */}
      <div className="-mt-6 relative w-full overflow-visible">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto drop-shadow-xl overflow-visible">
          <defs>
            <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid background */}
          <rect x={PAD_L} y={PAD_V} width={chartW} height={chartH} fill="none" />

          {/* Y-Axis Labels & faint horizontal lines */}
          {[15000, 10000, 5000, 0].map((val) => (
            <g key={`y-${val}`}>
              <line x1={PAD_L} y1={yOf(val)} x2={W - PAD_R} y2={yOf(val)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={PAD_L - 10} y={yOf(val) + (isMobile ? 5 : 4)} textAnchor="end" fontSize={isMobile ? "14" : "10"} fill="#9CA3AF" fontWeight={isMobile ? "600" : "500"}>
                {val === 0 ? '0' : `${val / 1000}k`}
              </text>
            </g>
          ))}

          {/* X-Axis Labels */}
          {data.map((d, i) => d.label ? (
             <text key={`x-${i}-${d.label}`} x={xOf(i)} y={H + (isMobile ? 20 : 12)} textAnchor="middle" fontSize={isMobile ? "14" : "10"} fill="#9CA3AF" fontWeight={isMobile ? "600" : "500"}>
               {d.label}
             </text>
          ) : null)}

          {/* Income Area & Line */}
          <path d={incArea} fill="url(#incGrad)" style={{ transition: 'd 0.3s linear' }} />
          <path d={incPath} fill="none" stroke="#F97316" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" style={{ transition: 'd 0.3s linear' }} />
          
          {/* Expenses Line & Glow */}
          <path d={expPath} fill="none" stroke="#60A5FA" strokeWidth="6" opacity="0.1" strokeLinejoin="round" strokeLinecap="round" style={{ transition: 'd 0.3s linear' }} />
          <path d={expPath} fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" strokeLinejoin="round" strokeLinecap="round" style={{ transition: 'd 0.3s linear' }} />
          
          {/* Expenses Dots */}
          <g style={{ transition: 'transform 0.3s linear' }}>
              {data.map((d, i) => (
                <circle key={`dot-${i}`} cx={xOf(i)} cy={yOf(d.exp)} r="2.5" fill="#60A5FA" stroke="#584738" strokeWidth="1.5" style={{ transition: 'cy 0.3s linear' }} />
              ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

// ─── Features Section ────────────────────────────────────────────────────────────

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', end: 'top 50%', scrub: true } }
      );
      const items = listRef.current?.children || [];
      gsap.fromTo(items,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: listRef.current, start: 'top 70%', end: 'top 40%', scrub: true } }
      );
      gsap.fromTo(dashboardRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: dashboardRef.current, start: 'top 75%', end: 'top 45%', scrub: true } }
      );
      gsap.fromTo(graphRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: graphRef.current, start: 'top 80%', end: 'top 50%', scrub: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { number: '01', title: 'Secure and Easy Transactions', icon: Shield },
    { number: '02', title: 'Real-Time Financial Monitoring', icon: BarChart3 },
    { number: '03', title: 'Fast & EASY TRANSACTIONS', icon: Zap, highlight: true },
    { number: '04', title: 'Comprehensive Financial Planning', icon: Clock },
  ];

  const invoices = [
    { name: 'Kelly Williams', date: '4 July 2024', status: 'Success' },
    { name: 'John Terry',     date: '3 July 2024', status: 'Success' },
    { name: 'Caitlin Clark',  date: '2 July 2024', status: 'Pending' },
  ];

  return (
    <section ref={sectionRef} id="features" className="relative w-full bg-[#584738] py-20 lg:py-28 z-features">
      <div className="w-full px-6 lg:px-12">

        {/* Header */}
        <div ref={headingRef} className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="micro-label-orange mb-4">FEATURES</p>
            <h2 className="heading-section text-white">ALL-IN-ONE PLATFORM<br />FOR SAVINGS</h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Simplify your financial life by securely connecting your accounts automatically categorizing transactions.
            </p>
          </div>
        </div>

        {/* Feature list + Dashboard */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div ref={listRef} className="space-y-0">
            {features.map((f, i) => (
              <div key={i}
                className={`flex items-center gap-4 py-5 border-b border-white/10 cursor-pointer group transition-all ${
                  f.highlight ? 'bg-white/10 backdrop-blur-md -mx-4 px-4 rounded-xl border-b-0 shadow-lg' : ''}`}>
                <span className={`text-sm font-bold w-8 ${f.highlight ? 'text-white' : 'text-white/40'}`}>{f.number}</span>
                <span className={`flex-1 text-sm font-medium ${f.highlight ? 'text-white' : 'text-white group-hover:text-[#FF5F00] transition-colors'}`}>{f.title}</span>
                <f.icon className={`w-5 h-5 ${f.highlight ? 'text-white' : 'text-white/40'}`} />
                <ArrowRight className={`w-4 h-4 ${f.highlight ? 'text-white' : 'text-white/40'}`} />
              </div>
            ))}
          </div>

          <div ref={dashboardRef} className="bg-white rounded-3xl p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-black font-bold text-lg">Latest Invoice</h4>
              <button className="text-[#FF5F00] text-sm font-medium">View all</button>
            </div>
            <div className="flex gap-2 mb-6">
              {[['67%', 'Success', 'bg-[#FF5F00]'], ['14%', 'Pending', 'bg-yellow-500'], ['19%', 'Cancel', 'bg-red-500']].map(([w, lbl, cls]) => (
                <div key={lbl} className="flex-1">
                  <div className="progress-bar bg-gray-200">
                    <div className={`progress-fill ${cls}`} style={{ width: w }} />
                  </div>
                  <p className="text-xs text-black/50 mt-1">{w} {lbl}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {invoices.map((inv, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF5F00]/10 flex items-center justify-center">
                      <span className="text-[#FF5F00] font-bold text-sm">{inv.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-black font-medium text-sm">{inv.name}</p>
                      <p className="text-black/50 text-xs">{inv.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${inv.status === 'Success' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Spending Overview Section */}
        <div ref={graphRef} className="mt-20 lg:mt-32 w-full max-w-5xl mx-auto">
          <div className="mb-10 w-full">
            <SpendingOverviewChart />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-1 sm:px-2">
            <div className="bg-white/5 rounded-2xl p-4 lg:p-5 border border-white/10 shadow-lg backdrop-blur-sm">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl mb-3 sm:mb-4 bg-[#FF5F00]/20 flex items-center justify-center">
                 <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5F00]" />
              </div>
              <p className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-1">$14,250</p>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 text-xs sm:text-sm font-medium">Total Income</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 lg:p-5 border border-white/10 shadow-lg backdrop-blur-sm">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl mb-3 sm:mb-4 bg-[#FF5F00]/20 flex items-center justify-center">
                 <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5F00]" />
              </div>
              <p className="text-red-400 font-bold text-xl sm:text-2xl lg:text-3xl mb-1">-24.5%</p>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">Expenses</p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 lg:p-5 border border-white/10 shadow-lg backdrop-blur-sm">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl mb-3 sm:mb-4 bg-[#FF5F00]/20 flex items-center justify-center">
                 <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5F00]" />
              </div>
              <p className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-1">1,331</p>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">Total Transactions</p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 lg:p-5 border border-white/10 shadow-lg backdrop-blur-sm">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl mb-3 sm:mb-4 bg-[#FF5F00]/20 flex items-center justify-center">
                 <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5F00]" />
              </div>
              <p className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-1">$2,850</p>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">Avg. Amount</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
