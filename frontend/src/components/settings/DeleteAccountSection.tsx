"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function DeleteAccountSection() {
  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-destructive">Delete Your Account</h2>
        <p className="text-sm text-muted-foreground">
          If you delete your account, you will no longer be able to get information about the matched jobs, following employers, job alert, shortlisted jobs and more.
          You will be abandoned from all the services.
        </p>

        <Button variant="ghost" className="text-destructive hover:bg-transparent p-0 hover:text-destructive flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          Close Account
        </Button>
      </CardContent>
    </Card>
  )
}
