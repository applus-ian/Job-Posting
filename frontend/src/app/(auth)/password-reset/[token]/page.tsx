"use client";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

export default function PasswordResetPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <PasswordResetForm />
      </div>
    </div>
  );
}
