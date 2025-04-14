
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Eye, EyeOff, Mail, Lock, ArrowRight, 
  CheckCircle2, AlignJustify, LucideProps
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

// Schemas for forms
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false)
});

const verificationSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

// Icons
const GoogleIcon = (props: LucideProps) => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
    </g>
  </svg>
);

const FacebookIcon = (props: LucideProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="#1877F2"/>
  </svg>
);

const SignIn = () => {
  const { signIn, signInWithGoogle, signInWithFacebook, verifyEmail, resendVerificationCode, verificationPending } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [formState, setFormState] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');

  // Get redirect path from location state or default to homepage
  const from = (location.state as any)?.from?.pathname || '/';

  // Check if there's a remember me cookie
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      signInForm.setValue('email', rememberedEmail);
      signInForm.setValue('rememberMe', true);
    }
  }, []);

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
  });

  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmitSignIn = async (values: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    setFormState('loading');
    try {
      setCurrentEmail(values.email);
      
      // Handle remember me
      if (values.rememberMe) {
        localStorage.setItem('remembered_email', values.email);
      } else {
        localStorage.removeItem('remembered_email');
      }
      
      const success = await signIn(values.email, values.password);
      if (success) {
        setFormState('success');
        if (verificationPending) {
          setShowVerificationDialog(true);
        } else {
          toast.success('Signed in successfully!');
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 500);
        }
      } else {
        setFormState('error');
      }
    } catch (error) {
      setFormState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitVerification = async (values: z.infer<typeof verificationSchema>) => {
    try {
      const success = await verifyEmail(currentEmail, values.code);
      if (success) {
        setShowVerificationDialog(false);
        toast.success('Email verified successfully!');
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const success = await signInWithGoogle();
      if (success && verificationPending) {
        setShowVerificationDialog(true);
      } else if (success) {
        toast.success('Signed in with Google successfully!');
        navigate(from, { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFacebookSignIn = async () => {
    setIsSubmitting(true);
    try {
      const success = await signInWithFacebook();
      if (success && verificationPending) {
        setShowVerificationDialog(true);
      } else if (success) {
        toast.success('Signed in with Facebook successfully!');
        navigate(from, { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;
    
    const success = await resendVerificationCode();
    if (success) {
      toast.success('Verification code resent');
      setResendDisabled(true);
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 overflow-hidden backdrop-blur-sm bg-white/95">
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
            <CardHeader className="space-y-1 pt-6 pb-4">
              <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                Sign in to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 px-6">
              {/* Social Sign In Buttons */}
              <div className="flex gap-3 mb-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2 h-11 font-medium border-gray-200 hover:bg-gray-50" 
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                >
                  <GoogleIcon />
                  <span>Google</span>
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2 h-11 font-medium border-gray-200 hover:bg-gray-50" 
                  onClick={handleFacebookSignIn}
                  disabled={isSubmitting}
                >
                  <FacebookIcon />
                  <span>Facebook</span>
                </Button>
              </div>

              <div className="relative mb-6">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-xs text-gray-500">OR CONTINUE WITH EMAIL</span>
                </div>
              </div>

              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSubmitSignIn)} className="space-y-5">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email address" 
                            {...field} 
                            className="h-11 transition-all duration-200 focus:border-indigo-500"
                            icon={<Mail className="h-4 w-4" />}
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel required>Password</FormLabel>
                          <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...field}
                            className="h-11 transition-all duration-200 focus:border-indigo-500"
                            icon={<Lock className="h-4 w-4" />}
                            rightIcon={
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            }
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signInForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="rememberMe"
                            className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                            Remember me for 30 days
                          </Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className={`w-full h-11 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 ${
                      isSubmitting ? 'opacity-90 pointer-events-none' : ''
                    }`} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <AlignJustify className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center px-6 pb-6 pt-0">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition-colors">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />

      {/* Enhanced Email Verification Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Verify Your Email
            </DialogTitle>
            <DialogDescription className="pt-2">
              <span className="text-gray-600">Enter the 6-digit verification code sent to</span>
              <div className="font-medium text-black mt-1 break-all">{currentEmail}</div>
            </DialogDescription>
          </DialogHeader>
          
          <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(onSubmitVerification)} className="space-y-6">
              <FormField
                control={verificationForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="mx-auto max-w-[360px]">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="border-gray-300" />
                          <InputOTPSlot index={1} className="border-gray-300" />
                          <InputOTPSlot index={2} className="border-gray-300" />
                          <InputOTPSlot index={3} className="border-gray-300" />
                          <InputOTPSlot index={4} className="border-gray-300" />
                          <InputOTPSlot index={5} className="border-gray-300" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center text-sm text-gray-600">
                {resendDisabled ? (
                  <p>Resend code in {countdown} seconds</p>
                ) : (
                  <p>
                    Didn't receive the code?{" "}
                    <button 
                      type="button" 
                      onClick={handleResendCode} 
                      className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                    >
                      Resend
                    </button>
                  </p>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verify Account
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignIn;
