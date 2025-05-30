"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { ThemeSwitch } from "@/components/setting/ThemeSwitch";
import { ChangePasswordForm } from "@/components/setting/ChangePasswordForm";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  return (
    <SidebarLayout breadcrumbs={[{ label: "Settings", isCurrentPage: true }]}>
      <div className="flex">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>
      <ThemeSwitch />

      {!session?.user.is_oauth && (
        <>
          <Separator className="my-5" />
          <ChangePasswordForm />
        </>
      )}
    </SidebarLayout>
  );
}
