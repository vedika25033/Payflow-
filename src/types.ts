export type RiskLevel = 'low' | 'medium' | 'high';

export type AppScreen =
  | 'home'
  | 'notification'
  | 'biometric'
  | 'processing'
  | 'fraud'
  | 'pin'
  | 'success';

export interface Scenario {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  description: string;

  // Payment details
  recipientName: string;
  recipientUpiId: string;
  amount: number;

  // Notification bait
  notificationTitle: string;
  notificationBody: string;
  notificationIcon: string;

  // 5 interceptor checks
  checks: InterceptCheck[];

  // Fraud details (unsafe path)
  fraudReasons: string[];

  // Safety tip
  safetyTip: string;
}

export interface InterceptCheck {
  label: string;
  icon: string;
  pass: boolean;
  detail: string;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'blocked';
  amount: number;
  recipient: string;
  date: string;
  status: 'completed' | 'pending' | 'blocked';
}

export interface BlockedAttack {
  id: string;
  scenarioName: string;
  timestamp: string;
  amount: number;
  reportedTo: string[];
}
