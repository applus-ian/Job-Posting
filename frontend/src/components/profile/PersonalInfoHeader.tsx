"use client";
import { Edit, User, Check, X, Loader2, TableRowsSplit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "react-hot-toast";
import CustomAlert from "@/components/ui/custom-alert"; 

export function PersonalInfoHeader({ biography }: { biography: string | null }) {
  const { data: session } = useSession();
  const { uploadProfileMutation } = useProfile();
  const [avatar, setAvatar] = useState<string | null>(session?.user.profile || null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewAvatar(reader.result as string);
        setIsPreviewMode(true);
      };
      reader.readAsDataURL(file);
    }else{
      toast.error('No file submited');
    }
  };

  const handleConfirm = async () => {
    // get file input
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      return alert("No file selected");
      
    }
    await uploadProfileMutation.mutateAsync(file);

    setAvatar(previewAvatar);
    setIsPreviewMode(false);
    setPreviewAvatar(null);
    
  };

  const handleCancel = () => {
    setIsPreviewMode(false);
    setPreviewAvatar(null);
    setAvatar(null);
    setAvatar(session?.user.profile || null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center sm:flex-row gap-6 pb-6">
        <div className="flex flex-col justify-center items-center">
          <div className="relative group">
            <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-background shadow-md">
              <AvatarImage src={isPreviewMode ? previewAvatar : avatar} alt="Profile" />
              <AvatarFallback className="bg-muted">
                <User className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white rounded-full p-2 cursor-pointer" onClick={triggerFileInput}>
                <Edit className="h-5 w-5 text-gray-700" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {isPreviewMode && (
            <div className="flex space-x-2 mt-3">
              <Button
                size="sm"
                variant="default"
                onClick={handleConfirm}
                className="flex items-center"
                disabled={uploadProfileMutation.isPending}
              >
                {uploadProfileMutation.isPending ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="flex items-center"
                disabled={uploadProfileMutation.isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2 text-center sm:text-left">
          {/* Name */}
          <h3 className="text-md lg:text-xl font-semibold">{session?.user.name}</h3>
          {/* Bio */}
          {biography?.trim() && (
            <p className="text-xs lg:text-sm text-muted-foreground">{biography}</p>
          )}
        </div>
      </div>
    </>
  );
}
