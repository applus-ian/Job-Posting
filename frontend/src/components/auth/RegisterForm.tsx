"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { SocialButtons } from "./SocialButtons";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRegisterForm } from "@/forms/auth/useRegisterForm";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit, error } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {/* Register Fields */}
                <div className="grid gap-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="first_name"
                            type="text"
                            placeholder="Enter your First Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Middle Name */}
                  <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="middle_name"
                            type="text"
                            placeholder="Enter your Middle Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="last_name"
                            type="text"
                            placeholder="Enter your Last Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Suffix */}
                  <FormField
                    control={form.control}
                    name="suffix"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="suffix"
                            type="text"
                            placeholder="Enter your Suffix (e.g., Jr., Sr., III)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className={`pr-10 ${form.formState.errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                              aria-invalid={!!form.formState.errors.password}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              aria-label="Toggle Password Visibility"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Password Confirmation */}
                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              id="password"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Enter password confirmation"
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && <div className="text-sm text-red-500">{error}</div>}
                  {/* Sign Up Button */}
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full font-semibold"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Signing Up...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative text-center text-sm">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <span className="bg-white dark:bg-zinc-900 relative px-2 text-muted-foreground">or</span>
                </div>

                {/* Social Buttons */}
                <SocialButtons />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
