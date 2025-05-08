"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import useChangePasswordForm from "@/forms/auth/useChangepasswordForm"
import { useToast } from "@/components/ui/use-toast"

export default function ChangePasswordForm() {
  // Toggle password visibility states
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  // Get the toast functionality
  const { addToast } = useToast()
  
  // Use the custom hook for form handling
  const {
    formData,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
    getFieldError
  } = useChangePasswordForm()
  
  // Enhanced submit handler to show toast notifications
  const onSubmit = async (e: React.FormEvent) => {
    const result = await handleSubmit(e)
    
    if (result.success) {
      // Show success toast
      addToast({
        title: "Success",
        description: result.message,
        variant: "default"
      })
    } else {
      // Show error toast
      addToast({
        title: "Error",
        description: result.message,
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardContent className="px-6 space-y-6">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Current Password */}
            <div className="flex flex-col space-y-2 relative text-sm">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                className={`pr-10 ${getFieldError('current_password') ? 'border-red-500' : ''}`}
                value={formData.current_password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-3 bottom-0 my-auto flex items-center text-muted-foreground"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {getFieldError('current_password') && (
                <p className="text-xs text-red-500 mt-1">{getFieldError('current_password')}</p>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col space-y-2 relative text-sm">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                className={`pr-10 ${getFieldError('password') ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 bottom-0 my-auto flex items-center text-muted-foreground"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {getFieldError('password') && (
                <p className="text-xs text-red-500 mt-1">{getFieldError('password')}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col space-y-2 relative text-sm">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                className={`pr-10 ${getFieldError('password_confirmation') ? 'border-red-500' : ''}`}
                value={formData.password_confirmation}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 bottom-0 my-auto flex items-center text-muted-foreground"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {getFieldError('password_confirmation') && (
                <p className="text-xs text-red-500 mt-1">{getFieldError('password_confirmation')}</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-fit bg-orange-500 hover:bg-orange-600 text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}