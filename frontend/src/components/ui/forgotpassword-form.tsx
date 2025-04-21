"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="px-6">
        <CardHeader className="text-left pt-6">
          <CardTitle className="text-xl mb-2">Forgot Password</CardTitle>
          <CardDescription>
            Go back to{" "}
            <a
              href="#"
              className="text-orange-500 font-medium hover:underline"
            >
              Sign In
            </a>
          </CardDescription>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-orange-500 font-medium hover:underline"
            >
              Create Account
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <form>
            <div className="grid gap-6">
              {/* Email & Password Fields */}
              <div className="grid gap-4">
                {/* Email */}
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
    
               {/* Reset Password Button */}
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Reset Password
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Divider */}
              <div className="relative text-center text-sm">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <span className="relative bg-white px-2 text-muted-foreground">or</span>
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                {/* Facebook Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="flex w-full sm:w-auto flex-1 items-center justify-center gap-2 border border-gray-300 bg-white text-xs font-normal rounded shadow-sm hover:bg-gray-100 transition whitespace-normal text-center px-4 py-2"
                >
                  <img
                    src="/logo/Facebook Logo.png"
                    alt="Facebook logo"
                    className="w-4 h-4"
                  />
                  <span>Sign in with Facebook</span>
                </Button>

                {/* Google Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="flex w-full sm:w-auto flex-1 items-center justify-center gap-2 border border-gray-300 bg-white text-xs font-normal rounded shadow-sm hover:bg-gray-100 transition whitespace-normal text-center px-4 py-2"
                >
                  <img
                    src="/logo/Google.png"
                    alt="Google logo"
                    className="w-4 h-4"
                  />
                  <span>Sign in with Google</span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
