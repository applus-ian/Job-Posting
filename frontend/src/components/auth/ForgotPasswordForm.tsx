"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="px-1 md:px-6">
        <CardHeader className="text-left pt-6">
          <CardTitle className="text-3xl font-medium mb-2">Forgot Password</CardTitle>
          <CardDescription>
            Enter the email address associated with your account, and we’ll send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <form>
            <div className="grid gap-6">
              {/* Email & Password Fields */}
              <div className="grid gap-4">
                {/* Email */}
                <Input id="email" type="email" placeholder="Enter Email" required />

                {/* Send Reset Link Button */}
                <Button type="submit" className="w-full font-semibold">
                  Send Reset Link
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <div className="flex justify-end">
                  <Link href={"/login"} className="text-orange-500 font-medium hover:underline">
                    ← Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
