import { useState } from 'react';
import { Transaction, Scenario } from '../../types';

interface HomeScreenProps {
  balance: number;
  transactions: Transaction[];
  onStartPayment: () => void;
  scenario: Scenario;
}

export default function HomeScreen({ balance, transactions, onStartPayment, scenario }: HomeScreenProps) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="animate-fade-in h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white px-5 pt-2 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-200">
              A
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Good afternoon</p>
              <p className="text-sm font-semibold text-slate-800">Vedika Parihar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>

        {/* Balance card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 shadow-lg shadow-indigo-200">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-indigo-200 uppercase tracking-wider font-medium">Available Balance</p>
            <button
              onClick={() => setShowBalance(prev => !prev)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              {showBalance ? (
                <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-baseline gap-1">
            {showBalance ? (
              <>
                <span className="text-3xl font-bold text-white">₹</span>
                <span className="text-3xl font-bold text-white">{balance.toLocaleString('en-IN')}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-white tracking-widest">••••••</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-indigo-200 font-medium">HDFC Bank ••4521</span>
          </div>
        </div>
      </div>

      {/* PayFlow Shield indicator */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 shadow-sm shadow-emerald-100">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shield-pulse">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-emerald-800">PayFlow Shield Active</p>
            <p className="text-[10px] text-emerald-600">Real-time fraud protection enabled</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-1">
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: '📱', label: 'Scan QR', action: onStartPayment },
            { icon: '💸', label: 'Send Money', action: onStartPayment },
            { icon: '💰', label: 'Balance', action: () => {} },
            { icon: '📋', label: 'History', action: () => {} },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] text-slate-600 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lucky Draw notification for scam scenario */}
      {scenario.riskLevel === 'high' && scenario.notificationTitle && (
        <div className="px-5 mt-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl flex-shrink-0">
                {scenario.notificationIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">PayFlow</span>
                  <span className="text-[10px] text-slate-300">•</span>
                  <span className="text-[10px] text-slate-400">now</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-tight">{scenario.notificationTitle}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{scenario.notificationBody}</p>
              </div>
            </div>
            <button
              onClick={onStartPayment}
              className="mt-3 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm shadow-indigo-200 active:scale-[0.98]"
            >
              Open →
            </button>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="px-5 mt-5 pb-20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-800">Recent Transactions</h3>
          <button className="text-[11px] text-indigo-600 font-medium">View All</button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {transactions.map((tx, i) => (
            <div
              key={tx.id}
              className={`flex items-center gap-3 px-4 py-3 ${
                i < transactions.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm
                ${tx.type === 'received' ? 'bg-emerald-50 text-emerald-600' : ''}
                ${tx.type === 'sent' ? 'bg-slate-100 text-slate-500' : ''}
                ${tx.type === 'blocked' ? 'bg-red-50 text-red-500' : ''}
              `}>
                {tx.type === 'received' ? '↓' : tx.type === 'blocked' ? '🛡️' : '↑'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{tx.recipient}</p>
                <p className="text-[10px] text-slate-400">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${
                  tx.type === 'received' ? 'text-emerald-600' :
                  tx.type === 'blocked' ? 'text-red-500' : 'text-slate-800'
                }`}>
                  {tx.type === 'received' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-slate-400 capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-2 flex justify-around">
        {[
          { icon: '🏠', label: 'Home', active: true },
          { icon: '💳', label: 'Pay', active: false },
          { icon: '📊', label: 'History', active: false },
          { icon: '👤', label: 'Profile', active: false },
        ].map((nav) => (
          <button
            key={nav.label}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 ${nav.active ? 'text-indigo-600' : 'text-slate-400'}`}
          >
            <span className="text-lg">{nav.icon}</span>
            <span className="text-[9px] font-medium">{nav.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
