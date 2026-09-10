import { RiskLevel } from '../types';

interface RiskScoreRingProps {
  score: number;
  riskLevel: RiskLevel;
}

const ringColors: Record<RiskLevel, { stroke: string; bg: string }> = {
  high: { stroke: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  medium: { stroke: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  low: { stroke: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
};

export default function RiskScoreRing({ score, riskLevel }: RiskScoreRingProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;
  const colors = ringColors[riskLevel];

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
        />
        {/* Progress ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${colors.stroke}50)`,
          }}
        />
      </svg>
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: colors.bg }}
        >
          {riskLevel === 'high' ? (
            <svg className="w-8 h-8 text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : riskLevel === 'medium' ? (
            <svg className="w-8 h-8 text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
