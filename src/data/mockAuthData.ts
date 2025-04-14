
import { User, VerificationData } from '@/types/auth';

// Array to store verification codes
export const VERIFICATION_CODES: VerificationData[] = [];

// Mock user data
export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    email: 'user@example.com',
    name: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    verified: true,
    provider: 'email',
    savedPaymentMethods: [
      {
        id: 'pm_1',
        type: 'card',
        cardBrand: 'VISA',
        last4: '4242',
        expiryMonth: '12',
        expiryYear: '2025',
        holderName: 'John Doe',
        default: true
      }
    ],
    savedAddresses: [
      {
        id: 'addr_1',
        name: 'Home',
        street: '123 Main St',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        country: 'India',
        default: true,
        phone: '+91 9876543210'
      }
    ]
  }
];

// Function to generate random 6-digit verification code
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
