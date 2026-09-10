import { useEffect } from 'react';
import { Scenario } from '../../types';

interface SuccessScreenProps {
  scenario: Scenario;
  onDone: () => void;
}

export default function SuccessScreen({ scenario, onDone }: SuccessScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="animate-fade-in h-full flex flex-col items-center justify-center px-6 bg-white">
      {/* Success animation */}
      <div className="relative mb-6 animate-scale-in">
        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-emerald-300/50 animate-ping" />
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-1">Payment Successful!</h2>
      <p className="text-sm text-slate-500 mb-6">Transaction completed securely</p>

      {/* Details card */}
      <div className="bg-slate-50 rounded-2xl p-5 w-full border border-slate-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Amount Sent</span>
            <span className="text-lg font-bold text-slate-900">₹{scenario.amount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">To</span>
            <span className="text-sm font-medium text-slate-800">{scenario.recipientName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">UPI ID</span>
            <span className="text-xs text-slate-600">{scenario.recipientUpiId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Status</span>
            <span className="text-xs font-semibold text-emerald-600">✓ Completed</span>
          </div>
        </div>
      </div>

      <button
        onClick={onDone}
        className="mt-6 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-md shadow-indigo-200"
      >
        Done
      </button>
    </div>
  );
}
