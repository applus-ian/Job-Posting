"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="mx-auto w-full max-w-[420px] rounded-md bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:p-6 md:w-[500px]">
      <div className="space-y-3 text-center sm:space-y-5">
        <h1 className="mt-5 text-2xl font-medium text-gray-900 sm:text-[28px] mb-3">Reset Password</h1>
        <p className="text-sm text-gray-500 sm:text-[15px]">
          Secure your account by resetting your password below.
        </p>
      </div>

      <form className="mt-4 space-y-4 sm:mt-6">
        <div className="space-y-3">
          <div>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="h-10 w-full rounded border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-0 sm:h-11 sm:px-4 sm:text-[15px]"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 sm:right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ) : (
                  <EyeIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="h-10 w-full rounded border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-0 sm:h-11 sm:px-4 sm:text-[15px]"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 sm:right-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ) : (
                  <EyeIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="mt-3 mb-7 h-10 w-full rounded bg-[#FF5C00] text-sm font-medium text-white hover:bg-[#FF5C00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50 sm:h-11 sm:text-base"
        >
          Reset Password
          <span className="ml-2">→</span>
        </Button>
      </form>
    </div>
  )
}
