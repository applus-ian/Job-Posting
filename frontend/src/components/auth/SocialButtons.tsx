"use client";
import { Button } from "../ui/button";

export function SocialButtons() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {/* Facebook Button */}
      <Button
        type="button"
        variant="outline"
        className="flex w-full sm:w-auto flex-1 items-center justify-center gap-2 border border-gray-300 bg-white text-xs font-normal rounded shadow-sm hover:bg-gray-100 transition whitespace-normal text-center px-4 py-2"
      >
        <img src="/logo/Facebook Logo.png" alt="Facebook logo" className="w-4 h-4" />
        <span>Sign in with Facebook</span>
      </Button>

      {/* Google Button */}
      <Button
        type="button"
        variant="outline"
        className="flex w-full sm:w-auto flex-1 items-center justify-center gap-2 border border-gray-300 bg-white text-xs font-normal rounded shadow-sm hover:bg-gray-100 transition whitespace-normal text-center px-4 py-2"
      >
        <img src="/logo/Google.png" alt="Google logo" className="w-4 h-4" />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
}
