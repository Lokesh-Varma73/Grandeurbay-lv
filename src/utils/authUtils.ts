import { toast } from 'sonner';
import { User, VerificationData, PaymentMethod } from '@/types/auth';
import { MOCK_USERS, VERIFICATION_CODES, generateVerificationCode } from '@/data/mockAuthData';

export const sendVerificationCodeUtil = async (email: string): Promise<boolean> => {
  try {
    // Check if email exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    if (!userExists) {
      toast.error('No account found with this email');
      return false;
    }

    // Generate a new verification code
    const code = generateVerificationCode();
    
    // Store the verification code with a 10-minute expiry
    const expiry = Date.now() + 10 * 60 * 1000;
    
    // Remove any existing codes for this email
    const existingIndex = VERIFICATION_CODES.findIndex(v => v.email === email);
    if (existingIndex !== -1) {
      VERIFICATION_CODES.splice(existingIndex, 1);
    }
    
    // Add the new code
    VERIFICATION_CODES.push({ email, code, expiry });
    
    // For demo purposes, show the code in console
    console.log(`Verification code for ${email}: ${code}`);
    
    // Simulate sending an email
    console.log(`📧 Email sent to ${email} with verification code: ${code}`);
    
    toast.success('Verification code sent to your email');
    return true;
  } catch (error) {
    console.error('Error sending verification code:', error);
    toast.error('Failed to send verification code');
    return false;
  }
};

export const verifyEmailUtil = async (
  email: string, 
  inputCode: string,
  user: User | null,
  setUser: (user: User | null) => void
): Promise<boolean> => {
  try {
    // Find the verification data for this email
    const verificationData = VERIFICATION_CODES.find(v => v.email === email);
    
    if (!verificationData) {
      toast.error('No verification code found. Please request a new one.');
      return false;
    }
    
    // Check if the code has expired
    if (Date.now() > verificationData.expiry) {
      toast.error('Verification code has expired. Please request a new one.');
      return false;
    }
    
    // Check if the code matches
    if (verificationData.code !== inputCode) {
      toast.error('Invalid verification code');
      return false;
    }
    
    // Update the user's verified status
    const userIndex = MOCK_USERS.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex].verified = true;
      
      // Update the user in state and local storage if they're currently logged in
      if (user && user.email === email) {
        const updatedUser = { ...user, verified: true };
        setUser(updatedUser);
        localStorage.setItem('adidas_user', JSON.stringify(updatedUser));
      }
    }
    
    // Remove the verification code
    const codeIndex = VERIFICATION_CODES.findIndex(v => v.email === email);
    if (codeIndex !== -1) {
      VERIFICATION_CODES.splice(codeIndex, 1);
    }
    
    toast.success('Email verified successfully');
    return true;
  } catch (error) {
    console.error('Error verifying email:', error);
    toast.error('Failed to verify email');
    return false;
  }
};

export const signInUtil = async (
  email: string, 
  password: string,
  setUser: (user: User | null) => void,
  sendVerificationCode: (email: string) => Promise<boolean>
): Promise<boolean> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple mock authentication
    if (password !== 'password') {
      toast.error('Invalid email or password');
      return false;
    }
    
    // Find user or use demo account
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser) {
      // Store user in local storage for persistence
      localStorage.setItem('adidas_user', JSON.stringify(foundUser));
      setUser(foundUser);
      
      // If user is not verified, prompt for verification
      if (!foundUser.verified) {
        toast.success('Please verify your email to access all features');
        await sendVerificationCode(email);
      } else {
        toast.success('Signed in successfully');
      }
      
      return true;
    } else {
      // Create new mock user if not found
      const newUser = { 
        id: Math.random().toString(36).substring(2, 9), 
        email,
        name: email.split('@')[0],
        verified: false,
        provider: 'email' as const,
        savedPaymentMethods: [],
        savedAddresses: []
      };
      MOCK_USERS.push(newUser);
      localStorage.setItem('adidas_user', JSON.stringify(newUser));
      setUser(newUser);
      
      // Send verification code to new user
      await sendVerificationCode(email);
      
      toast.success('Signed in successfully. Please verify your email.');
      return true;
    }
  } catch (error) {
    console.error('Sign in error:', error);
    toast.error('An error occurred during sign in');
    return false;
  }
};

export const signInWithGoogleUtil = async (
  setUser: (user: User | null) => void,
  sendVerificationCode: (email: string) => Promise<boolean>
): Promise<boolean> => {
  try {
    // Simulate Google auth flow
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock Google user
    const googleUser = {
      id: Math.random().toString(36).substring(2, 9),
      email: `user${Math.floor(Math.random() * 1000)}@gmail.com`,
      name: 'Google User',
      avatarUrl: 'https://lh3.googleusercontent.com/a/default-user',
      verified: false,
      provider: 'google' as const,
      savedPaymentMethods: [],
      savedAddresses: []
    };
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === googleUser.email);
    
    if (existingUser) {
      // Update existing user with Google info
      Object.assign(existingUser, {
        ...googleUser,
        // Preserve the original ID
        id: existingUser.id,
        // Keep verification status if already verified
        verified: existingUser.verified,
        // Keep saved payment methods and addresses
        savedPaymentMethods: existingUser.savedPaymentMethods || [],
        savedAddresses: existingUser.savedAddresses || []
      });
      
      localStorage.setItem('adidas_user', JSON.stringify(existingUser));
      setUser(existingUser);
      
      // If not verified, send verification code
      if (!existingUser.verified) {
        await sendVerificationCode(existingUser.email);
        toast.info('Please verify your email to access all features');
        return true;
      }
    } else {
      // Add new Google user (unverified)
      MOCK_USERS.push(googleUser);
      localStorage.setItem('adidas_user', JSON.stringify(googleUser));
      setUser(googleUser);
      
      // Send verification code to new user
      await sendVerificationCode(googleUser.email);
      toast.info('Please verify your email to access all features');
      return true;
    }
    
    toast.success('Signed in with Google successfully');
    return true;
  } catch (error) {
    console.error('Google sign in error:', error);
    toast.error('An error occurred during Google sign in');
    return false;
  }
};

export const signInWithFacebookUtil = async (
  setUser: (user: User | null) => void,
  sendVerificationCode: (email: string) => Promise<boolean>
): Promise<boolean> => {
  try {
    // Simulate Facebook auth flow
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock Facebook user
    const facebookUser = {
      id: Math.random().toString(36).substring(2, 9),
      email: `fb_user${Math.floor(Math.random() * 1000)}@example.com`,
      name: 'Facebook User',
      avatarUrl: 'https://graph.facebook.com/default-user/picture',
      verified: false,
      provider: 'facebook' as const,
      savedPaymentMethods: [],
      savedAddresses: []
    };
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === facebookUser.email);
    
    if (existingUser) {
      // Update existing user with Facebook info
      Object.assign(existingUser, {
        ...facebookUser,
        // Preserve the original ID
        id: existingUser.id,
        // Keep verification status if already verified
        verified: existingUser.verified,
        // Keep saved payment methods and addresses
        savedPaymentMethods: existingUser.savedPaymentMethods || [],
        savedAddresses: existingUser.savedAddresses || []
      });
      
      localStorage.setItem('adidas_user', JSON.stringify(existingUser));
      setUser(existingUser);
      
      // If not verified, send verification code
      if (!existingUser.verified) {
        await sendVerificationCode(existingUser.email);
        toast.info('Please verify your email to access all features');
        return true;
      }
    } else {
      // Add new Facebook user (unverified)
      MOCK_USERS.push(facebookUser);
      localStorage.setItem('adidas_user', JSON.stringify(facebookUser));
      setUser(facebookUser);
      
      // Send verification code to new user
      await sendVerificationCode(facebookUser.email);
      toast.info('Please verify your email to access all features');
      return true;
    }
    
    toast.success('Signed in with Facebook successfully');
    return true;
  } catch (error) {
    console.error('Facebook sign in error:', error);
    toast.error('An error occurred during Facebook sign in');
    return false;
  }
};

export const signUpUtil = async (
  email: string, 
  password: string, 
  name: string | undefined,
  setUser: (user: User | null) => void,
  sendVerificationCode: (email: string) => Promise<boolean>
): Promise<boolean> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      toast.error('User with this email already exists');
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name: name || email.split('@')[0],
      verified: false,
      provider: 'email' as const,
      savedPaymentMethods: [],
      savedAddresses: []
    };
    
    MOCK_USERS.push(newUser);
    localStorage.setItem('adidas_user', JSON.stringify(newUser));
    setUser(newUser);
    
    // Send verification email
    await sendVerificationCode(email);
    
    toast.success('Account created successfully. Please verify your email.');
    return true;
  } catch (error) {
    console.error('Sign up error:', error);
    toast.error('An error occurred during registration');
    return false;
  }
};

// Helper function to save a payment method
export const savePaymentMethodUtil = async (
  user: User,
  paymentMethod: Omit<PaymentMethod, 'id'>,
  setUser: (user: User | null) => void
): Promise<boolean> => {
  try {
    // Find user in mock database
    const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
    if (userIndex === -1) return false;
    
    // Generate an ID for the payment method
    const id = Math.random().toString(36).substring(2, 9);
    
    // Create the new payment method with ID
    const newPaymentMethod: PaymentMethod = {
      ...paymentMethod,
      id
    };
    
    // If this is set as default, unset other defaults
    if (newPaymentMethod.default) {
      const savedMethods = MOCK_USERS[userIndex].savedPaymentMethods || [];
      savedMethods.forEach(method => {
        method.default = false;
      });
    }
    
    // If this is the first payment method, set it as default
    if (!MOCK_USERS[userIndex].savedPaymentMethods || MOCK_USERS[userIndex].savedPaymentMethods.length === 0) {
      newPaymentMethod.default = true;
    }
    
    // Add the payment method to the user
    if (!MOCK_USERS[userIndex].savedPaymentMethods) {
      MOCK_USERS[userIndex].savedPaymentMethods = [];
    }
    
    MOCK_USERS[userIndex].savedPaymentMethods.push(newPaymentMethod);
    
    // Update the user in local storage and state
    const updatedUser = { ...MOCK_USERS[userIndex] };
    localStorage.setItem('adidas_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    return true;
  } catch (error) {
    console.error('Error saving payment method:', error);
    return false;
  }
};
