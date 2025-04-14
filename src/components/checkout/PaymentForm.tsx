import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, ShieldCheck, Calendar, Check, QrCode, 
  Smartphone, CreditCardIcon, Wallet
} from 'lucide-react';
import { PaypalIcon } from '@/components/icons/PaypalIcon';
import { PaymentMethod } from '@/types/auth';
import { savePaymentMethodUtil } from '@/utils/authUtils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const paymentFormSchema = z.object({
  paymentType: z.enum(['card', 'upi', 'paypal', 'wallet']),
  cardDetails: z.object({
    cardNumber: z.string().optional(),
    expiryMonth: z.string().optional(),
    expiryYear: z.string().optional(),
    cvv: z.string().optional(),
    cardHolderName: z.string().optional(),
  }).optional(),
  upiId: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  walletId: z.string().optional(),
  saveCard: z.boolean().default(false).optional(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  onPaymentSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { user, updateProfile } = useAuth();
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentType: 'card',
      cardDetails: {
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardHolderName: '',
      },
      upiId: '',
      paypalEmail: '',
      walletId: '',
      saveCard: false,
    },
  });

  const onSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Prepare payment method object
      let paymentMethod: Omit<PaymentMethod, 'id'> | null = null;

      switch (values.paymentType) {
        case 'card':
          if (values.cardDetails) {
            paymentMethod = {
              type: 'card',
              cardBrand: 'Visa', // Mock card brand
              last4: values.cardDetails.cardNumber?.slice(-4),
              expiryMonth: values.cardDetails.expiryMonth,
              expiryYear: values.cardDetails.expiryYear,
              holderName: values.cardDetails.cardHolderName,
              default: values.saveCard || false,
            };
          }
          break;
        case 'upi':
          paymentMethod = {
            type: 'upi',
            upiId: values.upiId,
            default: false,
          };
          break;
        case 'paypal':
          paymentMethod = {
            type: 'paypal',
            paypalEmail: values.paypalEmail,
            default: false,
          };
          break;
        case 'wallet':
          paymentMethod = {
            type: 'wallet',
            walletId: values.walletId,
            default: false,
          };
          break;
      }

      // Save payment method if user is authenticated and saveCard is true
      if (user && values.saveCard && paymentMethod) {
        const success = await savePaymentMethodUtil(user, paymentMethod, updateProfile);
        if (success) {
          toast.success('Payment method saved successfully!');
        } else {
          toast.error('Failed to save payment method.');
        }
      }

      toast.success('Payment successful!');
      onPaymentSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="card" className="w-full">
          <TabsList>
            <TabsTrigger value="card">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Card
            </TabsTrigger>
            <TabsTrigger value="upi">
              <Smartphone className="mr-2 h-4 w-4" />
              UPI
            </TabsTrigger>
            <TabsTrigger value="paypal">
              <PaypalIcon className="mr-2 h-4 w-4" />
              PayPal
            </TabsTrigger>
            <TabsTrigger value="wallet">
              <Wallet className="mr-2 h-4 w-4" />
              Wallet
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4">
            <FormField
              control={form.control}
              name="cardDetails.cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter card number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="cardDetails.expiryMonth"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Expiry Month</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <SelectItem key={month} value={String(month).padStart(2, '0')}>
                              {String(month).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardDetails.expiryYear"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Expiry Year</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                            <SelectItem key={year} value={String(year)}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cardDetails.cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter CVV" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardDetails.cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter card holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {user && (
              <FormField
                control={form.control}
                name="saveCard"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Save this card for future payments</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <input type="hidden" {...form.register('paymentType')} value="card" />
          </TabsContent>

          <TabsContent value="upi" className="space-y-4">
            <FormField
              control={form.control}
              name="upiId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UPI ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter UPI ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input type="hidden" {...form.register('paymentType')} value="upi" />
          </TabsContent>

          <TabsContent value="paypal" className="space-y-4">
            <FormField
              control={form.control}
              name="paypalEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PayPal Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter PayPal Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input type="hidden" {...form.register('paymentType')} value="paypal" />
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <FormField
              control={form.control}
              name="walletId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Wallet ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input type="hidden" {...form.register('paymentType')} value="wallet" />
          </TabsContent>
        </Tabs>

        <Button disabled={loading} type="submit">
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
