import { Scenario } from '../../types';

interface NotificationScreenProps {
  scenario: Scenario;
  onOpen: () => void;
  onDismiss: () => void;
}

export default function NotificationScreen({ scenario, onOpen, onDismiss }: NotificationScreenProps) {
  return (
    <div className="animate-fade-in h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-white">
        <div className="flex items-center justify-between">
          <button onClick={onDismiss} className="text-sm text-slate-500 font-medium">
            ← Back
          </button>
          <h2 className="text-sm font-semibold text-slate-800">Notification</h2>
          <div className="w-12" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="animate-scale-in">
          {/* Prize icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
              <span className="text-5xl">{scenario.notificationIcon}</span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-amber-200/50 animate-ping" />
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-slate-800 text-center mb-2">
            {scenario.notificationTitle}
          </h1>
          <p className="text-sm text-slate-500 text-center leading-relaxed max-w-[280px]">
            {scenario.notificationBody}
          </p>

          {/* Amount */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
            <p className="text-[10px] text-amber-600 uppercase tracking-wider font-medium mb-1">Reward Amount</p>
            <p className="text-3xl font-bold text-amber-700">₹{scenario.amount.toLocaleString('en-IN')}</p>
          </div>

          {/* Timer */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] text-red-500 font-medium">Expires in 14:32</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="px-5 pb-6 pt-2 space-y-2">
        <button
          onClick={onOpen}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-md shadow-indigo-200 active:scale-[0.98]"
        >
          Open →
        </button>
        <button
          onClick={onDismiss}
          className="w-full py-3 rounded-xl text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
