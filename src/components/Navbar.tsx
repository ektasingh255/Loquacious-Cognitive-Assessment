/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { AnimatedNeuronLogo } from './AnimatedIcons';

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  currentUser,
  onLogout,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Research', href: '#research', id: 'research' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'About', href: '#about', id: 'about' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#FCFBFF]/85 backdrop-blur-md border-b border-[#8B78D6]/15 shadow-sm'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Animated Neuron Glyph */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 text-[#272438] hover:opacity-95 transition-opacity group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] rounded-md"
            aria-label="Loquacious Home"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#F1EDFF] to-[#E2DAFC] border border-[#8B78D6]/25 shadow-xs transition-transform duration-300 group-hover:scale-110">
              <AnimatedNeuronLogo className="w-5 h-5 text-[#6552A3]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl tracking-tight font-semibold text-[#272438]">
                Loquacious
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[#777387]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 transition-colors duration-200 hover:text-[#272438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] rounded ${
                    isActive ? 'text-[#6552A3] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B78D6] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-lg bg-[#F1EDFF] border border-[#8B78D6]/20 text-xs font-medium text-[#6552A3]">
                  <div className="w-6 h-6 rounded-full bg-[#8B78D6] text-white flex items-center justify-center text-[11px] font-semibold">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[130px]">{currentUser.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-[#777387] hover:text-[#272438] transition-colors rounded-lg hover:bg-black/5"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-xs font-medium text-[#272438] hover:text-[#6552A3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] rounded-lg"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-xs font-medium text-white bg-[#6552A3] hover:bg-[#523F8F] active:bg-[#46347A] transition-colors shadow-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B78D6]"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#272438] hover:bg-[#F1EDFF] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#8B78D6]/15 bg-[#FCFBFF]/95 backdrop-blur-md px-6 py-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#272438]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-1 text-[#272438] hover:text-[#6552A3] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#8B78D6]/15 flex flex-col gap-3">
              {currentUser ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#6552A3]" />
                    <span className="text-sm font-medium text-[#272438]">{currentUser.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-xs text-[#777387] hover:text-[#272438]"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="w-full py-2.5 text-center text-sm font-medium text-[#272438] rounded-lg bg-[#F1EDFF] hover:bg-[#E5DEF8] transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="w-full py-2.5 text-center text-sm font-medium text-white bg-[#6552A3] rounded-lg hover:bg-[#523F8F] transition-colors"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
