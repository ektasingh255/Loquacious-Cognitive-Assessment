/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AnimatedMicIcon,
  AnimatedWaveformIcon,
  AnimatedNeuralChipIcon,
  AnimatedHistoryIcon,
} from './AnimatedIcons';

interface FeatureCardData {
  id: string;
  IconComponent: React.ComponentType<{ className?: string; isHovered?: boolean }>;
  title: string;
  category: string;
  status: string;
  description: string;
  metrics: string[];
  honestNote: string;
}

const features: FeatureCardData[] = [
  {
    id: 'speech-analysis',
    IconComponent: AnimatedMicIcon,
    category: 'Signal Processing',
    status: 'Interactive Prototype',
    title: 'Acoustic Speech Analysis',
    description:
      'High-resolution extraction of fundamental frequency (F0), formant trajectories, jitter, and shimmer from standardized phonation protocols.',
    metrics: ['F0 Pitch Stability', 'Harmonics-to-Noise (HNR)', 'Formants (F1, F2)'],
    honestNote: 'Interactive test module available in prototype; calibrated for research exploration.',
  },
  {
    id: 'feature-extraction',
    IconComponent: AnimatedWaveformIcon,
    category: 'Prosodic Modeling',
    status: 'Research Pipeline',
    title: 'Temporal Feature Extraction',
    description:
      'Quantifies micro-pause duration, speech-to-silence ratios, and articulation velocity during spontaneous picture-description speech tasks.',
    metrics: ['Pause Frequency', 'Phonation Time %', 'Articulation Velocity'],
    honestNote: 'Algorithm specifications designed; benchmarked against academic baseline datasets.',
  },
  {
    id: 'ml-research',
    IconComponent: AnimatedNeuralChipIcon,
    category: 'Machine Learning',
    status: 'Experimental Modeling',
    title: 'Cognitive Classifier Exploration',
    description:
      'Non-diagnostic exploratory models studying subtle acoustic variance patterns across multi-dimensional feature spaces.',
    metrics: ['Cluster Dispersion', 'Acoustic Weighting', 'Variance Tracking'],
    honestNote: 'Theoretical research framework; not clinical or approved for medical diagnosis.',
  },
  {
    id: 'assessment-history',
    IconComponent: AnimatedHistoryIcon,
    category: 'Telemetry Store',
    status: 'Planned Architecture',
    title: 'Longitudinal Research Telemetry',
    description:
      'Structured temporal tracking of acoustic biomarker stability over sequential sessions for longitudinal research cohorts.',
    metrics: ['Session Drift', 'Variance Index', 'Audit Trail'],
    honestNote: 'Architectural schema ready; planned for connection with persistent research database.',
  },
];

interface CardTiltState {
  rotateX: number;
  rotateY: number;
}

export const FeatureCards: React.FC<{ onSelectFeature?: (id: string) => void }> = ({
  onSelectFeature,
}) => {
  const [tiltStates, setTiltStates] = useState<Record<string, CardTiltState>>({});
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    setHoveredCardId(id);
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Small restrained 3D tilt (max ~3-4 deg)
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setTiltStates((prev) => ({
      ...prev,
      [id]: { rotateX, rotateY },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredCardId(null);
    setTiltStates((prev) => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0 },
    }));
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#FCFBFF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6552A3] mb-3">
            <span className="font-semibold uppercase tracking-wider">Research Architecture</span>
            <span aria-hidden="true" className="text-[#8B78D6]/60">·</span>
            <span>Acoustic Science</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272438] font-medium tracking-tight mb-4 text-balance">
            Designed around meaningful speech research
          </h2>
          <p className="text-base text-[#777387] leading-relaxed">
            Every component is grounded in computational linguistics and auditory neuroscience literature.
            Explore the specialized acoustic extraction and experimental modeling layers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((card) => {
            const IconComponent = card.IconComponent;
            const tilt = tiltStates[card.id] || { rotateX: 0, rotateY: 0 };
            const isHovered = hoveredCardId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseMove={(e) => handleMouseMove(e, card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
                style={{
                  transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  transition: 'transform 0.18s ease-out, box-shadow 0.25s ease',
                }}
                className="animated-border-card flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl shadow-xs card-hover-glow cursor-default group"
              >
                <div>
                  {/* Top Bar inside Card with Animated Moving Icon */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#F1EDFF] border border-[#8B78D6]/20 flex items-center justify-center text-[#6552A3] group-hover:bg-[#EAE4FF] transition-colors duration-200">
                      <IconComponent className="w-6 h-6 text-[#6552A3]" isHovered={isHovered} />
                    </div>
                    <span className="text-[11px] font-mono text-[#777387] uppercase tracking-wider">
                      {card.category}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl font-medium text-[#272438] mb-3 group-hover:text-[#6552A3] transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#777387] leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Research Metric Chips */}
                  <div className="pt-4 border-t border-[#8B78D6]/10 mb-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#6552A3] mb-2 font-semibold">
                      Measured Parameters
                    </div>
                    <ul className="space-y-1.5">
                      {card.metrics.map((metric, mIdx) => (
                        <li key={mIdx} className="text-xs text-[#272438] flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#8B78D6]" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Honest Prototype Status Tag */}
                <div className="pt-4 border-t border-[#8B78D6]/10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#6552A3] font-medium">{card.status}</span>
                  </div>
                  <p className="text-[11px] text-[#777387] italic">
                    {card.honestNote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
