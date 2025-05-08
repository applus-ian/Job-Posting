"use client";
import { useEffect, useState } from "react";
import { handleSocialLogin } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function FacebookLogin() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initiate Facebook login process when component mounts
    const initiateLogin = async () => {
      try {
        setIsLoading(true);
        // Use the existing social login handler for Facebook
        handleSocialLogin("facebook");
      } catch (error) {
        console.error("Facebook login error:", error);
        setIsLoading(false);
      }
    };

    initiateLogin();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Connecting to Facebook...</p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-red-500">Failed to connect to Facebook.</p>
          <Button 
            variant="default" 
            onClick={() => handleSocialLogin("facebook")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

