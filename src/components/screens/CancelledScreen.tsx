import { Scenario } from '../../types';

interface CancelledScreenProps {
  scenario: Scenario;
}

export default function CancelledScreen({ scenario }: CancelledScreenProps) {
  return (
    <div className="animate-fade-in h-full flex flex-col items-center justify-center px-6 bg-gray-950">
      {/* Shield animation */}
      <div className="relative mb-6 animate-scale-in">
        <div className="w-24 h-24 rounded-full bg-success-500/10 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-success-500/20 flex items-center justify-center">
            <span className="text-3xl">🛡️</span>
          </div>
        </div>
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-success-400/10 blur-xl" />
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Payment Cancelled</h2>
      <p className="text-sm text-success-400 font-medium mb-2">Funds Protected ✓</p>
      <p className="text-xs text-payflow-400 text-center max-w-[260px] leading-relaxed">
        No money was deducted from your account. The suspicious transaction has been blocked.
      </p>

      {/* Details */}
      <div className="bg-success-900/20 rounded-2xl p-4 w-full border border-success-500/15 mt-6">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-payflow-400">Status</span>
            <span className="text-xs font-semibold text-success-400">🚫 Blocked</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-payflow-400">Amount Protected</span>
            <span className="text-sm font-bold text-white">₹{scenario.amount.toLocaleString('en-IN')}</span>
          </div>

        </div>
      </div>

      <div className="mt-4 px-4 py-2.5 rounded-xl bg-payflow-900/40 border border-payflow-700/20">
        <p className="text-[10px] text-payflow-300 text-center leading-relaxed">
          📝 Attack logged in your security dashboard
        </p>
      </div>
    </div>
  );
}
