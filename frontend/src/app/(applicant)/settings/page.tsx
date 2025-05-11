import { SidebarLayout } from "@/components/sidebar-layout";
import { ThemeSwitch } from "@/components/setting/ThemeSwitch";
import { ChangePasswordForm } from "@/components/setting/ChangePasswordForm";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <SidebarLayout>
      <div className="flex">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>
      <ThemeSwitch />
      <Separator className="my-5" />
      <ChangePasswordForm />
    </SidebarLayout>
  );
}
