/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface AnimatedIconProps {
  className?: string;
  isHovered?: boolean;
}

/**
 * 1. Animated Speech Microphone Icon
 * On hover: Sound waves dynamically pulse & radiate, equalizer bars inside oscillate, and mic head vibrates subtly
 */
export const AnimatedMicIcon: React.FC<AnimatedIconProps> = ({ className = 'w-6 h-6', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${active ? 'scale-110' : ''}`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`${className} overflow-visible`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Radiating sound waves on hover */}
        <path
          d="M24 10C25.5 12 26 14.5 26 17"
          stroke="#8B78D6"
          strokeWidth="1.8"
          className={`transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: active ? 'scale(1.08) translateX(1px)' : 'scale(0.9)',
            transformOrigin: 'center',
            transition: 'all 0.35s ease',
          }}
        />
        <path
          d="M27 7C29.5 10 30 13.5 30 17"
          stroke="#6552A3"
          strokeWidth="1.6"
          strokeDasharray="2 2"
          className={`transition-all duration-500 delay-75 ${active ? 'opacity-90' : 'opacity-0'}`}
        />
        <path
          d="M8 10C6.5 12 6 14.5 6 17"
          stroke="#8B78D6"
          strokeWidth="1.8"
          className={`transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: active ? 'scale(1.08) translateX(-1px)' : 'scale(0.9)',
            transformOrigin: 'center',
            transition: 'all 0.35s ease',
          }}
        />

        {/* Microphone capsule outer shell */}
        <rect
          x="11"
          y="5"
          width="10"
          height="15"
          rx="5"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="2"
          fill={active ? '#F1EDFF' : 'none'}
          className="transition-colors duration-300"
        />

        {/* Dynamic Equalizer Bars inside Mic capsule moving in their form */}
        <line
          x1="13.5"
          y1={active ? '9' : '11'}
          x2="13.5"
          y2={active ? '16' : '14'}
          stroke="#8B78D6"
          strokeWidth="1.6"
          className="transition-all duration-200"
          style={{
            animation: active ? 'mic-eq-1 0.6s ease-in-out infinite alternate' : 'none',
          }}
        />
        <line
          x1="16"
          y1={active ? '8' : '10'}
          x2="16"
          y2={active ? '17' : '15'}
          stroke="#6552A3"
          strokeWidth="1.8"
          className="transition-all duration-200"
          style={{
            animation: active ? 'mic-eq-2 0.5s ease-in-out infinite alternate' : 'none',
          }}
        />
        <line
          x1="18.5"
          y1={active ? '10' : '12'}
          x2="18.5"
          y2={active ? '15' : '14'}
          stroke="#8B78D6"
          strokeWidth="1.6"
          className="transition-all duration-200"
          style={{
            animation: active ? 'mic-eq-3 0.7s ease-in-out infinite alternate' : 'none',
          }}
        />

        {/* Mic cradle and stand */}
        <path
          d="M8.5 14.5C8.5 18.6 11.9 22 16 22C20.1 22 23.5 18.6 23.5 14.5"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="2"
        />
        <path
          d="M16 22V28M12 28H20"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="2"
        />
      </svg>
      <style>{`
        @keyframes mic-eq-1 { 0% { y1: 12; y2: 13; } 100% { y1: 8; y2: 17; } }
        @keyframes mic-eq-2 { 0% { y1: 10; y2: 15; } 100% { y1: 7; y2: 18; } }
        @keyframes mic-eq-3 { 0% { y1: 13; y2: 14; } 100% { y1: 9; y2: 16; } }
      `}</style>
    </div>
  );
};

/**
 * 2. Animated Acoustic Waveform / Prosody Icon
 * On hover: Wave peaks morph, translate horizontally, and scanning probe pulse slides along the wave
 */
export const AnimatedWaveformIcon: React.FC<AnimatedIconProps> = ({ className = 'w-6 h-6', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${active ? 'scale-110' : ''}`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`${className} overflow-visible`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Background coordinate frame / grid tick */}
        <rect
          x="3"
          y="4"
          width="26"
          height="24"
          rx="6"
          stroke={active ? '#8B78D6' : '#8B78D6'}
          strokeWidth="1.5"
          strokeOpacity={active ? '0.4' : '0.15'}
          fill={active ? '#F1EDFF' : 'none'}
          className="transition-colors duration-300"
        />

        {/* Zero-crossing baseline axis */}
        <line
          x1="6"
          y1="16"
          x2="26"
          y2="16"
          stroke={active ? '#8B78D6' : 'currentColor'}
          strokeWidth="1"
          strokeDasharray="2 2"
          strokeOpacity="0.4"
        />

        {/* Active oscillating acoustic waveform */}
        <path
          d={
            active
              ? 'M 6 16 Q 8.5 7, 11 16 T 16 16 T 21 7 T 26 16'
              : 'M 6 16 Q 8.5 10, 11 16 T 16 16 T 21 11 T 26 16'
          }
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="2.2"
          className="transition-all duration-300"
          style={{
            animation: active ? 'wave-morph 1.2s ease-in-out infinite alternate' : 'none',
          }}
        />

        {/* Traveling scanning probe dot on peak */}
        <circle
          cx={active ? '21' : '11'}
          cy={active ? '9' : '16'}
          r={active ? '2.5' : '1.8'}
          fill={active ? '#8B78D6' : '#6552A3'}
          className="transition-all duration-300"
          style={{
            animation: active ? 'probe-slide 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' : 'none',
          }}
        />
      </svg>
      <style>{`
        @keyframes wave-morph {
          0% { d: path("M 6 16 Q 8.5 7, 11 16 T 16 16 T 21 8 T 26 16"); }
          50% { d: path("M 6 16 Q 8.5 13, 11 16 T 16 16 T 21 19 T 26 16"); }
          100% { d: path("M 6 16 Q 8.5 22, 11 16 T 16 16 T 21 6 T 26 16"); }
        }
        @keyframes probe-slide {
          0% { cx: 8px; cy: 12px; }
          50% { cx: 16px; cy: 16px; }
          100% { cx: 24px; cy: 10px; }
        }
      `}</style>
    </div>
  );
};

/**
 * 3. Animated Neural Machine Learning Chip Icon
 * On hover: Circuit pins fire pulses, synaptic nodes pulse, and central neural processor rotates & glows
 */
export const AnimatedNeuralChipIcon: React.FC<AnimatedIconProps> = ({ className = 'w-6 h-6', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${active ? 'scale-110' : ''}`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`${className} overflow-visible`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Chip Outer Body */}
        <rect
          x="8"
          y="8"
          width="16"
          height="16"
          rx="4"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="2"
          fill={active ? '#F1EDFF' : 'none'}
          className="transition-colors duration-300"
        />

        {/* Central Core with Breathing Neural Matrix */}
        <rect
          x="12"
          y="12"
          width="8"
          height="8"
          rx="2"
          fill={active ? '#8B78D6' : '#6552A3'}
          className="transition-colors duration-300"
          style={{
            animation: active ? 'core-pulse 1.1s ease-in-out infinite alternate' : 'none',
          }}
        />

        {/* Neural Network Cross Synapses inside core */}
        <circle cx="16" cy="16" r="1.5" fill="white" />

        {/* Top/Bottom Circuit Pins with Traveling Energy Pulses */}
        {[-3, 0, 3].map((offset, i) => (
          <g key={i}>
            <line
              x1={16 + offset}
              y1="3"
              x2={16 + offset}
              y2="8"
              stroke={active ? '#8B78D6' : 'currentColor'}
              strokeWidth="1.6"
              className="transition-colors"
            />
            <line
              x1={16 + offset}
              y1="24"
              x2={16 + offset}
              y2="29"
              stroke={active ? '#8B78D6' : 'currentColor'}
              strokeWidth="1.6"
              className="transition-colors"
            />
            {/* Left/Right Pins */}
            <line
              x1="3"
              y1={16 + offset}
              x2="8"
              y2={16 + offset}
              stroke={active ? '#8B78D6' : 'currentColor'}
              strokeWidth="1.6"
              className="transition-colors"
            />
            <line
              x1="24"
              y1={16 + offset}
              x2="29"
              y2={16 + offset}
              stroke={active ? '#8B78D6' : 'currentColor'}
              strokeWidth="1.6"
              className="transition-colors"
            />
          </g>
        ))}

        {/* Traveling Energy Sparks on Pins when active */}
        {active && (
          <>
            <circle cx="16" cy="5" r="1.2" fill="#6552A3" className="animate-ping" />
            <circle cx="27" cy="16" r="1.2" fill="#8B78D6" className="animate-ping" style={{ animationDelay: '0.2s' }} />
            <circle cx="16" cy="27" r="1.2" fill="#6552A3" className="animate-ping" style={{ animationDelay: '0.4s' }} />
            <circle cx="5" cy="16" r="1.2" fill="#8B78D6" className="animate-ping" style={{ animationDelay: '0.6s' }} />
          </>
        )}
      </svg>
      <style>{`
        @keyframes core-pulse {
          0% { transform: scale(0.92); transform-origin: center; fill: #8B78D6; }
          100% { transform: scale(1.12); transform-origin: center; fill: #6552A3; }
        }
      `}</style>
    </div>
  );
};

/**
 * 4. Animated Longitudinal History / Chrono Telemetry Icon
 * On hover: Watch hands smoothly sweep, tick markers illuminate in orbital cycle, and telemetry ring pulses
 */
export const AnimatedHistoryIcon: React.FC<AnimatedIconProps> = ({ className = 'w-6 h-6', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${active ? 'scale-110' : ''}`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`${className} overflow-visible`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer Circular Dial */}
        <circle
          cx="16"
          cy="16"
          r="11"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="2"
          fill={active ? '#F1EDFF' : 'none'}
          className="transition-colors duration-300"
        />

        {/* Orbital Counter-Clockwise Arrow indicating longitudinal history */}
        <path
          d="M7 16A9 9 0 0 1 23 9.5"
          stroke="#8B78D6"
          strokeWidth="1.6"
          strokeDasharray="2 3"
          className={`transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-40'}`}
          style={{
            transform: active ? 'rotate(-360deg)' : 'none',
            transformOrigin: '16px 16px',
            transition: 'transform 3s linear infinite',
          }}
        />

        {/* Center Pivot */}
        <circle cx="16" cy="16" r="1.8" fill={active ? '#6552A3' : 'currentColor'} />

        {/* Chrono Minute Hand (Sweeps smoothly on hover) */}
        <line
          x1="16"
          y1="16"
          x2="16"
          y2="9"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="2"
          style={{
            transform: active ? 'rotate(360deg)' : 'rotate(0deg)',
            transformOrigin: '16px 16px',
            transition: active ? 'transform 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite' : 'transform 0.4s ease',
          }}
        />

        {/* Chrono Hour Hand */}
        <line
          x1="16"
          y1="16"
          x2="21"
          y2="16"
          stroke={active ? '#8B78D6' : 'currentColor'}
          strokeWidth="2"
          style={{
            transform: active ? 'rotate(90deg)' : 'rotate(0deg)',
            transformOrigin: '16px 16px',
            transition: active ? 'transform 2.4s ease-in-out infinite alternate' : 'transform 0.4s ease',
          }}
        />

        {/* Tick Dots around dial */}
        <circle cx="16" cy="6" r="1" fill="#8B78D6" />
        <circle cx="26" cy="16" r="1" fill="#8B78D6" />
        <circle cx="16" cy="26" r="1" fill="#8B78D6" />
        <circle cx="6" cy="16" r="1" fill="#8B78D6" />
      </svg>
    </div>
  );
};

/**
 * 5. Animated Brand Neuron Logo Icon
 * On hover: Synaptic dendrites expand, core pulses, and signal sparks travel across branches
 */
export const AnimatedNeuronLogo: React.FC<AnimatedIconProps> = ({ className = 'w-5 h-5', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className="relative flex items-center justify-center cursor-pointer"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${className} overflow-visible transition-transform duration-300 ${active ? 'scale-110' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Core Soma / Nucleus */}
        <circle
          cx="12"
          cy="12"
          r={active ? '3.2' : '2.5'}
          fill="#8B78D6"
          fillOpacity={active ? '0.55' : '0.3'}
          stroke="#6552A3"
          strokeWidth="1.8"
          className="transition-all duration-300"
        />

        {/* Synaptic Terminal Nodes */}
        <circle
          cx={active ? '4.5' : '5'}
          cy={active ? '6.5' : '7'}
          r={active ? '2' : '1.5'}
          fill={active ? '#6552A3' : 'currentColor'}
          className="transition-all duration-300"
        />
        <circle
          cx={active ? '19.5' : '19'}
          cy={active ? '7.5' : '8'}
          r={active ? '2' : '1.5'}
          fill={active ? '#8B78D6' : 'currentColor'}
          className="transition-all duration-300"
        />
        <circle
          cx={active ? '6.5' : '7'}
          cy={active ? '18.5' : '18'}
          r={active ? '2' : '1.5'}
          fill={active ? '#8B78D6' : 'currentColor'}
          className="transition-all duration-300"
        />
        <circle
          cx={active ? '18.5' : '18'}
          cy={active ? '17.5' : '17'}
          r={active ? '2' : '1.5'}
          fill={active ? '#6552A3' : 'currentColor'}
          className="transition-all duration-300"
        />

        {/* Axon & Dendrite Fibers */}
        <path
          d="M6.5 8L10 10.8"
          stroke={active ? '#8B78D6' : 'currentColor'}
          strokeWidth={active ? '2' : '1.5'}
          className="transition-colors"
        />
        <path
          d="M17.5 9L14 11.2"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth={active ? '2' : '1.5'}
          className="transition-colors"
        />
        <path
          d="M8.2 16.8L10.5 13.8"
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth={active ? '2' : '1.5'}
          className="transition-colors"
        />
        <path
          d="M16.8 15.8L13.8 13"
          stroke={active ? '#8B78D6' : 'currentColor'}
          strokeWidth={active ? '2' : '1.5'}
          className="transition-colors"
        />

        {/* Action Potential traveling dots on hover */}
        {active && (
          <>
            <circle cx="8" cy="9.2" r="1" fill="#6552A3" className="animate-ping" />
            <circle cx="16" cy="10" r="1" fill="#8B78D6" className="animate-ping" style={{ animationDelay: '0.25s' }} />
            <circle cx="15.5" cy="14.5" r="1" fill="#6552A3" className="animate-ping" style={{ animationDelay: '0.5s' }} />
          </>
        )}
      </svg>
    </div>
  );
};

/**
 * 6. Animated Compass Icon (for Empirical Transparency)
 * On hover: Needle oscillates with magnetic damping and rose ring sweeps
 */
export const AnimatedCompassIcon: React.FC<AnimatedIconProps> = ({ className = 'w-5 h-5', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className="relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${className} overflow-visible transition-transform duration-300 ${active ? 'scale-110' : ''}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" stroke={active ? '#6552A3' : 'currentColor'} strokeWidth="1.8" />
        {/* Magnetic needle that sways back and forth on hover */}
        <polygon
          points="12,5 15,12 12,19 9,12"
          fill={active ? '#8B78D6' : 'none'}
          fillOpacity={active ? '0.3' : '0'}
          stroke={active ? '#6552A3' : 'currentColor'}
          strokeWidth="1.8"
          style={{
            transform: active ? 'rotate(45deg)' : 'rotate(0deg)',
            transformOrigin: '12px 12px',
            animation: active ? 'compass-sway 1.4s ease-in-out infinite alternate' : 'none',
          }}
        />
        <circle cx="12" cy="12" r="1.5" fill={active ? '#6552A3' : 'currentColor'} />
      </svg>
      <style>{`
        @keyframes compass-sway {
          0% { transform: rotate(15deg); }
          50% { transform: rotate(65deg); }
          100% { transform: rotate(-25deg); }
        }
      `}</style>
    </div>
  );
};

/**
 * 7. Animated Users Icon (for Human Dignity First)
 * On hover: Figures nod and connection wave flows between them
 */
export const AnimatedUsersIcon: React.FC<AnimatedIconProps> = ({ className = 'w-5 h-5', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className="relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${className} overflow-visible transition-transform duration-300 ${active ? 'scale-110' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Primary Figure */}
        <circle
          cx="9"
          cy="7"
          r="3"
          stroke={active ? '#6552A3' : 'currentColor'}
          style={{
            transform: active ? 'translateY(-1.5px)' : 'none',
            transition: 'transform 0.3s ease',
          }}
        />
        <path
          d="M3 19C3 15.6863 5.68629 13 9 13C12.3137 13 15 15.6863 15 19"
          stroke={active ? '#6552A3' : 'currentColor'}
        />

        {/* Secondary Figure */}
        <circle
          cx="17"
          cy="9"
          r="2.5"
          stroke={active ? '#8B78D6' : 'currentColor'}
          style={{
            transform: active ? 'translateY(-2px)' : 'none',
            transition: 'transform 0.4s ease 0.05s',
          }}
        />
        <path
          d="M16 13.5C18.2 14.2 20 16 20 18.5"
          stroke={active ? '#8B78D6' : 'currentColor'}
        />
      </svg>
    </div>
  );
};

/**
 * 8. Animated Book / Research Open Science Icon
 * On hover: Book pages lift and reveal knowledge lines
 */
export const AnimatedBookIcon: React.FC<AnimatedIconProps> = ({ className = 'w-5 h-5', isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className="relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${className} overflow-visible transition-transform duration-300 ${active ? 'scale-110' : ''}`}
        fill="none"
        stroke={active ? '#6552A3' : 'currentColor'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M2 3H8C10.2 3 12 4.8 12 7V21C12 19.3 10.2 18 8 18H2V3Z"
          fill={active ? '#F1EDFF' : 'none'}
          className="transition-colors duration-300"
          style={{
            transform: active ? 'rotateY(-15deg)' : 'none',
            transformOrigin: '12px 12px',
            transition: 'transform 0.4s ease',
          }}
        />
        <path
          d="M22 3H16C13.8 3 12 4.8 12 7V21C12 19.3 13.8 18 16 18H22V3Z"
          fill={active ? '#F1EDFF' : 'none'}
          className="transition-colors duration-300"
          style={{
            transform: active ? 'rotateY(15deg)' : 'none',
            transformOrigin: '12px 12px',
            transition: 'transform 0.4s ease',
          }}
        />
        {/* Knowledge Lines inside book that reveal on hover */}
        {active && (
          <>
            <line x1="5" y1="7" x2="9" y2="7" stroke="#8B78D6" strokeWidth="1.2" />
            <line x1="5" y1="10" x2="9" y2="10" stroke="#8B78D6" strokeWidth="1.2" />
            <line x1="15" y1="7" x2="19" y2="7" stroke="#8B78D6" strokeWidth="1.2" />
            <line x1="15" y1="10" x2="19" y2="10" stroke="#8B78D6" strokeWidth="1.2" />
          </>
        )}
      </svg>
    </div>
  );
};
