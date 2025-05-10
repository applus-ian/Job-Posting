import { SidebarLayout } from "@/components/sidebar-layout";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <SidebarLayout>
      <div className="flex">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Separator />

      <ChangePasswordForm />
    </SidebarLayout>
  );
}
