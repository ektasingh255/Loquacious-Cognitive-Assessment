/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, Sparkles, Scale, Info } from 'lucide-react';

export const ResearchTrust: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'biomarkers' | 'methodology' | 'ethics'>('biomarkers');

  return (
    <section id="research" className="py-24 bg-[#FCFBFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-3">
            <span className="font-semibold uppercase tracking-wider">Scientific Purpose</span>
            <span aria-hidden="true" className="text-[#8B78D6]/60">·</span>
            <span>Auditory Cognitive Science</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272438] font-medium tracking-tight mb-4 text-balance">
            Rigorous inquiry into vocal acoustic markers
          </h2>
          <p className="text-base text-[#777387] leading-relaxed">
            Spoken language integrates neuromuscular coordination, working memory, and lexical retrieval.
            Loquacious investigates how subtle acoustic variations might serve as sensitive, non-invasive
            computational markers in cognitive neuroscience.
          </p>
        </div>

        {/* Tab Controls (Functional interactive buttons) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F1EDFF] rounded-xl max-w-lg mb-10 border border-[#8B78D6]/20">
          <button
            onClick={() => setActiveTab('biomarkers')}
            className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] ${
              activeTab === 'biomarkers'
                ? 'bg-white text-[#6552A3] shadow-xs font-semibold'
                : 'text-[#777387] hover:text-[#272438]'
            }`}
          >
            Acoustic Biomarkers
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] ${
              activeTab === 'methodology'
                ? 'bg-white text-[#6552A3] shadow-xs font-semibold'
                : 'text-[#777387] hover:text-[#272438]'
            }`}
          >
            Research Methodology
          </button>
          <button
            onClick={() => setActiveTab('ethics')}
            className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] ${
              activeTab === 'ethics'
                ? 'bg-white text-[#6552A3] shadow-xs font-semibold'
                : 'text-[#777387] hover:text-[#272438]'
            }`}
          >
            Data Ethics & Scope
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#8B78D6]/20 p-8 sm:p-10 shadow-xs">
            {activeTab === 'biomarkers' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-3">
                  <Sparkles className="w-4 h-4 text-[#8B78D6]" />
                  <span>Cognitive-Acoustic Coupling</span>
                </div>
                <h3 className="font-serif text-2xl text-[#272438] font-medium mb-4">
                  Why speech reflects neurocognitive processing
                </h3>
                <p className="text-sm sm:text-base text-[#777387] leading-relaxed mb-6">
                  Vocal production requires synchronized activity across more than 100 laryngeal, oral,
                  and respiratory muscles governed by interconnected cortical circuits. When cognitive load
                  increases or subtle neurological shifts occur, micro-variations appear in vocal stability,
                  hesitation pauses, and formant clarity.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#8B78D6]/15">
                  <div className="p-4 rounded-xl bg-[#FCFBFF] border border-[#8B78D6]/15">
                    <div className="text-xs font-mono uppercase text-[#6552A3] font-semibold mb-1">
                      Phonatory Stability
                    </div>
                    <p className="text-xs text-[#777387]">
                      Cycle-to-cycle frequency tremor (jitter) and amplitude fluctuation (shimmer) in sustained phonation.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FCFBFF] border border-[#8B78D6]/15">
                    <div className="text-xs font-mono uppercase text-[#6552A3] font-semibold mb-1">
                      Temporal Pauses
                    </div>
                    <p className="text-xs text-[#777387]">
                      Silent and filled pause duration distributions that correlate with lexical search latency.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'methodology' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-3">
                  <Scale className="w-4 h-4 text-[#8B78D6]" />
                  <span>Transparent Calibration</span>
                </div>
                <h3 className="font-serif text-2xl text-[#272438] font-medium mb-4">
                  Standardized, reproducible signal extraction
                </h3>
                <p className="text-sm sm:text-base text-[#777387] leading-relaxed mb-6">
                  The Loquacious architecture adheres to established computational acoustic frameworks,
                  cross-referencing feature formulations against open standards such as the Geneva Minimalistic
                  Acoustic Parameter Set (GeMAPS) and praat-compatible algorithms.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-[#272438] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B78D6]" />
                    <span>Linear predictive coding (LPC) for vocal tract resonance modeling</span>
                  </div>
                  <div className="text-xs font-mono text-[#272438] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B78D6]" />
                    <span>Standardized cepstral peak prominence (CPPV) for phonation purity</span>
                  </div>
                  <div className="text-xs font-mono text-[#272438] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B78D6]" />
                    <span>Transparent mathematical documentation without black-box metrics</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ethics' && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-3">
                  <Lock className="w-4 h-4 text-[#8B78D6]" />
                  <span>Research Integrity</span>
                </div>
                <h3 className="font-serif text-2xl text-[#272438] font-medium mb-4">
                  Ethical boundaries and participant privacy
                </h3>
                <p className="text-sm sm:text-base text-[#777387] leading-relaxed mb-6">
                  Voice is personal biometric data. Research prototypes must treat participants with
                  uncompromising privacy. In this prototype, audio buffers remain transient in client
                  memory during acoustic metric calculation, ensuring zero unconsented persistent recordings.
                </p>

                <div className="p-4 rounded-xl bg-[#F1EDFF]/60 border border-[#8B78D6]/20 text-xs text-[#272438]">
                  <p className="font-medium mb-1 text-[#6552A3]">Client-Side First Processing</p>
                  <p className="text-[#777387]">
                    Signal decomposition runs directly via the browser's Web Audio API and local DSP routines.
                    Participant privacy is preserved by avoiding third-party ad tracking or biometric sale.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Minimal Scientific Visualization */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#8B78D6]/20 p-8 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#6552A3] font-semibold mb-2">
              Acoustic Feature Space Profile
            </div>
            <p className="text-xs text-[#777387] mb-6">
              Sample relative distribution of four acoustic dimensions across experimental speech tasks.
            </p>

            {/* Scientific Bar Distribution Matrix */}
            <div className="space-y-4">
              {[
                { label: 'Fundamental Frequency Stability', value: '88%', delta: 'Δ 0.04 Hz' },
                { label: 'Harmonic Spectral Purity (HNR)', value: '74%', delta: '22.8 dB' },
                { label: 'Pause Ratio Regularity', value: '62%', delta: '180 ms mean' },
                { label: 'Formant Dispersion (F2-F1)', value: '81%', delta: '1,240 Hz' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#272438]">{item.label}</span>
                    <span className="text-[#6552A3] font-medium">{item.delta}</span>
                  </div>
                  <div className="w-full bg-[#F1EDFF] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8B78D6] h-full rounded-full transition-all duration-500"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#8B78D6]/15 flex items-center justify-between text-[11px] font-mono text-[#777387]">
              <span>Sample Cohort Index: #EXP-104</span>
              <span>DSP: 44.1 kHz STFT</span>
            </div>
          </div>
        </div>

        {/* Transparent Research Disclaimer Box */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F1EDFF] to-[#FCFBFF] border border-[#8B78D6]/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-white border border-[#8B78D6]/30 flex items-center justify-center text-[#6552A3] shrink-0 shadow-xs">
            <Info className="w-6 h-6 text-[#6552A3]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-medium text-[#272438]">
              Important Scientific Scope & Medical Disclaimer
            </h4>
            <p className="text-xs sm:text-sm text-[#777387] leading-relaxed">
              Loquacious is an experimental research prototype engineered for scientific inquiry, academic studies,
              and computational linguistics exploration. It is not an FDA-cleared or CE-marked medical device, does
              not calculate medical risk scores, and is not a substitute for clinical cognitive examination by a
              certified neuropsychologist or neurologist.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
