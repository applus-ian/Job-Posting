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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-left">
          <CardTitle className="text-xl">Sign In</CardTitle>
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
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>

                {/* Password with toggle visibility */}
                <div className="grid gap-3 relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" />
                    <Label htmlFor="remember">Remember Me</Label>
                  </div>
                  <a
                    href="#"
                    className="text-orange-500 text-sm hover:underline"
                  >
                    Forgot password
                  </a>
                </div>

                {/* Sign In Button with arrow icon */}
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  or
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Facebook Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="#1877F2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                  </svg>
                  <span>Sign in with Facebook</span>
                </Button>

                {/* Google Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 533.5 544.3"
                  >
                    <path
                      d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95.2h146.9c-6.3 33.6-25 62-53.3 81v67.1h85.9c50.2-46.3 79-114.5 79-193z"
                      fill="#4285F4"
                    />
                    <path
                      d="M272 544.3c71.9 0 132.3-23.7 176.4-64.3l-85.9-67.1c-23.9 16.1-54.5 25.6-90.5 25.6-69.6 0-128.6-47-149.7-110.1H33v69.2C77.1 486.2 168.5 544.3 272 544.3z"
                      fill="#34A853"
                    />
                    <path
                      d="M122.3 328.4c-10.1-29.6-10.1-61.4 0-91l-69.3-69.2C-6.3 229.3-6.3 315 53 385.3l69.3-56.9z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M272 107.7c38.7 0 73.5 13.3 100.9 39.4l75.8-75.8C404.3 26 343.9 0 272 0 168.5 0 77.1 58.1 33 149.2l69.3 69.2c21.1-63.1 80.1-110.7 149.7-110.7z"
                      fill="#EA4335"
                    />
                  </svg>
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
