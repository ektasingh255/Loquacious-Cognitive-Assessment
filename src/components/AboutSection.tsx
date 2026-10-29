/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { AnimatedCompassIcon, AnimatedUsersIcon, AnimatedBookIcon } from './AnimatedIcons';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Why study speech characteristics for cognitive research?',
    answer:
      'Natural speech is one of the most cognitively demanding human motor activities, engaging frontal, temporal, and subcortical pathways. Subtle changes in speech prosody, hesitation pause frequency, and formant stability can provide sensitive longitudinal markers of executive functioning and motor speech coordination.',
  },
  {
    question: 'Is Loquacious a medical diagnostic tool?',
    answer:
      'No. Loquacious is strictly an exploratory research prototype for computational linguistics and auditory neuroscience. It does not provide medical diagnoses, treatment recommendations, or clinical risk scores. All telemetry is intended for academic research and cohort comparison.',
  },
  {
    question: 'What acoustic features are prioritized in the research pipeline?',
    answer:
      'The platform investigates fundamental frequency variability (F0 SD), jitter (local cycle perturbation), shimmer (amplitude perturbation), harmonic-to-noise ratio (HNR), formant frequencies (F1-F4), and temporal speech-pause ratio distributions during standardized task batteries.',
  },
  {
    question: 'How is participant privacy protected?',
    answer:
      'Acoustic signal decomposition runs client-side in the browser via Web Audio DSP routines during active tasks. Audio buffers are processed transiently in memory to calculate mathematical acoustic vectors rather than stored as permanent voice archives without specific IRB protocol approval.',
  },
];

export const AboutSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="about" className="py-24 bg-[#F1EDFF]/30 border-t border-[#8B78D6]/15 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-3">
            <span className="font-semibold uppercase tracking-wider">About The Project</span>
            <span aria-hidden="true" className="text-[#8B78D6]/60">·</span>
            <span>Mission & Ethics</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272438] font-medium tracking-tight mb-4 text-balance">
            Advancing cognitive science through open acoustic research
          </h2>
          <p className="text-base text-[#777387] leading-relaxed">
            Loquacious was founded on the principle that language and vocal acoustics offer a profound,
            non-invasive lens into human cognition. We build transparent computational research tools
            bridging linguistics, signal processing, and neurobiology.
          </p>
        </div>

        {/* 3 Core Principles Grid with Animated Moving Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div
            onMouseEnter={() => setHoveredCard('compass')}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-7 rounded-2xl bg-white border border-[#8B78D6]/15 shadow-xs hover:border-[#8B78D6]/40 transition-all duration-300 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F1EDFF] border border-[#8B78D6]/20 flex items-center justify-center text-[#6552A3] mb-5 group-hover:bg-[#EAE4FF] transition-colors">
              <AnimatedCompassIcon className="w-6 h-6 text-[#6552A3]" isHovered={hoveredCard === 'compass'} />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#272438] mb-2 group-hover:text-[#6552A3] transition-colors">
              Empirical Transparency
            </h3>
            <p className="text-xs sm:text-sm text-[#777387] leading-relaxed">
              We publish computational feature definitions and benchmark our algorithms against verified
              academic standards, rejecting unexplainable black-box clinical scoring.
            </p>
          </div>

          <div
            onMouseEnter={() => setHoveredCard('users')}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-7 rounded-2xl bg-white border border-[#8B78D6]/15 shadow-xs hover:border-[#8B78D6]/40 transition-all duration-300 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F1EDFF] border border-[#8B78D6]/20 flex items-center justify-center text-[#6552A3] mb-5 group-hover:bg-[#EAE4FF] transition-colors">
              <AnimatedUsersIcon className="w-6 h-6 text-[#6552A3]" isHovered={hoveredCard === 'users'} />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#272438] mb-2 group-hover:text-[#6552A3] transition-colors">
              Human Dignity First
            </h3>
            <p className="text-xs sm:text-sm text-[#777387] leading-relaxed">
              Cognitive health touches vulnerable populations. We uphold rigorous ethical guardrails,
              responsible communication, and respectful participant-centric task designs.
            </p>
          </div>

          <div
            onMouseEnter={() => setHoveredCard('book')}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-7 rounded-2xl bg-white border border-[#8B78D6]/15 shadow-xs hover:border-[#8B78D6]/40 transition-all duration-300 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F1EDFF] border border-[#8B78D6]/20 flex items-center justify-center text-[#6552A3] mb-5 group-hover:bg-[#EAE4FF] transition-colors">
              <AnimatedBookIcon className="w-6 h-6 text-[#6552A3]" isHovered={hoveredCard === 'book'} />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#272438] mb-2 group-hover:text-[#6552A3] transition-colors">
              Open Science Philosophy
            </h3>
            <p className="text-xs sm:text-sm text-[#777387] leading-relaxed">
              Designed to foster cross-disciplinary collaboration between computational linguists,
              cognitive neuroscientists, and speech-language researchers.
            </p>
          </div>
        </div>

        {/* Scientific FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6552A3] font-semibold mb-6 text-center">
            Frequently Explored Scientific Inquiries
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#8B78D6]/20 bg-white overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6]"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#272438]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6552A3] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#777387] leading-relaxed border-t border-[#8B78D6]/10 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
