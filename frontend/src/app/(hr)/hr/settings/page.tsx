"use client"

import ContactInformationForm from "@/components/settings/ContactInformationForm"
import ChangePasswordForm from "@/components/settings/ChangePasswordForm"
import DeleteAccountSection from "@/components/settings/DeleteAccountSection"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-0">
      <div className="border-b pb-1">
        <ContactInformationForm />
      </div>
      <div className="border-b pb-1 pt-1">
        <ChangePasswordForm />
      </div>
      <div className="pt-1">
        <DeleteAccountSection />
      </div>
    </div>
  )
}
