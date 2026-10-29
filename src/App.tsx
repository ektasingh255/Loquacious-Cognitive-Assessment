/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { HowItWorks } from './components/HowItWorks';
import { ResearchTrust } from './components/ResearchTrust';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SpeechAssessmentModal } from './components/SpeechAssessmentModal';
import { AuthModal } from './components/AuthModal';

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [speechModalOpen, setSpeechModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Monitor scroll position to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'research', 'how-it-works', 'about'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId === 'features' ? 'research' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBFF] text-[#272438] flex flex-col selection:bg-[#8B78D6]/20 selection:text-[#6552A3]">
      {/* Top Banner if logged in */}
      {currentUser && (
        <div className="bg-[#F1EDFF] border-b border-[#8B78D6]/20 px-4 py-2 text-center text-xs font-mono text-[#6552A3] flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8B78D6]" />
          <span>Active Research Session: <strong>{currentUser.name}</strong> ({currentUser.email})</span>
          <button
            onClick={handleLogout}
            className="ml-2 text-xs underline hover:text-[#272438] cursor-pointer"
          >
            End Session
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Interactive 3D Neuron Ring */}
        <Hero
          onExploreAssessment={() => setSpeechModalOpen(true)}
          onHowItWorksClick={() => scrollTo('#how-it-works')}
        />

        {/* Feature Cards with rotating lavender border & 3D micro tilt */}
        <FeatureCards />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Research & Trust Section */}
        <ResearchTrust />

        {/* About & Mission Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onNavClick={(href) => scrollTo(href)} />

      {/* Interactive Speech Assessment Protocol Explorer Modal */}
      <SpeechAssessmentModal
        isOpen={speechModalOpen}
        onClose={() => setSpeechModalOpen(false)}
      />

      {/* Authentication Modal (Login & Registration) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
