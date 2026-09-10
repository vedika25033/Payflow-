import { useState, useCallback } from 'react';
import { AppScreen, Transaction, BlockedAttack } from './types';
import { scenarios, initialTransactions } from './data/scenarios';
import JudgeControlBar from './components/JudgeControlBar';
import PhoneFrame from './components/PhoneFrame';
import Toast from './components/Toast';

function App() {
  const [activeScenario, setActiveScenario] = useState<string>('fake-cashback');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [balance, setBalance] = useState(25000);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [blockedAttacks, setBlockedAttacks] = useState<BlockedAttack[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'danger' | 'info' } | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const scenario = scenarios[activeScenario];

  const triggerToast = useCallback((message: string, type: 'success' | 'danger' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleScenarioSwitch = useCallback((id: string) => {
    setActiveScenario(id);
    setCurrentScreen('home');
    setAnimationKey(prev => prev + 1);
  }, []);

  const handleStartPayment = useCallback(() => {
    if (scenario.riskLevel === 'high') {
      setCurrentScreen('notification');
    } else {
      setCurrentScreen('biometric');
    }
  }, [scenario]);

  const handleOpenNotification = useCallback(() => {
    setCurrentScreen('biometric');
  }, []);

  const handleBiometricComplete = useCallback(() => {
    // Interceptor runs silently in background, then routes user
    setCurrentScreen('processing');
    const isSafe = scenario.riskLevel === 'low';
    setTimeout(() => {
      setCurrentScreen(isSafe ? 'pin' : 'fraud');
    }, 2200);
  }, [scenario]);

  const handlePinConfirm = useCallback(() => {
    setBalance(prev => prev - scenario.amount);
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'sent',
      amount: scenario.amount,
      recipient: scenario.recipientName,
      date: 'Just now',
      status: 'completed',
    };
    setTransactions(prev => [tx, ...prev]);
    setCurrentScreen('success');
    triggerToast(`₹${scenario.amount.toLocaleString('en-IN')} sent to ${scenario.recipientName} ✓`, 'success');

    setTimeout(() => {
      setCurrentScreen('home');
      setAnimationKey(prev => prev + 1);
    }, 3000);
  }, [scenario, triggerToast]);

  const handleReportAndBlock = useCallback(() => {
    const attack: BlockedAttack = {
      id: `block-${Date.now()}`,
      scenarioName: scenario.name,
      timestamp: new Date().toLocaleTimeString(),
      amount: scenario.amount,
      reportedTo: ['HDFC Bank', 'NPCI'],
    };
    setBlockedAttacks(prev => [attack, ...prev]);
    triggerToast('Reported to HDFC Bank + NPCI ✓', 'success');

    setTimeout(() => {
      setCurrentScreen('home');
      setAnimationKey(prev => prev + 1);
    }, 2500);
  }, [scenario, triggerToast]);

  const handleGoHome = useCallback(() => {
    setCurrentScreen('home');
    setAnimationKey(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <JudgeControlBar
        activeScenario={activeScenario}
        onScenarioSwitch={handleScenarioSwitch}
        blockedCount={blockedAttacks.length}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center">
        <PhoneFrame
          key={animationKey}
          scenario={scenario}
          currentScreen={currentScreen}
          balance={balance}
          transactions={transactions}
          onStartPayment={handleStartPayment}
          onOpenNotification={handleOpenNotification}
          onBiometricComplete={handleBiometricComplete}
          onPinConfirm={handlePinConfirm}
          onReportAndBlock={handleReportAndBlock}
          onGoHome={handleGoHome}
        />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
