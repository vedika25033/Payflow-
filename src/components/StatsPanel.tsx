import { BlockedAttack, Transaction } from '../types';

interface StatsPanelProps {
  blockedAttacks: BlockedAttack[];
  balance: number;
  transactions: Transaction[];
}

export default function StatsPanel({ blockedAttacks, balance, transactions }: StatsPanelProps) {
  const totalProtected = blockedAttacks.reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="w-full lg:w-[340px] space-y-4 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Account Balance</p>
          <p className="text-xl font-bold text-slate-800 mt-1">₹{balance.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-emerald-600 font-medium">Active</span>
          </div>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 shadow-sm">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Funds Protected</p>
          <p className="text-xl font-bold text-emerald-700 mt-1">₹{totalProtected.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-[10px] text-emerald-600 font-medium">🛡️ {blockedAttacks.length} blocked</span>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
        <h3 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">How It Works</h3>
        <div className="space-y-3">
          {[
            { step: '1', icon: '📱', title: 'Payment Initiated', desc: 'User scans QR or receives notification' },
            { step: '2', icon: '🔐', title: 'Biometric Auth', desc: 'Fingerprint verification before analysis' },
            { step: '3', icon: '🔍', title: '5-Point Security Scan', desc: 'Real-time checks on UPI, NPCI, fraud DB' },
            { step: '4', icon: '🛡️', title: 'Informed Decision', desc: 'Clear verdict + actionable next steps' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-indigo-600">{item.step}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blocked Attacks Log */}
      {blockedAttacks.length > 0 && (
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Security Log</h3>
            <span className="text-[10px] text-emerald-600 font-medium">{blockedAttacks.length} entries</span>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {blockedAttacks.map((attack) => (
              <div
                key={attack.id}
                className="rounded-lg bg-red-50 border border-red-100 p-3 animate-slide-up"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-800">🚫 {attack.scenarioName}</span>
                  <span className="text-[10px] text-slate-400">{attack.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {attack.reportedTo.map((entity) => (
                      <span key={entity} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {entity}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-700">₹{attack.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
        <h3 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">Built With</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Tailwind CSS', 'PayFlow Shield', 'UPI Protocol'].map((tech) => (
            <span key={tech} className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
