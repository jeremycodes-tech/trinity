import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: contentRef.current, start: 'top 85%', end: 'top 60%', scrub: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    Features: ['Analytics', 'Collaboration', 'Data Management', 'Integrations', 'Security'],
    Company: ['About us', 'Blog', 'Careers', 'Cookie Policy'],
    Resources: ['Customers', 'Strategies', 'E-Books & Guides', 'Webinar'],
    Support: ['Help Center', 'Contact'],
  };

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-[#FF5F00] pt-16 lg:pt-24 pb-8 z-footer"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Giant Trinity text */}
        <div className="relative mb-12 overflow-hidden">
          <h2 className="text-[15vw] lg:text-[20vw] font-black text-[#E65500] leading-none tracking-tighter uppercase">
            Trinity
          </h2>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mb-12">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#FF5F00] transition-colors"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="heading-small text-white mb-6">
              READY TO TAKE<br />CONTROL OF YOUR<br />FINANCIAL FUTURE
            </h3>
            <button
              type="button"
              className="flex justify-center gap-2 items-center shadow-xl text-sm bg-white text-black font-bold border-2 border-white relative z-10 px-5 py-2 overflow-hidden rounded-full group transition-colors duration-300 hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white"
            >
              GET STARTED
              <svg
                className="w-8 h-8 justify-end group-hover:rotate-90 bg-black/10 group-hover:bg-white/20 text-black group-hover:text-white ease-linear duration-300 rounded-full border border-black/20 group-hover:border-transparent p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-black group-hover:fill-white transition-colors duration-300"
                ></path>
              </svg>
            </button>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-sm mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-white/20">
          <p className="text-white/70 text-sm mb-4 lg:mb-0">
            © 2024 Trinity
          </p>
          <p className="text-white/70 text-sm mb-4 lg:mb-0">
            All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
