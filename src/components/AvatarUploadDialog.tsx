
import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

interface AvatarUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AvatarUploadDialog = ({ open, onOpenChange }: AvatarUploadDialogProps) => {
  const { user, updateProfile } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Function to get user's initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSave = async () => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      // In a real app, we would upload the file to a server/storage
      // For this demo, we'll just use the file object URL
      const avatarUrl = previewUrl;
      
      // Update user profile with new avatar URL
      await updateProfile({ avatarUrl });
      
      toast.success('Profile photo updated successfully');
      onOpenChange(false);
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      toast.error('Failed to update profile photo');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Photo</DialogTitle>
          <DialogDescription>
            Upload a photo to personalize your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          <Avatar className="h-24 w-24">
            {previewUrl ? (
              <AvatarImage src={previewUrl} alt="Preview" />
            ) : (
              <>
                <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
                <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
              </>
            )}
          </Avatar>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              <span>Select Image</span>
            </Button>
            
            {previewUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveImage}
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <X size={16} />
                <span>Remove</span>
              </Button>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          
          {!previewUrl && (
            <div className="text-center text-sm text-gray-500">
              <p>Supported formats: JPEG, PNG, GIF</p>
              <p>Maximum file size: 5MB</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="submit"
            onClick={handleSave}
            disabled={!file || isUploading}
          >
            {isUploading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUploadDialog;
