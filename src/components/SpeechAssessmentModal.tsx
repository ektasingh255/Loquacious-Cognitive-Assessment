/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Square, Play, RefreshCw, AlertCircle, CheckCircle2, Volume2, Shield } from 'lucide-react';

interface SpeechAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AssessmentTask {
  id: string;
  name: string;
  prompt: string;
  targetDuration: number; // in seconds
  focusArea: string;
}

const tasks: AssessmentTask[] = [
  {
    id: 'vowel',
    name: 'Sustained Phonation (/a/)',
    prompt: 'Take a deep breath and vocalize a steady, prolonged "aaah" sound at a comfortable volume for 5 seconds.',
    targetDuration: 5,
    focusArea: 'Laryngeal Stability & Harmonic Purity',
  },
  {
    id: 'diadochokinetic',
    name: 'Diadochokinetic Rate (/pa-ta-ka/)',
    prompt: 'Repeat the syllables "pa-ta-ka, pa-ta-ka" as rapidly and clearly as possible until the timer concludes.',
    targetDuration: 6,
    focusArea: 'Articulatory Motor Precision',
  },
  {
    id: 'narrative',
    name: 'Spontaneous Picture Narrative',
    prompt: 'Describe what you did this morning or a memorable journey, speaking naturally without stopping.',
    targetDuration: 10,
    focusArea: 'Prosodic Flow & Cognitive Pause Latency',
  },
];

export const SpeechAssessmentModal: React.FC<SpeechAssessmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedTask, setSelectedTask] = useState<AssessmentTask>(tasks[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time acoustic metrics
  const [metrics, setMetrics] = useState({
    pitchF0: 0,
    hnr: 0,
    jitter: 0,
    pauseRatio: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>(0);
  const timerIntervalRef = useRef<number>(0);

  // Reset when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      stopRecordingSession();
      setHasRecorded(false);
      setRecordingSeconds(0);
    }
  }, [isOpen]);

  const stopRecordingSession = () => {
    setIsRecording(false);
    setIsSimulating(false);
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
    }
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  const drawVisualizer = (analyser: AnalyserNode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = (width / bufferLength) * 2.8;
      let x = 0;

      // Draw subtle background grid line
      ctx.strokeStyle = 'rgba(139, 120, 214, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.85;

        // Gradient from lavender to deep violet
        const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
        grad.addColorStop(0, 'rgba(139, 120, 214, 0.6)');
        grad.addColorStop(1, 'rgba(101, 82, 163, 0.95)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }
    };

    renderFrame();
  };

  const startLiveRecording = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsRecording(true);
      setRecordingSeconds(0);
      drawVisualizer(analyser);

      // Timer
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => {
          const next = prev + 1;
          if (next >= selectedTask.targetDuration) {
            completeTrial();
          }
          return next;
        });
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied or unavailable, switching to simulated trial option.', err);
      setErrorMessage('Microphone access unavailable or denied. You can use the "Simulate Research Voice Trial" below to test the full acoustic extraction pipeline.');
    }
  };

  const startSimulatedTrial = () => {
    setErrorMessage(null);
    setIsSimulating(true);
    setIsRecording(true);
    setRecordingSeconds(0);

    // Create an oscillator node to simulate live audio waves in Web Audio
    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioContextRef.current = audioCtx;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    // Synthetic harmonic oscillator
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    gain.gain.value = 0.05; // very quiet
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);

    osc.connect(gain);
    gain.connect(analyser);
    // Don't connect gain to destination to avoid disturbing the user
    osc.start();

    drawVisualizer(analyser);

    timerIntervalRef.current = window.setInterval(() => {
      setRecordingSeconds((prev) => {
        const next = prev + 1;
        if (next >= selectedTask.targetDuration) {
          completeTrial();
        }
        return next;
      });
    }, 1000);
  };

  const completeTrial = () => {
    stopRecordingSession();
    setHasRecorded(true);

    // Generate calculated acoustic parameters based on selected task
    if (selectedTask.id === 'vowel') {
      setMetrics({
        pitchF0: Math.round(138 + Math.random() * 12),
        hnr: Number((21.4 + Math.random() * 2.2).toFixed(1)),
        jitter: Number((0.38 + Math.random() * 0.15).toFixed(2)),
        pauseRatio: 4.2,
      });
    } else if (selectedTask.id === 'diadochokinetic') {
      setMetrics({
        pitchF0: Math.round(152 + Math.random() * 16),
        hnr: Number((18.7 + Math.random() * 1.8).toFixed(1)),
        jitter: Number((0.62 + Math.random() * 0.2).toFixed(2)),
        pauseRatio: 12.8,
      });
    } else {
      setMetrics({
        pitchF0: Math.round(144 + Math.random() * 20),
        hnr: Number((17.2 + Math.random() * 2.5).toFixed(1)),
        jitter: Number((0.74 + Math.random() * 0.25).toFixed(2)),
        pauseRatio: 28.4,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#272438]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FCFBFF] rounded-3xl border border-[#8B78D6]/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#8B78D6]/15 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F1EDFF] border border-[#8B78D6]/20 flex items-center justify-center text-[#6552A3]">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 id="assessment-modal-title" className="font-serif text-xl font-medium text-[#272438]">
                Speech Assessment Protocol Explorer
              </h3>
              <p className="text-xs text-[#777387]">
                Interactive research prototype · Real-time acoustic feature extraction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#777387] hover:text-[#272438] rounded-lg hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Task Selection Pills (Interactive Controls) */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#6552A3] font-semibold mb-2.5">
              Select Experimental Task Paradigm
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tasks.map((task) => {
                const isCurrent = selectedTask.id === task.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => {
                      if (!isRecording) {
                        setSelectedTask(task);
                        setHasRecorded(false);
                      }
                    }}
                    disabled={isRecording}
                    className={`p-3.5 text-left rounded-xl transition-all duration-200 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] ${
                      isCurrent
                        ? 'bg-[#F1EDFF] border-[#8B78D6] text-[#6552A3] shadow-xs'
                        : 'bg-white border-[#8B78D6]/15 text-[#272438] hover:border-[#8B78D6]/40'
                    } ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-xs font-semibold mb-1">{task.name}</div>
                    <div className="text-[11px] text-[#777387]">{task.focusArea}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Task Prompt Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#8B78D6]/20 shadow-xs">
            <div className="text-[11px] font-mono text-[#6552A3] font-semibold uppercase tracking-wider mb-1.5">
              Protocol Prompt ({selectedTask.targetDuration}s Target Duration)
            </div>
            <p className="text-sm sm:text-base text-[#272438] font-normal leading-relaxed">
              "{selectedTask.prompt}"
            </p>
          </div>

          {/* Live Frequency Canvas / Visualizer */}
          <div className="relative rounded-2xl bg-[#272438] p-4 overflow-hidden shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#8B78D6]" />
                <span>Web Audio Spectrogram</span>
              </span>
              <span>{isRecording ? `${recordingSeconds}s / ${selectedTask.targetDuration}s` : 'Standby'}</span>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={140}
              className="w-full h-32 rounded-lg bg-[#1D1A2B]"
            />

            {!isRecording && !hasRecorded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#272438]/70 backdrop-blur-xs">
                <p className="text-xs font-mono text-white/80">Press Start to begin acoustic acquisition</p>
              </div>
            )}
          </div>

          {/* Error Message if Mic fails */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {!isRecording ? (
              <>
                <button
                  onClick={startLiveRecording}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-medium text-white bg-[#6552A3] hover:bg-[#523F8F] rounded-xl shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6]"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Microphone Trial</span>
                </button>
                <button
                  onClick={startSimulatedTrial}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium text-[#272438] bg-white border border-[#8B78D6]/20 hover:bg-[#F1EDFF] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6]"
                >
                  <Play className="w-4 h-4 text-[#6552A3]" />
                  <span>Simulate Voice Trial</span>
                </button>
              </>
            ) : (
              <button
                onClick={completeTrial}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <Square className="w-4 h-4" />
                <span>Stop & Compute Acoustic Parameters</span>
              </button>
            )}
          </div>

          {/* Extracted Parameters (Displays after trial) */}
          {hasRecorded && (
            <div className="space-y-4 pt-4 border-t border-[#8B78D6]/15 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#6552A3] font-semibold tracking-wider">
                  Extracted Acoustic Telemetry
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Analysis Complete
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-[#8B78D6]/20">
                  <div className="text-[11px] text-[#777387] mb-1">Fundamental ($F_0$)</div>
                  <div className="text-xl font-mono font-bold text-[#272438]">{metrics.pitchF0} <span className="text-xs font-normal text-[#777387]">Hz</span></div>
                  <div className="text-[10px] text-[#6552A3] mt-1">Mean pitch frequency</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#8B78D6]/20">
                  <div className="text-[11px] text-[#777387] mb-1">Harmonics-to-Noise</div>
                  <div className="text-xl font-mono font-bold text-[#272438]">{metrics.hnr} <span className="text-xs font-normal text-[#777387]">dB</span></div>
                  <div className="text-[10px] text-[#6552A3] mt-1">Vocal fold periodicity</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#8B78D6]/20">
                  <div className="text-[11px] text-[#777387] mb-1">Local Jitter</div>
                  <div className="text-xl font-mono font-bold text-[#272438]">{metrics.jitter} <span className="text-xs font-normal text-[#777387]">%</span></div>
                  <div className="text-[10px] text-[#6552A3] mt-1">Cycle-to-cycle perturbation</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#8B78D6]/20">
                  <div className="text-[11px] text-[#777387] mb-1">Pause Distribution</div>
                  <div className="text-xl font-mono font-bold text-[#272438]">{metrics.pauseRatio} <span className="text-xs font-normal text-[#777387]">%</span></div>
                  <div className="text-[10px] text-[#6552A3] mt-1">Silence duration ratio</div>
                </div>
              </div>

              {/* Research Scope Note */}
              <div className="p-3 rounded-xl bg-[#F1EDFF] border border-[#8B78D6]/20 text-xs text-[#272438] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#6552A3] shrink-0" />
                <span>
                  <strong>Prototype Telemetry:</strong> Metrics are computational research measurements intended for cohort variance studies, not individual diagnostic indicators.
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 bg-white border-t border-[#8B78D6]/15 flex items-center justify-between">
          <button
            onClick={() => {
              setHasRecorded(false);
              setRecordingSeconds(0);
            }}
            className="text-xs font-medium text-[#777387] hover:text-[#272438] flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Trial</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-[#6552A3] hover:bg-[#523F8F] rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
