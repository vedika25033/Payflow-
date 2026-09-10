import { useState, useEffect, useCallback } from 'react';
import { Scenario } from '../../types';

interface InterceptorScreenProps {
  scenario: Scenario;
  onComplete: (passed: boolean) => void;
}

export default function InterceptorScreen({ scenario, onComplete }: InterceptorScreenProps) {
  const [phase, setPhase] = useState<'scanning' | 'checks' | 'result'>('scanning');
  const [currentCheck, setCurrentCheck] = useState(0);
  const [checkResults, setCheckResults] = useState<(boolean | null)[]>(() => scenario.checks.map(() => null));
  const [elapsed, setElapsed] = useState(0);

  const allPassed = scenario.checks.every(c => c.pass);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => {
        if (prev >= 10) {
          clearInterval(interval);
          return 10;
        }
        return prev + 0.1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Phase: scanning → checks
  useEffect(() => {
    const t = setTimeout(() => setPhase('checks'), 2000);
    return () => clearTimeout(t);
  }, []);

  // Run checks sequentially
  useEffect(() => {
    if (phase !== 'checks') return;

    if (currentCheck >= scenario.checks.length) {
      // All checks done → show result
      setTimeout(() => {
        setPhase('result');
        setTimeout(() => onComplete(allPassed), 1500);
      }, 600);
      return;
    }

    const timer = setTimeout(() => {
      setCheckResults(prev => {
        const next = [...prev];
        next[currentCheck] = scenario.checks[currentCheck].pass;
        return next;
      });
      setCurrentCheck(prev => prev + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [phase, currentCheck, scenario.checks, onComplete, allPassed]);

  const passedCount = checkResults.filter(r => r === true).length;
  const failedCount = checkResults.filter(r => r === false).length;
  const completedChecks = checkResults.filter(r => r !== null).length;

  return (
    <div className="animate-fade-in h-full flex flex-col bg-slate-900 relative overflow-hidden">
      {/* Radar background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="radar-pulse w-64 h-64 rounded-full border border-indigo-500/10" />
        <div className="radar-pulse w-48 h-48 rounded-full border border-indigo-500/10 absolute" style={{ animationDelay: '0.5s' }} />
        <div className="radar-pulse w-32 h-32 rounded-full border border-indigo-500/10 absolute" style={{ animationDelay: '1s' }} />
        {/* Sweep */}
        {phase === 'scanning' && (
          <div className="radar-sweep absolute w-full h-full">
            <div className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-b from-indigo-400/60 to-transparent origin-bottom" />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${phase === 'result' ? (allPassed ? 'bg-emerald-400' : 'bg-red-400') : 'bg-indigo-400 animate-pulse'}`} />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              {phase === 'scanning' ? 'Initializing...' : phase === 'checks' ? 'Running Checks...' : 'Complete'}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">{elapsed.toFixed(1)}s</span>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5">
        {phase === 'scanning' ? (
          <div className="text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full border-3 border-indigo-500/30 border-t-indigo-400 animate-spin mx-auto" />
            <p className="text-sm text-indigo-300 mt-5 font-medium">Scanning transaction...</p>
            <p className="text-[10px] text-slate-500 mt-1">Initializing PayFlow Shield</p>
          </div>
        ) : (
          <div className="w-full max-w-[300px] space-y-2">
            <p className="text-[10px] text-indigo-400 uppercase tracking-wider font-medium mb-3">
              Security Analysis — {completedChecks}/{scenario.checks.length} Complete
            </p>

            {scenario.checks.map((check, i) => {
              const result = checkResults[i];
              const isActive = i === currentCheck && result === null;
              const isDone = result !== null;

              return (
                <div
                  key={i}
                  className={`
                    rounded-xl p-3 border transition-all duration-300
                    ${isActive
                      ? 'bg-indigo-500/10 border-indigo-500/30'
                      : isDone && result
                        ? 'bg-emerald-500/10 border-emerald-500/20'
                        : isDone && !result
                          ? 'bg-red-500/10 border-red-500/20'
                          : 'bg-slate-800/50 border-slate-700/30'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{check.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">{check.label}</span>
                        {isDone ? (
                          result ? (
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : isActive ? (
                          <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600" />
                        )}
                      </div>
                      {isDone && (
                        <p className={`text-[10px] mt-0.5 leading-relaxed ${
                          result ? 'text-emerald-400/80' : 'text-red-400/80'
                        }`}>
                          {check.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom stats */}
      {phase === 'checks' && (
        <div className="relative z-10 px-5 pb-6 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-400">{passedCount}</p>
            <p className="text-[9px] text-slate-500 uppercase">Passed</p>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="text-center">
            <p className="text-lg font-bold text-red-400">{failedCount}</p>
            <p className="text-[9px] text-slate-500 uppercase">Failed</p>
          </div>
        </div>
      )}

      {/* Result flash */}
      {phase === 'result' && (
        <div className={`relative z-10 px-5 pb-6 text-center animate-slide-up`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            allPassed
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {allPassed ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold">All Checks Passed — Transaction Safe</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm font-semibold">{failedCount} Check{failedCount !== 1 ? 's' : ''} Failed — Fraud Detected</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
