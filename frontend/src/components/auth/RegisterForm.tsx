"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { SocialButtons } from "./SocialButtons";
import Link from "next/link";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="px-1 md:px-6">
        <CardHeader className="text-left pt-6">
          <CardTitle className="text-3xl font-medium mb-2">Create Account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link href={"/login"} className="text-orange-500 font-medium hover:underline">
              Sign In
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <form>
            <div className="grid gap-6">
              {/* Register Fields */}
              <div className="grid gap-4">
                {/* First Name */}
                <Input id="first_name" type="text" placeholder="Enter First Name" required />
                {/* Middle Name */}
                <Input id="middle_name" type="text" placeholder="Enter Middle Name" />
                {/* Last Name */}
                <Input id="last_name" type="text" placeholder="Enter Last Name" required />
                {/* Suffix */}
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Enter Suffix (e.g., Jr., Sr., III)"
                />
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
                {/* Password Confirmation */}
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label="Toggle Password Visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Sign Up Button */}
                <Button type="submit" className="w-full font-semibold">
                  Sign Up
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
