'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleSignIn = () => {
    window.open('/login', '_blank');
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    toast.success('Successfully signed out!');
    router.push('/');
    router.refresh();
  };

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
                className={`px-3 py-2 text-sm font-medium transition-colors ${isActive(link.href, link.section)
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {link.label}
              </a>
            ))}

            {isLoggedIn && user?.role === 'admin' && (
              <Link
                href="/admin/orders"
                className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/admin/orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Admin Panel
              </Link>
            )}

            {isLoggedIn && user?.role === 'user' && (
              <Link
                href="/my-orders"
                className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === '/my-orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                My Orders
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                aria-label="Sign Out"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all shadow-md shadow-orange-100"
                >
                  Sign In
                </button>
                <Link
                  href="/admin/login"
                  target="_blank"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Admin Login
                </Link>
              </div>
            )}

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
                className={`block px-3 py-2 text-base font-medium ${isActive(link.href, link.section)
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                {link.label}
              </a>
            ))}

            {isLoggedIn && user?.role === 'admin' && (
              <Link
                href="/admin/orders"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}

            {isLoggedIn && user?.role === 'user' && (
              <Link
                href="/my-orders"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Orders
              </Link>
            )}

            <div className="px-3 py-2">
              {isLoggedIn ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-red-600"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleSignIn}
                    className="flex items-center gap-2 text-base font-medium text-orange-600 hover:text-orange-700"
                  >
                    <LogIn size={20} />
                    <span>Customer Sign In</span>
                  </button>
                  <Link
                    href="/admin/login"
                    target="_blank"
                    className="flex items-center gap-2 text-base font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShieldCheck size={20} />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
