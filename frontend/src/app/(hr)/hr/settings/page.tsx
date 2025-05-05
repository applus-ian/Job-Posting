"use client"

import ContactInformationForm from "@/components/settings/ContactInformationForm"
import ChangePasswordForm from "@/components/settings/ChangePasswordForm"
import DeleteAccountSection from "@/components/settings/DeleteAccountSection"
import { SidebarLayout } from "@/components/sidebar-layout"

export default function SettingsPage() {
  return (
    <SidebarLayout>
      <div className="max-w-4xl p-6 space-y-0">
        <div className="border-b">
          <ContactInformationForm />
        </div>
        <div className="border-b">
          <ChangePasswordForm />
        </div>
        <div>
          <DeleteAccountSection />
        </div>
      </div>
    </SidebarLayout>
  )
}
