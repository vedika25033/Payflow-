import { Scenario, Transaction } from '../types';

export const scenarios: Record<string, Scenario> = {
  'fake-cashback': {
    id: 'fake-cashback',
    name: 'Lucky Draw Scam',
    riskLevel: 'high',
    description: 'Fake "Lucky Draw Winner" notification tricks user into paying ₹5,000 to claim a fake prize.',

    recipientName: 'LuckyDraw Rewards',
    recipientUpiId: 'luckydraw.prize@ybl',
    amount: 5000,

    notificationTitle: '🎉 Congratulations! You Won ₹5,000!',
    notificationBody: 'You have been selected as today\'s Lucky Draw winner! Tap to claim your cashback reward instantly.',
    notificationIcon: '🎁',

    checks: [
      { label: 'UPI Handle Verification', icon: '🏷️', pass: false, detail: 'Unregistered handle — not linked to any verified business' },
      { label: 'NPCI Whitelist Check', icon: '🏛️', pass: false, detail: 'Merchant not found in NPCI verified database' },
      { label: 'Source URL Analysis', icon: '🔗', pass: false, detail: 'Payment link originates from suspicious short-URL redirect' },
      { label: 'Fraud Database Match', icon: '🛡️', pass: false, detail: 'Match found — 2,847 similar fraud reports in last 30 days' },
      { label: 'Beneficiary Validation', icon: '👤', pass: false, detail: 'Account flagged for receiving funds from 143+ unique victims' },
    ],

    fraudReasons: [
      'Unverified merchant — not NPCI registered',
      'UPI handle linked to 2,847 fraud reports',
      'Account flagged for money mule activity',
      'Payment originated from suspicious redirect URL',
    ],

    safetyTip: 'You NEVER need to pay money to receive a prize. Legitimate cashback is credited automatically — no PIN required.',
  },

  'safe-contact': {
    id: 'safe-contact',
    name: 'Safe Friend Transfer',
    riskLevel: 'low',
    description: 'Sending ₹500 to a trusted friend you regularly transact with.',

    recipientName: 'Priya Sharma',
    recipientUpiId: 'priya.s@okicici',
    amount: 500,

    notificationTitle: '',
    notificationBody: '',
    notificationIcon: '',

    checks: [
      { label: 'UPI Handle Verification', icon: '🏷️', pass: true, detail: 'Verified handle linked to ICICI Bank' },
      { label: 'NPCI Whitelist Check', icon: '🏛️', pass: true, detail: 'Registered and active on NPCI network' },
      { label: 'Source URL Analysis', icon: '🔗', pass: true, detail: 'Direct UPI payment — no suspicious redirects' },
      { label: 'Fraud Database Match', icon: '🛡️', pass: true, detail: 'No fraud reports found — clean history' },
      { label: 'Beneficiary Validation', icon: '👤', pass: true, detail: 'Trusted contact — 23 prior transactions, all verified' },
    ],

    fraudReasons: [],

    safetyTip: 'This transaction looks safe. Always double-check amounts before confirming.',
  },
};

export const initialTransactions: Transaction[] = [
  { id: 't1', type: 'received', amount: 2500, recipient: 'Vikram M.', date: 'Today, 2:30 PM', status: 'completed' },
  { id: 't2', type: 'sent', amount: 850, recipient: 'Uber', date: 'Yesterday', status: 'completed' },
  { id: 't3', type: 'sent', amount: 3200, recipient: 'Electricity Board', date: 'Aug 28', status: 'completed' },
  { id: 't4', type: 'received', amount: 15000, recipient: 'Salary — TCS', date: 'Aug 25', status: 'completed' },
  { id: 't5', type: 'sent', amount: 1200, recipient: 'Swiggy', date: 'Aug 24', status: 'completed' },
];
