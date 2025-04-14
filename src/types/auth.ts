
export type User = {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  verified: boolean;
  provider: 'email' | 'google' | 'facebook';
  savedPaymentMethods?: PaymentMethod[];
  savedAddresses?: Address[];
};

export type Address = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  default: boolean;
  phone?: string;
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'upi' | 'paypal' | 'wallet';
  last4?: string;
  cardBrand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  holderName?: string;
  upiId?: string;
  paypalEmail?: string;
  walletId?: string;
  default: boolean;
};

export type VerificationData = {
  email: string;
  code: string;
  expiry: number;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInWithFacebook: () => Promise<boolean>;
  signUp: (email: string, password: string, name?: string) => Promise<boolean>;
  signOut: () => void;
  isAuthenticated: boolean;
  sendVerificationCode: (email: string) => Promise<boolean>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  resendVerificationCode: () => Promise<boolean>;
  verificationPending: boolean;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
}
