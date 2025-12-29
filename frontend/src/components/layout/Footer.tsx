'use client';

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 font-[family-name:var(--font-dancing-script)] bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent text-2xl">Thindi Potha</h3>
            <p className="text-sm">
              Delivering fresh, delicious meals straight to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleScrollTo(e, '#home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleScrollTo(e, '#about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => handleScrollTo(e, '#how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a 
                  href="/order" 
                  className="hover:text-white transition-colors"
                >
                  Place Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
              <li className="text-gray-400">Email: info@thindipotha.com</li>
              <li className="text-gray-400">Phone: +91 1234567890</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white font-semibold mb-4">Address</h4>
            <p className="text-sm text-gray-400">
              123 Food Street,<br />
              Kitchen District,<br />
              City - 560001
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Thindi Potha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
