/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FCFBFF] border-t border-[#8B78D6]/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#8B78D6]/15">
          
          {/* Brand & Project Mission (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#F1EDFF] border border-[#8B78D6]/20 text-[#6552A3]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="2.5" fill="#8B78D6" fillOpacity="0.4" />
                  <circle cx="6" cy="8" r="1.5" />
                  <circle cx="18" cy="8" r="1.5" />
                  <path d="M7.5 9L10.5 11" />
                  <path d="M16.5 9L13.5 11" />
                </svg>
              </div>
              <span className="font-serif text-lg font-semibold text-[#272438]">Loquacious</span>
            </div>

            <p className="text-xs sm:text-sm text-[#777387] leading-relaxed max-w-md">
              An exploratory computational research prototype studying vocal acoustics, prosody, and
              machine learning models in human cognitive neuroscience.
            </p>

            <div className="text-xs font-mono text-[#6552A3]">
              Protocol Version 2.4 · Research Build · Non-Clinical
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#6552A3] font-semibold">
              Platform Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#777387]">
              {['#home', '#research', '#how-it-works', '#about'].map((target) => {
                const labelMap: Record<string, string> = {
                  '#home': 'Home',
                  '#research': 'Research Overview',
                  '#how-it-works': 'How It Works',
                  '#about': 'About & Mission',
                };
                return (
                  <li key={target}>
                    <a
                      href={target}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(target);
                      }}
                      className="hover:text-[#6552A3] transition-colors"
                    >
                      {labelMap[target]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Research Governance & Disclaimer (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#6552A3] font-semibold">
              Research Governance
            </div>
            <p className="text-xs text-[#777387] leading-relaxed">
              Loquacious is developed exclusively for scientific study and computational linguistics exploration.
              Not approved for medical diagnostics or clinical decision-making.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777387]">
          <div>
            © {new Date().getFullYear()} Loquacious Cognitive Research Initiative. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#777387] hover:text-[#6552A3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] rounded px-2 py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
