import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Background word entrance (0% - 30%)
      scrollTl.fromTo(
        bgTextRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 0.08, ease: 'none' },
        0
      );

      // Foreground content entrance (0% - 30%)
      scrollTl.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Settle phase (30% - 70%) - no animation

      // Exit phase (70% - 100%)
      scrollTl.fromTo(
        bgTextRef.current,
        { scale: 1, opacity: 0.08 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: -20, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0B0D10] overflow-hidden z-70"
    >
      {/* Large background text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="bg-text uppercase">trinity</span>
      </div>

      {/* Foreground content */}
      <div className="relative w-full h-screen flex items-center justify-center px-6">
        <div ref={contentRef} className="text-center max-w-3xl">
          <h2 className="heading-section font-bold text-white uppercase tracking-tight mb-8">
            Ready To Take Control
            <br />
            Of Your Financial Future
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                type="button"
                className="flex justify-center gap-2 items-center shadow-xl text-sm bg-[#7C3AED] text-white backdrop-blur-md font-semibold isolation-auto border-[#7C3AED] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FF5F00] hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-5 py-2 overflow-hidden border-2 rounded-full group"
              >
                GET STARTED
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-white/20 text-white ease-linear duration-300 rounded-full border border-white/40 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-white group-hover:fill-white"
                  ></path>
                </svg>
              </button>
            <button className="flex items-center gap-2 text-[#A7B0C8] hover:text-white transition-colors group">
              <MessageCircle className="w-5 h-5" />
              Talk to an advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
