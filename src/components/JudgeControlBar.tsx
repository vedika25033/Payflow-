import { scenarios } from '../data/scenarios';
import { RiskLevel } from '../types';

interface JudgeControlBarProps {
  activeScenario: string;
  onScenarioSwitch: (id: string) => void;
  blockedCount: number;
}

const riskDot: Record<RiskLevel, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500',
};

const riskBadge: Record<RiskLevel, string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const riskBorder: Record<RiskLevel, string> = {
  high: 'border-red-400 ring-2 ring-red-100',
  medium: 'border-amber-400 ring-2 ring-amber-100',
  low: 'border-emerald-400 ring-2 ring-emerald-100',
};

export default function JudgeControlBar({ activeScenario, onScenarioSwitch, blockedCount }: JudgeControlBarProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Title row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 tracking-wide">PayFlow Interceptor</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Hackathon Demo Controller</p>
            </div>
          </div>

          {blockedCount > 0 && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 shadow-sm shadow-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">
                {blockedCount} Attack{blockedCount !== 1 ? 's' : ''} Blocked
              </span>
            </div>
          )}
        </div>

        {/* Scenario buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Object.values(scenarios).map((s) => {
            const isActive = activeScenario === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onScenarioSwitch(s.id)}
                className={`
                  flex-shrink-0 rounded-xl px-4 py-2.5 text-left transition-all duration-200 border
                  ${isActive
                    ? `${riskBorder[s.riskLevel]} bg-white shadow-md`
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white'
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${riskDot[s.riskLevel]} ${isActive ? 'animate-pulse' : ''}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {s.name}
                      </span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${riskBadge[s.riskLevel]}`}>
                        {s.riskLevel}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block max-w-[260px]">{s.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
