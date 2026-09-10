import { Scenario } from '../../types';

interface VerifiedScreenProps {
  scenario: Scenario;
  onProceedToPin: () => void;
  onGoHome: () => void;
}

export default function VerifiedScreen({ scenario, onProceedToPin, onGoHome }: VerifiedScreenProps) {
  return (
    <div className="animate-fade-in h-full flex flex-col bg-white">
      {/* Green header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-5 shadow-lg shadow-emerald-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">VERIFIED SAFE</h2>
            <p className="text-xs text-emerald-200">All 5 security checks passed</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success icon */}
        <div className="relative mb-6 animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-300/50 animate-ping" />
        </div>

        <p className="text-sm font-semibold text-slate-800 mb-1">Transaction Verified</p>
        <p className="text-[11px] text-slate-500 text-center max-w-[260px] leading-relaxed mb-6">
          {scenario.recipientName} is a trusted recipient. All security checks passed.
        </p>

        {/* Payment summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full max-w-[280px]">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Sending to</span>
              <span className="text-sm font-semibold text-slate-800">{scenario.recipientName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">UPI ID</span>
              <span className="text-xs text-slate-600">{scenario.recipientUpiId}</span>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Amount</span>
              <span className="text-lg font-bold text-slate-900">₹{scenario.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-6 pt-2 space-y-2">
        <button
          onClick={onProceedToPin}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-md shadow-indigo-200 active:scale-[0.98]"
        >
          Proceed to UPI PIN →
        </button>
        <button
          onClick={onGoHome}
          className="w-full py-3 rounded-xl text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
