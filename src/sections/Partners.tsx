import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: Pinned stagger animation
    mm.add("(min-width: 1024px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      const tiles = tilesRef.current?.children || [];
      scrollTl.fromTo(tiles,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(headingRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(tiles,
        { y: 0, opacity: 1 },
        { y: -30, opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );
    });

    // Mobile: Lazy loading fade-in animation
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(headingRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );

      const tiles = tilesRef.current?.children || [];
      gsap.fromTo(tiles,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: tilesRef.current,
            start: 'top 85%',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative min-h-screen w-full bg-[#0F1629] overflow-hidden z-partners flex flex-col py-24"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-center flex-1">
        {/* Header */}
        <div ref={headingRef} className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="micro-label-orange mb-4">OUR TRUSTED PARTNERS</p>
            <h2 className="heading-section text-white">
              REAL-TIME FINANCIAL<br />MONITORING
            </h2>
            <p className="text-white/50 text-sm mt-4 max-w-md">
              Partners are happy with our collaboration, noting increased efficiency 
              and mutual growth since joining us.
            </p>
          </div>
          <div className="flex items-end">
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Just like us, Trinity believes in building long-term relationships with 
              clients. Their focus on customer service aligns perfectly with our own values.
            </p>
          </div>
        </div>

        {/* Tiles Grid */}
        <div ref={tilesRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 98% Stat */}
          <div className="partner-tile h-40 lg:h-40 flex flex-col items-start justify-center p-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl lg:text-6xl font-bold text-white">98</span>
              <span className="text-xl lg:text-2xl font-bold text-white">%</span>
            </div>
            <p className="text-white/70 text-[10px] sm:text-xs mt-3 leading-relaxed">
              Partners are happy with our collaboration, noting increased efficiency and mutual growth since joining us.
            </p>
          </div>

          {/* Apple Pay */}
          <div className="partner-tile h-32 lg:h-40">
            <div className="flex items-center gap-2">
              <Apple className="w-8 h-8 text-white" />
              <span className="text-white font-semibold text-xl">Pay</span>
            </div>
          </div>

          {/* PayPal */}
          <div className="partner-tile h-32 lg:h-40">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#FF5F00] font-bold text-xl">P</span>
              </div>
              <span className="text-white font-semibold text-xl">PayPal</span>
            </div>
          </div>

          {/* Zelle */}
          <div className="partner-tile h-32 lg:h-40">
            <div className="flex items-center gap-1">
              <ZIcon className="w-6 h-6 text-white" />
              <span className="text-white font-semibold text-xl">elle</span>
            </div>
          </div>

          {/* G Pay */}
          <div className="partner-tile h-32 lg:h-40">
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-2xl">G</span>
              <span className="text-white font-semibold text-xl">Pay</span>
            </div>
          </div>

          {/* CTA Tile */}
          <div className="partner-tile col-span-2 h-32 lg:h-40 flex flex-col items-start justify-center p-6">
            <p className="text-white font-bold text-sm mb-1">CREATING IMPACTFUL</p>
            <p className="text-white/70 text-sm mb-4">SOLUTIONS AND LASTING PARTNERSHIPS</p>
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
              LET'S WORK TOGETHER
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Zelle Z icon
const ZIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v4L8 16h12v4H4v-4l12-8H4V4z" />
  </svg>
);

export default Partners;
