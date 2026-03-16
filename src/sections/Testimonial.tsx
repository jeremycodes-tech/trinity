import { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Trinity has completely transformed the way I manage my finances. The real-time updates and personalized advice have been invaluable.",
    author: "Kelly Williams",
    role: "Head of Design, Layers",
    avatar: "/avatar-kelly.jpg"
  },
  {
    quote: "The security features and intuitive interface make Trinity the best financial platform I've ever used. Highly recommended for professionals.",
    author: "Sarah Chen",
    role: "CEO at FinTech Solutions",
    avatar: "/avatar-sarah.png"
  },
  {
    quote: "Managing multiple assets has never been easier. Trinity's analytics provide deep insights that help me make better trading decisions.",
    author: "Marcus Johnson",
    role: "Senior Trader at CryptoFlow",
    avatar: "/avatar-marcus.png"
  },
  {
    quote: "The seamless integration with my existing accounts and the automated budgeting tools save me hours every week.",
    author: "Elena Rossi",
    role: "Portfolio Manager at Global Capital",
    avatar: "/avatar-elena.png"
  }
];

const Testimonial = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const transitionTestimonial = useCallback((nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    gsap.to(containerRef.current, {
      opacity: 0,
      x: -40,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(nextIndex);
        gsap.fromTo(containerRef.current,
          { opacity: 0, x: 40 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        );
      }
    });
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    const nextIndex = (activeIndex + 1) % testimonials.length;
    transitionTestimonial(nextIndex);
  }, [activeIndex, isAnimating, transitionTestimonial]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    const nextIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    transitionTestimonial(nextIndex);
  }, [activeIndex, isAnimating, transitionTestimonial]);

  // Auto-rotation timer
  useEffect(() => {
    if (isAnimating) return;

    // Start progress bar animation
    gsap.fromTo(progressRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 3.5, ease: 'none' }
    );

    const timer = setTimeout(() => {
      handleNext();
    }, 3500);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(progressRef.current);
    };
  }, [activeIndex, isAnimating, handleNext]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonial-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          stagger: 0.2,
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 75%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-20 lg:py-28 z-testimonial overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Label */}
        <p className="micro-label-orange mb-8 testimonial-reveal">WHAT THEY SAYS ABOUT US</p>

        <div ref={containerRef}>
          {/* Quote */}
          <div className="relative max-w-4xl mb-12">
            {/* Orange quote mark */}
            <div className="absolute -top-4 -left-2 lg:-left-8">
              <span className="text-[#FF5F00] text-8xl lg:text-9xl font-serif leading-none">"</span>
            </div>
            
            <p className="text-2xl lg:text-4xl font-medium text-black leading-tight relative z-10 pl-8 lg:pl-16 min-h-[120px] lg:min-h-[160px]">
              {current.quote}
            </p>

            {/* Progress indicator bar */}
            <div className="absolute left-8 lg:left-16 bottom-[-20px] w-[120px] h-0.5 bg-black/10 overflow-hidden">
              <div 
                ref={progressRef}
                className="h-full bg-[#FF5F00] origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-black font-semibold">{current.author}</p>
                <p className="text-black/50 text-sm">{current.role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrev}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
