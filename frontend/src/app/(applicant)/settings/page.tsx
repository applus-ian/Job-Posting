import { SidebarLayout } from "@/components/sidebar-layout";
import { Card } from "@/components/ui/card";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import DeleteAccountSection from "@/components/profile/DeleteAccountSection";
import { Separator } from "@/components/ui/separator"

export default function ApplicantProfilePage() {
  return (
    <SidebarLayout>
      <Card>
        <ChangePasswordForm />
        <div className="px-6 -my-6">
          <Separator/> 
        </div>
        <DeleteAccountSection/>
      </Card>
    </SidebarLayout>
  );
}
