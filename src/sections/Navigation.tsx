import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Menu, X, ArrowUpRight, Search, User, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations for Mobile Menu
  useLayoutEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'auto',
      });
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
      const tl = gsap.timeline();
      tl.to(modalRef.current, { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' });
      tl.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none'
      }, '-=0.1');
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Products', href: '#features' },
    { label: 'Features', href: '#features' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#footer' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Island Navbar (Untouched) */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 w-max hidden lg:flex ${
          isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        } ${
          isScrolled
            ? 'bg-[#0F1629]/90 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 shadow-2xl'
            : 'bg-[#0F1629] border border-white/10 rounded-full px-8 py-3 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-white font-bold text-sm tracking-tight">
              Trinity
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-6">
            <span className="text-white text-sm font-medium hidden sm:block">Sign up</span>
            <button className="w-8 h-8 rounded-full bg-[#FF5F00] flex items-center justify-center text-white hover:bg-[#E65500] transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Island Navbar (New White Pill) */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[130] transition-all duration-500 lg:hidden w-[320px]"
      >
        <div className="bg-white rounded-[32px] px-6 py-4 flex items-center justify-between shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] w-full">
          <a href="#" className="flex items-center">
            <span className="text-black font-black uppercase tracking-widest text-[13px]">
              Trinity
            </span>
          </a>

          <div className="flex items-center gap-4">
            <button className="text-black hover:opacity-70 transition-opacity">
              <Search size={18} strokeWidth={2.5} />
            </button>
            <button className="text-black hover:opacity-70 transition-opacity hidden sm:block">
              <User size={18} strokeWidth={2.5} />
            </button>
            <button className="text-black hover:opacity-70 transition-opacity">
              <ShoppingBag size={18} strokeWidth={2.5} />
            </button>
            <button
              className="text-black hover:opacity-70 transition-opacity ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} strokeWidth={2.5} />
              ) : (
                <Menu size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[120] bg-[#eedfff] lg:hidden opacity-0 pointer-events-none flex flex-col"
      >
        {/* Modal Links (Centered Content) */}
        <div
          ref={modalRef}
          className="flex-1 flex flex-col items-center justify-center space-y-8 w-full px-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-black font-black text-3xl sm:text-4xl uppercase tracking-[0.2em] transform transition-transform hover:scale-105"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Small Bottom Watermark */}
        <div className="w-full pb-8 flex justify-center opacity-30">
          <span className="text-black font-black text-[10px] tracking-[0.3em] uppercase">
            Trinity
          </span>
        </div>
      </div>
    </>
  );
};

export default Navigation;
