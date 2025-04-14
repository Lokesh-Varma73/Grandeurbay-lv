import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarUploadDialog from '@/components/AvatarUploadDialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { User, Mail, CreditCard, MapPin, Package, Settings } from 'lucide-react';
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional(),
  avatarUrl: z.string().optional(),
});

const Account = () => {
  const { user, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatarUrl: user?.avatarUrl || '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsSubmitting(true);
    try {
      await updateProfile(values);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 min-h-[calc(100vh-200px)]">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 gap-2 flex-wrap">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package size={16} /> Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin size={16} /> Addresses
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard size={16} /> Payment Methods
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} /> Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details and personal information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8 mb-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setIsAvatarDialogOpen(true)}>
                      <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
                      <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                    </Avatar>
                    <Button size="sm" variant="outline" onClick={() => setIsAvatarDialogOpen(true)}>
                      Change Avatar
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input placeholder="John Doe" {...field} className="pl-10" />
                                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
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
                                    disabled
                                  />
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h3 className="font-medium mb-2">Account Info</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Account created: {new Date().toLocaleDateString()}</p>
                    <p>Account type: {user?.provider.charAt(0).toUpperCase() + user?.provider.slice(1)}</p>
                    <p>Email verification: {user?.verified ? 'Verified' : 'Not verified'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>View and track all your orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Button>Start Shopping</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
                  <p className="text-gray-500 mb-4">You haven't saved any addresses yet.</p>
                  <Button>Add New Address</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods and preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No payment methods saved</h3>
                  <p className="text-gray-500 mb-4">You haven't saved any payment methods yet.</p>
                  <Button>Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Email Notifications</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage the emails you want to receive.</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Coming soon...</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Privacy Settings</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage your data and privacy preferences.</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Coming soon...</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-600 mb-4">Permanent actions that cannot be undone.</p>
                    <Button variant="destructive" size="sm">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      
      <AvatarUploadDialog 
        open={isAvatarDialogOpen}
        onOpenChange={setIsAvatarDialogOpen}
      />
    </>
  );
};

export default Account;
