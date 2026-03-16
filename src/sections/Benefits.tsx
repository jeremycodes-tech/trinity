import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Percent, Plane, ShieldCheck, Globe, CreditCard, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Slide data ──────────────────────────────────────────────────────────────
const SLIDES = [
  {
    label: 'BENEFITS',
    heading: ['SHOPPING ON', 'INTERNATIONAL'],
    benefits: [
      { icon: Percent,     text: 'Get 2% cashback on all purchases.' },
      { icon: Plane,       text: 'Access exclusive travel deals and discounts on flights and hotels.' },
      { icon: ShieldCheck, text: 'Includes travel insurance and purchase protection.' },
    ],
  },
  {
    label: 'BENEFITS',
    heading: ['GLOBAL PAYMENTS', 'SIMPLIFIED'],
    benefits: [
      { icon: Globe,       text: 'Send money to 150+ countries with zero fees.' },
      { icon: CreditCard,  text: 'Use your Trinity card anywhere Visa is accepted worldwide.' },
      { icon: Percent,     text: 'Best-in-class exchange rates with no hidden charges.' },
    ],
  },
  {
    label: 'BENEFITS',
    heading: ['BANK-GRADE', 'SECURITY'],
    benefits: [
      { icon: Lock,        text: 'End-to-end encryption on every single transaction.' },
      { icon: ShieldCheck, text: 'Instant freeze/unfreeze your card from the app.' },
      { icon: Plane,       text: '24/7 fraud monitoring with real-time alerts.' },
    ],
  },
];

const INTERVAL_MS = 3500;

// ─── Component ───────────────────────────────────────────────────────────────
const Benefits = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  const [active, setActive]   = useState(0);
  const [fading, setFading]   = useState(false);

  // Auto-rotate slides ─────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % SLIDES.length);
        setFading(false);
      }, 300);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 300);
  };

  // GSAP scroll pin + enter/exit animation (Desktop Only) ───────────────────
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(cardsRef.current,
        { x: '-50vw', opacity: 0, rotateZ: -15 },
        { x: 0,       opacity: 1, rotateZ: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(contentRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0,      opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(cardsRef.current,
        { x: 0,     opacity: 1, rotateZ:  0  },
        { x: '-20vw', opacity: 0, rotateZ: -10, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(contentRef.current,
        { x: 0,     opacity: 1 },
        { x: '15vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    });

    return () => mm.revert();
  }, []);

  const slide = SLIDES[active];

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative min-h-screen w-full bg-white overflow-hidden z-benefits"
    >
      <div className="w-full h-screen px-6 lg:px-12 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-center">

          {/* Left – Cards + Money image */}
          <div ref={cardsRef} className="relative h-[420px] lg:h-[580px] flex items-center justify-center overflow-visible">
            
            <img
              src="/cards-money.png"
              alt="Trinity cards with money"
              className="w-full h-full object-contain drop-shadow-2xl scale-125"
            />

            {/* Dot indicators (clickable) */}
            <div className="absolute bottom-0 left-0 lg:left-4 flex flex-col gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-[#FF5F00] scale-125' : 'bg-black/20 hover:bg-black/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right – Auto-rotating Content */}
          <div
            ref={contentRef}
            className="transition-opacity duration-300"
            style={{ opacity: fading ? 0 : 1 }}
          >
            <p className="micro-label-orange mb-4">{slide.label}</p>
            <h2 className="heading-section text-black mb-8">
              {slide.heading[0]}<br />{slide.heading[1]}
            </h2>

            <div className="space-y-6 mb-8">
              {slide.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-5 h-5 text-black" />
                  </div>
                  <p className="text-black/70 text-sm leading-relaxed pt-2">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="btn-orange">LEARN MORE</button>
              <button className="w-10 h-10 rounded-full bg-[#FF5F00] flex items-center justify-center text-white hover:bg-[#E65500] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
