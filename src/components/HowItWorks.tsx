/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mic, Waves, Binary, CheckCircle2, ChevronRight, Play } from 'lucide-react';

interface StepDetail {
  number: string;
  title: string;
  tagline: string;
  summary: string;
  technicalDetails: string[];
  sampleVisual: string;
}

const steps: StepDetail[] = [
  {
    number: '01',
    title: 'Speech Input',
    tagline: 'Standardized phonation and spontaneous tasks',
    summary:
      'The participant completes calibrated speech exercises such as sustained phoneme vocalization (/a/), rapid syllable repetition, and structured picture descriptions under controlled acoustic capture.',
    technicalDetails: [
      'Uncompressed 44.1 kHz 24-bit audio capture',
      'Ambient background noise floor calibration (< 35 dB SNR)',
      'Phonetic stability tracking across 3–15 second task windows',
    ],
    sampleVisual: 'Task: Sustained Vowel /a/ · 5.0s trial duration · Sample rate: 44,100 Hz',
  },
  {
    number: '02',
    title: 'Acoustic Feature Extraction',
    tagline: 'Time-frequency and prosodic decomposition',
    summary:
      'Raw audio waveforms are transformed through digital signal processing to extract fundamental frequency (F0), formant frequencies (F1-F4), harmonic ratios, and micro-pause distributions.',
    technicalDetails: [
      'Short-Time Fourier Transform (STFT) with 25ms Hamming window',
      '13 Mel-Frequency Cepstral Coefficients (MFCCs)',
      'Sub-millisecond speech-to-pause boundary segmentation',
    ],
    sampleVisual: 'Spectral Tilt: -12 dB/octave · Jitter (local): 0.42% · Shimmer: 1.85%',
  },
  {
    number: '03',
    title: 'Machine Learning Analysis',
    tagline: 'Non-diagnostic pattern classification and telemetry',
    summary:
      'Extracted acoustic vectors are modeled using research algorithms to study variance distributions against baseline cohorts, identifying prospective computational biomarkers of cognitive changes.',
    technicalDetails: [
      'Dimensionality reduction via principal component projections',
      'Acoustic clustering across longitudinal recording epochs',
      'Zero diagnostic claims: generates structured research parameters for scientific review',
    ],
    sampleVisual: 'Cohort Cluster Vector: [d=0.28, σ=0.04] · Model Type: Non-clinical research classifier',
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="how-it-works" className="py-24 bg-[#F1EDFF]/40 border-y border-[#8B78D6]/15 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-3">
            <span className="font-semibold uppercase tracking-wider">Methodology</span>
            <span aria-hidden="true" className="text-[#8B78D6]/60">·</span>
            <span>Three-Stage Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272438] font-medium tracking-tight mb-4 text-balance">
            From spoken voice to acoustic research data
          </h2>
          <p className="text-base text-[#777387] leading-relaxed">
            A transparent computational pipeline turning everyday human speech into structured,
            interpretable acoustic parameters for neurocognitive research.
          </p>
        </div>

        {/* Steps Navigation & Connector (Desktop Horizontal / Mobile Vertical) */}
        <div className="relative mb-12">
          {/* Glowing connecting line on desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-[#8B78D6]/20 via-[#6552A3]/30 to-[#8B78D6]/20 -z-0">
            {/* Flowing animated pulse */}
            <div
              className="h-full bg-gradient-to-r from-transparent via-[#8B78D6] to-transparent w-32 animate-pulse"
              style={{
                transform: `translateX(${activeStep * 320}px)`,
                transition: 'transform 0.5s ease',
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 rounded-2xl transition-all duration-300 relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] ${
                    isSelected
                      ? 'bg-white shadow-md border border-[#8B78D6]/40'
                      : 'bg-white/60 hover:bg-white/90 border border-[#8B78D6]/15 hover:border-[#8B78D6]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-sm font-semibold px-2.5 py-1 rounded-md transition-colors ${
                        isSelected
                          ? 'bg-[#6552A3] text-white'
                          : 'bg-[#F1EDFF] text-[#6552A3] group-hover:bg-[#E5DEF8]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="text-xs font-mono text-[#777387]">Stage {idx + 1} of 3</span>
                  </div>

                  <h3
                    className={`font-serif text-xl font-medium mb-1.5 transition-colors ${
                      isSelected ? 'text-[#6552A3]' : 'text-[#272438] group-hover:text-[#6552A3]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#777387] line-clamp-2">{step.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Deep-Dive Card */}
        <div className="bg-white rounded-2xl border border-[#8B78D6]/20 p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-2">
                <span>Phase {steps[activeStep].number} Detail</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold">{steps[activeStep].title}</span>
              </div>
              <h4 className="font-serif text-2xl text-[#272438] font-medium mb-3">
                {steps[activeStep].tagline}
              </h4>
              <p className="text-sm sm:text-base text-[#777387] leading-relaxed mb-6">
                {steps[activeStep].summary}
              </p>

              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#6552A3] font-semibold">
                  Key Research Specifications
                </div>
                {steps[activeStep].technicalDetails.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#272438]">
                    <CheckCircle2 className="w-4 h-4 text-[#8B78D6] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Telemetry Box */}
            <div className="lg:col-span-5 bg-[#FCFBFF] border border-[#8B78D6]/20 rounded-xl p-5">
              <div className="flex items-center justify-between border-b border-[#8B78D6]/15 pb-3 mb-4">
                <span className="text-xs font-mono text-[#6552A3] font-medium uppercase tracking-wider">
                  Signal Output Inspector
                </span>
                <span className="text-[11px] font-mono text-[#777387]">Step 0{activeStep + 1}</span>
              </div>

              {/* Dynamic waveform / parameter visual */}
              <div className="h-28 rounded-lg bg-[#F1EDFF]/50 border border-[#8B78D6]/15 flex items-center justify-center p-4 relative overflow-hidden mb-4">
                {activeStep === 0 && (
                  <div className="flex items-center gap-1.5 w-full h-full justify-center">
                    {[40, 65, 30, 85, 95, 70, 45, 90, 60, 35, 75, 50, 80, 40].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 bg-[#8B78D6] rounded-full transition-all duration-300"
                        style={{ height: `${h}%`, opacity: 0.4 + (i % 3) * 0.2 }}
                      />
                    ))}
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="w-full flex flex-col justify-center gap-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#272438]">
                      <span>F0 Fundamental</span>
                      <span className="font-semibold text-[#6552A3]">142.6 Hz</span>
                    </div>
                    <div className="w-full bg-[#E2DAFC] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#8B78D6] h-full w-[65%]" />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#272438]">
                      <span>Harmonic Ratio</span>
                      <span className="font-semibold text-[#6552A3]">21.4 dB</span>
                    </div>
                    <div className="w-full bg-[#E2DAFC] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#6552A3] h-full w-[78%]" />
                    </div>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="text-center">
                    <div className="text-xs font-mono text-[#6552A3] font-semibold mb-1">
                      Multi-Dimensional Feature Space
                    </div>
                    <div className="text-[11px] text-[#777387]">
                      Exploratory Mahalanobis Distance: 1.42 (p=0.08)
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-[#777387] bg-white px-2 py-0.5 rounded border border-[#8B78D6]/20 inline-block">
                      Status: Non-Diagnostic Model Output
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs font-mono text-[#777387] bg-white p-2.5 rounded-lg border border-[#8B78D6]/15">
                {steps[activeStep].sampleVisual}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
