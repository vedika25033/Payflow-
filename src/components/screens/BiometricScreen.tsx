import { useState, useEffect } from 'react';

interface BiometricScreenProps {
  onComplete: () => void;
  onCancel: () => void;
  recipientName: string;
  amount: number;
}

export default function BiometricScreen({ onComplete, onCancel, recipientName, amount }: BiometricScreenProps) {
  const [scanning, setScanning] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Auto-start scan after mount
    const t1 = setTimeout(() => setScanning(true), 600);
    const t2 = setTimeout(() => {
      setAuthenticated(true);
      setScanning(false);
    }, 2800);
    const t3 = setTimeout(onComplete, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="animate-fade-in h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-white">
        <div className="flex items-center justify-between">
          <button onClick={onCancel} className="text-sm text-slate-500 font-medium">
            ← Back
          </button>
          <h2 className="text-sm font-semibold text-slate-800">Authenticate</h2>
          <div className="w-12" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Payment summary */}
        <div className="mb-8 text-center animate-slide-up">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Authenticating payment to</p>
          <p className="text-sm font-semibold text-slate-800">{recipientName}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">₹{amount.toLocaleString('en-IN')}</p>
        </div>

        {/* Fingerprint with ripples */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Ripple rings */}
          {scanning && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-indigo-300 ripple-ring" />
              <div className="absolute inset-0 rounded-full border-2 border-indigo-300 ripple-ring-delay" />
              <div className="absolute inset-0 rounded-full border-2 border-indigo-300 ripple-ring-delay2" />
            </>
          )}

          {/* Fingerprint icon */}
          <div className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
            authenticated
              ? 'bg-emerald-100 shadow-lg shadow-emerald-200'
              : scanning
                ? 'bg-indigo-100 shadow-lg shadow-indigo-200'
                : 'bg-slate-100'
          }`}>
            {authenticated ? (
              <svg className="w-12 h-12 text-emerald-600 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className={`w-12 h-12 ${scanning ? 'text-indigo-600 fp-glow' : 'text-slate-400'} transition-colors duration-300`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-4.91-1.31-7.78-6.04-7.78-9.64 0-2.65 2.76-4.81 6.15-4.81 3.4 0 6.16 2.16 6.16 4.81 0 1.45-1.32 2.63-2.94 2.63s-2.94-1.18-2.94-2.63c0-.28.22-.5.5-.5s.5.22.5.5c0 .9.86 1.63 1.94 1.63s1.94-.73 1.94-1.63c0-2.11-2.28-3.81-5.16-3.81s-5.16 1.7-5.16 3.81c0 3.17 2.56 7.47 6.91 8.63.27.07.42.35.35.62-.05.23-.27.39-.49.39z" />
              </svg>
            )}
          </div>
        </div>

        {/* Status text */}
        <p className={`mt-6 text-sm font-medium transition-colors duration-300 ${
          authenticated ? 'text-emerald-600' : scanning ? 'text-indigo-600' : 'text-slate-500'
        }`}>
          {authenticated ? '✓ Verified' : scanning ? 'Place your finger on sensor...' : 'Touch to authenticate'}
        </p>
        <p className="text-[10px] text-slate-400 mt-1">
          {authenticated ? 'Identity confirmed' : 'Biometric verification required'}
        </p>
      </div>

      {/* Cancel */}
      <div className="px-5 pb-6">
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
