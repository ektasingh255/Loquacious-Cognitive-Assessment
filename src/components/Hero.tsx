/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { NeuronRingCanvas } from './NeuronRingCanvas';

interface HeroProps {
  onExploreAssessment: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreAssessment, onHowItWorksClick }) => {
  return (
    <section
      id="home"
      className="relative flex items-center pt-24 sm:pt-28 pb-12 lg:pb-16 overflow-hidden scientific-grid min-h-[calc(100vh-4rem)]"
    >
      {/* Subtle atmospheric ambient glow in background */}
      <div
        className="absolute top-1/4 right-1/4 w-[520px] h-[520px] rounded-full pointer-events-none opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(139,120,214,0.28) 0%, rgba(241,237,255,0.35) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute bottom-8 left-12 w-[340px] h-[340px] rounded-full pointer-events-none opacity-20 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(101,82,163,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full z-10">
        {/* Desktop 2-Column Split: Left ~53%, Right ~47% */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          
          {/* Left Column: Eyebrow, Editorial Headline, Paragraph, Actions, Compact Disclaimer (53% width) */}
          <div className="w-full lg:w-[53%] flex flex-col justify-center">
            
            {/* 1. Small Uppercase Research-Oriented Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6552A3] mb-4">
              <span className="font-semibold">Speech-Based Cognitive Assessment</span>
              <span aria-hidden="true" className="text-[#8B78D6]/60">·</span>
              <span className="text-[#777387]">Research Prototype</span>
            </div>

            {/* 2 & 3. Editorial Headline with lavender accent on "one voice at a time" */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-medium tracking-tight text-[#272438] leading-[1.14] mb-6 text-balance">
              Understanding cognition,{' '}
              <span className="italic font-normal text-[#6552A3]">one voice at a time</span>.
            </h1>

            {/* 4. Refined Supporting Paragraph (2-3 readable lines on desktop) */}
            <p className="text-base sm:text-lg text-[#777387] font-normal leading-relaxed mb-8 max-w-xl text-pretty">
              Investigating how acoustic vocal biomarkers, prosodic modulation, and temporal pauses can be
              modeled with machine learning in an experimental cognitive research prototype.
            </p>

            {/* 5. Primary and Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={onExploreAssessment}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#6552A3] hover:bg-[#523F8F] active:bg-[#46347A] rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B78D6] cursor-pointer"
              >
                <span>Explore Speech Assessment</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#272438] hover:text-[#6552A3] bg-white/90 hover:bg-[#F1EDFF] border border-[#8B78D6]/20 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] cursor-pointer"
              >
                <span>How It Works</span>
              </button>
            </div>

            {/* 6. Subtle, Compact Academic Research Disclaimer */}
            <div className="flex items-center gap-2 text-xs text-[#777387]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B78D6] shrink-0" />
              <span>Experimental research prototype · Not intended for medical diagnostic use</span>
            </div>
          </div>

          {/* Right Column: 3D Neural Ring Animation (47% width, 420-500px square visual) */}
          <div className="w-full lg:w-[47%] flex items-center justify-center">
            <div className="relative w-full max-w-[480px] lg:max-w-[500px] h-[400px] sm:h-[460px] lg:h-[490px] rounded-3xl bg-gradient-to-b from-white/80 via-[#F1EDFF]/40 to-white/80 border border-[#8B78D6]/20 shadow-xs overflow-hidden flex items-center justify-center group">
              
              {/* Soft lavender atmospheric radial lighting */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#8B78D6]/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
              </div>

              {/* Real 3D Interactive Three.js Neural Ring */}
              <NeuronRingCanvas className="w-full h-full" />

              {/* Floating Label 1: Top-Left "NEURAL SIGNALS" */}
              <div className="absolute top-3.5 left-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#6552A3] bg-white/85 border border-[#8B78D6]/20 px-2.5 py-1 rounded-md shadow-xs pointer-events-none backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B78D6]" />
                <span>NEURAL SIGNALS</span>
              </div>

              {/* Floating Label 2: Top-Right "RESEARCH PROTOTYPE" */}
              <div className="absolute top-3.5 right-4 text-[10px] font-mono uppercase tracking-widest text-[#777387] bg-white/85 border border-[#8B78D6]/20 px-2.5 py-1 rounded-md shadow-xs pointer-events-none backdrop-blur-xs">
                RESEARCH PROTOTYPE
              </div>

              {/* Floating Label 3: Bottom-Left "SPEECH PATTERNS" */}
              <div className="absolute bottom-3.5 left-4 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#6552A3] bg-white/85 border border-[#8B78D6]/20 px-2.5 py-1 rounded-md shadow-xs pointer-events-none backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6552A3]" />
                <span>SPEECH PATTERNS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
