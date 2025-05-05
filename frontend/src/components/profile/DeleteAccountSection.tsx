"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DeleteAccountModal } from "./modal-delete-account"

export default function DeleteAccountSection() {
  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardContent className="px-6 space-y-4">
        <h2 className="text-xl font-semibold text-destructive">Delete Your Account</h2>
        <p className="text-sm text-muted-foreground">
          If you delete your account, you will no longer be able to get information about the matched jobs, following employers, job alert, shortlisted jobs and more.
          You will be abandoned from all the services.
        </p>

        <DeleteAccountModal />
      </CardContent>
    </Card>
  )
}