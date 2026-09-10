import { useState, useEffect } from 'react';
import { Scenario } from '../../types';

interface PinScreenProps {
  scenario: Scenario;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PinScreen({ scenario, onConfirm, onCancel }: PinScreenProps) {
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (pin.length === 6) {
      const timer = setTimeout(() => {
        onConfirm();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [pin, onConfirm]);

  const handleDigit = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="animate-fade-in h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <button onClick={onCancel} className="text-sm text-slate-500 font-medium">
            ← Back
          </button>
          <h2 className="text-sm font-semibold text-slate-800">UPI PIN</h2>
          <div className="w-12" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Amount display */}
        <div className="text-center mb-8">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Sending to</p>
          <p className="text-sm font-semibold text-slate-800">{scenario.recipientName}</p>
          <div className="flex items-baseline justify-center gap-1 mt-2">
            <span className="text-3xl font-bold text-slate-900">₹{scenario.amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* PIN dots */}
        <div className="flex gap-3 mb-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                i < pin.length
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              {i < pin.length && (
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-scale-in" />
              )}
            </div>
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((digit) => {
            if (digit === '') return <div key="empty" />;
            if (digit === '⌫') {
              return (
                <button
                  key="backspace"
                  onClick={handleBackspace}
                  className="w-full aspect-square rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              );
            }
            return (
              <button
                key={digit}
                onClick={() => handleDigit(digit)}
                className="w-full aspect-square rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 text-xl font-semibold transition-all duration-150 active:scale-90 active:bg-indigo-100"
              >
                {digit}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
