import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { AvatarCircles } from '@/components/ui/avatar-circles';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: 'Selecting your provider' },
    { title: 'Set Up Your Account' },
    { title: 'Enjoy Seamless Banking Trinity' },
  ];

  const avatars = [
    { imageUrl: 'https://avatars.githubusercontent.com/u/16860528', profileUrl: 'https://github.com/dillionverma' },
    { imageUrl: 'https://avatars.githubusercontent.com/u/20110627', profileUrl: 'https://github.com/tomonarifeehan' },
    { imageUrl: 'https://avatars.githubusercontent.com/u/106103625', profileUrl: 'https://github.com/BankkRoll' },
    { imageUrl: 'https://avatars.githubusercontent.com/u/59228569', profileUrl: 'https://github.com/safethecode' },
    { imageUrl: 'https://avatars.githubusercontent.com/u/59442788', profileUrl: 'https://github.com/sanjay-mali' },
    { imageUrl: 'https://avatars.githubusercontent.com/u/89768406', profileUrl: 'https://github.com/itsarghyadas' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance animation on page load ──────────────────────────────────────
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 80, scale: 0.85, rotateZ: -8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 1.2,
          ease: 'back.out(1.4)',
          delay: 0.4,
        }
      );

      // ── Floating / levitate loop after entry ─────────────────────────────────
      gsap.to(cardsRef.current, {
        y: -14,
        rotateZ: 2,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.6,
      });

      // ── Floating / levitate loop for mobile cards ───────────────────────────
      gsap.to(mobileCardsRef.current, {
        y: -10,
        rotateZ: 1,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // ── Scroll-driven: cards shoot upward (jump higher) as hero scrolls ──────
      gsap.to(cardsRef.current, {
        y: -240,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] w-full bg-[#F0E7D5] overflow-hidden flex flex-col pt-40 lg:pt-[22vh]"
    >
      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col relative px-6 lg:px-12 pb-12">

        {/* Floating Cards (Desktop Only - Hidden on Mobile) */}
        <div
          ref={cardsRef}
          className="hidden lg:flex absolute bottom-[4%] lg:left-[48%] xl:left-[44%] -translate-x-1/2 w-[360px] xl:w-[420px] z-30 drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)] pointer-events-none"
        >
          <img
            src="/trinity-cards-stack.png"
            alt="Trinity Stacked Cards"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Main Container */}
        <div className="flex-1 w-full relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Top content: Headline, Paragraph, Buttons */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left h-full relative z-20">

            {/* Massive Title */}
            <div className="relative w-full leading-[0.85] tracking-tighter uppercase font-black mb-6 lg:mb-10">
              <h1 className="text-black text-[12vw] sm:text-[10vw] lg:text-[6.5vw] xl:text-[6vw]">
                SECURE YOUR
              </h1>
              <h1 className="text-black text-[12vw] sm:text-[10vw] lg:text-[6.5vw] xl:text-[6vw]">
                FINANCIAL FUTURE
              </h1>

              {/* Orange Sparkles (Desktop) */}
              <div className="absolute -top-[10%] right-[10%] hidden md:block text-[#FF5F00]">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z" />
                </svg>
              </div>
            </div>

            {/* Paragraph and button */}
            <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-auto">
              <p className="text-black/70 text-sm md:text-base max-w-[280px] font-medium leading-[1.6] mb-8 lg:mb-8">
                Trusted Protection and Expert Guidance<br />for Your Finances
              </p>

              <div className="flex items-center gap-4 mb-10 lg:mb-0">
                <button
                  type="button"
                  className="flex justify-center gap-2 items-center shadow-xl text-sm bg-[#852E4E] text-white backdrop-blur-md font-semibold isolation-auto border-[#852E4E] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FF5F00] hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-5 py-2 overflow-hidden border-2 rounded-full group"
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
              </div>
            </div>

            {/* Mobile Cards (Visible only on mobile, in document flow) */}
            <div ref={mobileCardsRef} className="lg:hidden w-full max-w-[280px] mb-8 relative">
              {/* Decorative Sparkle for mobile */}
              <div className="absolute -left-4 top-0 text-[#FF5F00] animate-pulse">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z" />
                </svg>
              </div>
              <img
                src="/trinity-cards-stack.png"
                alt="Trinity Stacked Cards"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Active Users */}
            <div className="flex flex-col items-center lg:items-start pt-4 lg:pt-0 mb-12 lg:mb-[10%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F00]"></div>
                <p className="text-black/50 text-[10px] font-bold uppercase tracking-widest">Active Users</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-black font-black text-3xl lg:text-4xl tracking-tighter">95K+</p>
                <AvatarCircles numPeople={99} avatarUrls={avatars} />
              </div>
            </div>
          </div>

          {/* Steps (Full width on mobile, at bottom) */}
          <div className="lg:col-span-4 w-full flex flex-col justify-end items-center lg:items-end">
            <div className="flex flex-col w-full max-w-[400px] lg:max-w-[300px]">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col w-full group cursor-pointer py-4 border-b border-black/10">
                  <div className="flex items-center justify-between w-full px-1">
                    <h3 className="text-black font-semibold text-sm lg:text-sm tracking-wide group-hover:text-[#FF5F00] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:text-[#FF5F00] transition-colors shrink-0 ml-3 pointer-events-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
