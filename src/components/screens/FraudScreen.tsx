import { useState, useEffect } from 'react';
import { Scenario } from '../../types';

interface FraudScreenProps {
  scenario: Scenario;
  onReportAndBlock: () => void;
}

export default function FraudScreen({ scenario, onReportAndBlock }: FraudScreenProps) {
  const [reported, setReported] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t1);
  }, []);

  const handleReport = () => {
    setReported(true);
    onReportAndBlock();
  };

  return (
    <div className="animate-fade-in h-full flex flex-col bg-white">
      {/* Red header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-5 shadow-lg shadow-red-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center danger-pulse">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">FRAUD DETECTED</h2>
            <p className="text-xs text-red-200">Payment has been automatically blocked</p>
          </div>
        </div>
      </div>

      {showContent && (
        <div className="flex-1 overflow-y-auto">
          {/* Blocked status */}
          <div className="px-5 py-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-slide-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-xl">🚫</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-red-800">₹{scenario.amount.toLocaleString('en-IN')} — Auto Blocked</p>
                  <p className="text-[10px] text-red-600">No money was deducted from your account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fraud reasons */}
          <div className="px-5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-2">Why this was flagged</p>
            <div className="space-y-2">
              {scenario.fraudReasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-2.5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety tip */}
          <div className="px-5 mt-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
              <div className="flex items-start gap-2.5">
                <span className="text-lg flex-shrink-0">💡</span>
                <div>
                  <p className="text-[10px] text-indigo-600 uppercase tracking-wider font-medium mb-0.5">Safety Tip</p>
                  <p className="text-[11px] text-indigo-800 leading-relaxed">{scenario.safetyTip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recipient info */}
          <div className="px-5 mt-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-sm">🎣</div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{scenario.recipientName}</p>
                    <p className="text-[10px] text-slate-400">{scenario.recipientUpiId}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold uppercase px-2 py-1 rounded-full bg-red-100 text-red-600 border border-red-200">
                  Suspicious
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action */}
      <div className="px-5 pb-6 pt-3 border-t border-slate-100">
        <button
          onClick={handleReport}
          disabled={reported}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${
            reported
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              : 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200'
          }`}
        >
          {reported ? '✓ Reported to HDFC Bank + NPCI' : '📋 Report & Block Merchant'}
        </button>
      </div>
    </div>
  );
}
