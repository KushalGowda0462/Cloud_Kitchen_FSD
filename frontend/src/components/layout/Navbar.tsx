'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CartButton from '@/components/order/CartButton';

const navLinks = [
  { href: '#home', label: 'Home', section: 'home' },
  { href: '#about', label: 'About Us', section: 'about' },
  { href: '#how-it-works', label: 'How it Works', section: 'how-it-works' },
  { href: '#contact', label: 'Contact Us', section: 'contact' },
  { href: '/order', label: 'Place your order', section: null },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Only handle scroll spy on home page
    if (pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'how-it-works', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, section: string | null) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // If we're not on the home page, navigate there first with hash
      if (pathname !== '/') {
        window.location.href = `/${href}`;
        setIsMobileMenuOpen(false);
        return;
      }

      // If we're already on home page, scroll to section
      const element = document.getElementById(section || href.substring(1));
      if (element) {
        const offset = 80; // Account for sticky navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (href: string, section: string | null) => {
    if (pathname !== '/') {
      // On other pages, only highlight if it's the current page
      return pathname === href;
    }
    if (href.startsWith('#')) {
      return activeSection === (section || href.substring(1));
    }
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-2xl font-bold text-gray-900"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            CloudKitchen
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.section)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href, link.section)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </a>
            ))}
            <CartButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <CartButton />
            <button
              className="p-2 rounded-md text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.section)}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(link.href, link.section)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
