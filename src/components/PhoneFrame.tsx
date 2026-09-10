import { Scenario, Transaction, AppScreen } from '../types';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import BiometricScreen from './screens/BiometricScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import FraudScreen from './screens/FraudScreen';
import PinScreen from './screens/PinScreen';
import SuccessScreen from './screens/SuccessScreen';

interface PhoneFrameProps {
  scenario: Scenario;
  currentScreen: AppScreen;
  balance: number;
  transactions: Transaction[];
  onStartPayment: () => void;
  onOpenNotification: () => void;
  onBiometricComplete: () => void;
  onPinConfirm: () => void;
  onReportAndBlock: () => void;
  onGoHome: () => void;
}

export default function PhoneFrame({
  scenario,
  currentScreen,
  balance,
  transactions,
  onStartPayment,
  onOpenNotification,
  onBiometricComplete,
  onPinConfirm,
  onReportAndBlock,
  onGoHome,
}: PhoneFrameProps) {
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            balance={balance}
            transactions={transactions}
            onStartPayment={onStartPayment}
            scenario={scenario}
          />
        );
      case 'notification':
        return (
          <NotificationScreen
            scenario={scenario}
            onOpen={onOpenNotification}
            onDismiss={onGoHome}
          />
        );
      case 'biometric':
        return (
          <BiometricScreen
            onComplete={onBiometricComplete}
            onCancel={onGoHome}
            recipientName={scenario.recipientName}
            amount={scenario.amount}
          />
        );
      case 'processing':
        return <ProcessingScreen />;
      case 'fraud':
        return (
          <FraudScreen
            scenario={scenario}
            onReportAndBlock={onReportAndBlock}
          />
        );

      case 'pin':
        return (
          <PinScreen
            scenario={scenario}
            onConfirm={onPinConfirm}
            onCancel={onGoHome}
          />
        );
      case 'success':
        return <SuccessScreen scenario={scenario} onDone={onGoHome} />;
      default:
        return (
          <HomeScreen
            balance={balance}
            transactions={transactions}
            onStartPayment={onStartPayment}
            scenario={scenario}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Phone Shell */}
      <div className="relative w-[375px] max-w-full">
        <div className="relative rounded-[3rem] bg-gray-900 p-3 shadow-2xl shadow-gray-900/30">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-2xl z-20">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-800 rounded-full" />
            <div className="absolute top-2.5 right-7 w-2 h-2 rounded-full bg-gray-800" />
          </div>

          {/* Screen */}
          <div className="relative rounded-[2.25rem] overflow-hidden bg-white" style={{ height: '693px' }}>
            {/* Status bar */}
            <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-1 bg-white/80 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-800">9:41</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                </svg>
                <svg className="w-3.5 h-3.5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                </svg>
              </div>
            </div>

            {/* Screen content */}
            <div className="relative h-full overflow-y-auto overflow-x-hidden">
              {renderScreen()}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-black/20 rounded-full z-30" />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -right-1 top-28 w-1 h-8 bg-gray-700 rounded-l" />
        <div className="absolute -left-1 top-24 w-1 h-10 bg-gray-700 rounded-r" />
        <div className="absolute -left-1 top-38 w-1 h-10 bg-gray-700 rounded-r" />
      </div>
    </div>
  );
}
