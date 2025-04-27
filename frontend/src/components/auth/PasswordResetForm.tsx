"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { usePasswordResetForm } from "@/forms/auth/usePasswordResetForm";

export function PasswordResetForm({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit, error } = usePasswordResetForm();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      <Card className="px-1 md:px-6">
        <CardHeader className="text-left pt-6">
          <CardTitle className="text-3xl font-medium mb-2">Reset Password</CardTitle>
          <CardDescription>
            Create a new password for your account. Use at least 8 characters, including a mix of
            letters, numbers, and symbols.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {/*New Password  */}
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
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter New Password"
                            className={`pr-10 ${form.formState.errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            aria-invalid={!!form.formState.errors.password}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            aria-label="Toggle Password Visibility"
                          >
                            {showNewPassword ? (
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
                {/* New Password Confirmation */}
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
                            placeholder="Enter Password Confirmation"
                            className={`pr-10 ${form.formState.errors.password_confirmation ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            aria-invalid={!!form.formState.errors.password_confirmation}
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
                {/* Set New Password Button */}
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full font-semibold"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Loading...
                    </>
                  ) : (
                    <>Set New Password</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
