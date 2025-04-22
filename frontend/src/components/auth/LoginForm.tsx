"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { SocialButtons } from "./SocialButtons";
import Link from "next/link";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="px-1 md:px-6">
        <CardHeader className="text-left pt-6">
          <CardTitle className="text-3xl font-medium mb-2">Sign In</CardTitle>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="text-orange-500 font-medium hover:underline">
              Create Account
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <form>
            <div className="grid gap-6">
              {/* Email & Password Fields */}
              <div className="grid gap-4">
                {/* Email */}
                <Input id="email" type="email" placeholder="Email address" required />

                {/* Password */}
                <div className="relative">
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

                {/* Remember Me & Forgot Password */}
                <div className="flex flex-wrap items-center justify-between text-sm gap-y-2 px-1">
                  {/* Remember Me */}
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-gray-800">Remember Me</span>
                  </label>

                  {/* Forgot password */}
                  <a href="#" className="text-orange-500 font-medium hover:underline">
                    Forgot password
                  </a>
                </div>

                {/* Sign In Button */}
                <Button type="submit" className="w-full font-semibold">
                  Sign In
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
              <SocialButtons />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
