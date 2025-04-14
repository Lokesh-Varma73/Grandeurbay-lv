
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, ShoppingBag, Heart, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const UserMenu = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  // Function to get user's initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };
  
  if (!isAuthenticated) {
    return (
      <Link to="/sign-in">
        <Button variant="ghost" size="sm" className="gap-2">
          <User size={18} />
          <span className="hidden md:inline">Sign In</span>
        </Button>
      </Link>
    );
  }
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-1 md:flex md:items-center md:gap-2 md:p-2">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline font-medium text-sm">
            {user?.name || 'User'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/account" className="flex items-center gap-2 cursor-pointer">
              <User size={16} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/orders" className="flex items-center gap-2 cursor-pointer">
              <ShoppingBag size={16} />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/wishlist" className="flex items-center gap-2 cursor-pointer">
              <Heart size={16} />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/payment-methods" className="flex items-center gap-2 cursor-pointer">
              <CreditCard size={16} />
              <span>Payment Methods</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account/settings" className="flex items-center gap-2 cursor-pointer">
              <Settings size={16} />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={signOut}
          className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
