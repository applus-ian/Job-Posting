"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForgotPasswordForm } from "@/forms/auth/useForgotPasswordForm";

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const { form, onSubmit, error } = useForgotPasswordForm();

  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      <Card className="px-1 md:px-6">
        <CardHeader className="text-left pt-6">
          <CardTitle className="text-3xl font-medium mb-2">Forgot Password</CardTitle>
          <CardDescription>
            Enter the email address associated with your account, and we’ll send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {/* Email & Password Fields */}
                <div className="grid gap-4">
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
                  {error && <div className="text-sm text-red-500">{error}</div>}

                  {/* Send Reset Link Button */}
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full font-semibold"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <div className="flex justify-end">
                    <Link href={"/login"} className="text-orange-500 text-sm hover:underline">
                      ← Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
