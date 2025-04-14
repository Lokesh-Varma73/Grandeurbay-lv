
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Schema for form validation
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just show a success message
      console.log(`Reset password email sent to: ${values.email}`);
      setEmailSent(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Failed to send password reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {!emailSent ? (
                "Enter your email and we'll send you a link to reset your password"
              ) : (
                "Check your inbox for the reset link"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="your.email@example.com" 
                              {...field} 
                              className="pl-10"
                            />
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center p-4">
                <div className="mb-6 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="mb-4">A password reset link has been sent to your email address. Please check your inbox and follow the instructions.</p>
                <Button onClick={() => setEmailSent(false)} variant="outline" className="mr-2">
                  Try Again
                </Button>
                <Button asChild>
                  <Link to="/sign-in">Back to Sign In</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/sign-in" className="text-sm text-gray-600 hover:text-black flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;
