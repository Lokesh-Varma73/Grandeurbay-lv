
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, AuthContextType } from '@/types/auth';
import { 
  sendVerificationCodeUtil, 
  verifyEmailUtil, 
  signInUtil, 
  signInWithGoogleUtil,
  signInWithFacebookUtil,
  signUpUtil 
} from '@/utils/authUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationPending, setVerificationPending] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('adidas_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('adidas_user');
      }
    }
    setLoading(false);
  }, []);

  const sendVerificationCode = async (email: string): Promise<boolean> => {
    const result = await sendVerificationCodeUtil(email);
    setVerificationPending(result);
    return result;
  };

  const resendVerificationCode = async (): Promise<boolean> => {
    if (!user) return false;
    return sendVerificationCode(user.email);
  };

  const verifyEmail = async (email: string, inputCode: string): Promise<boolean> => {
    const result = await verifyEmailUtil(email, inputCode, user, setUser);
    if (result) {
      setVerificationPending(false);
    }
    return result;
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      return await signInUtil(email, password, setUser, sendVerificationCode);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await signInWithGoogleUtil(setUser, sendVerificationCode);
      setVerificationPending(!user?.verified && result);
      return result;
    } finally {
      setLoading(false);
    }
  };
  
  const signInWithFacebook = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await signInWithFacebookUtil(setUser, sendVerificationCode);
      setVerificationPending(!user?.verified && result);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await signUpUtil(email, password, name, setUser, sendVerificationCode);
      setVerificationPending(result);
      return result;
    } finally {
      setLoading(false);
    }
  };
  
  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update the user object with new data
      const updatedUser = { ...user, ...profileData };
      
      // Save to localStorage
      localStorage.setItem('adidas_user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('adidas_user');
    setUser(null);
    setVerificationPending(false);
    toast.success('Signed out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        signUp,
        signOut,
        isAuthenticated: !!user,
        sendVerificationCode,
        verifyEmail,
        resendVerificationCode,
        verificationPending,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
