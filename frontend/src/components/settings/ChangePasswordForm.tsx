"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Password */}
          <div className="flex flex-col space-y-2 relative">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type={showCurrent ? "text" : "password"}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-3 bottom-0 my-auto flex items-center text-muted-foreground"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="flex flex-col space-y-2 relative">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type={showNew ? "text" : "password"}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-3 bottom-0 my-auto flex items-center text-muted-foreground"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-2 relative">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 bottom-0 my-auto flex items-center text-muted-foreground"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button className="mt-4 w-fit bg-orange-500 hover:bg-orange-600">
          Change Password
        </Button>
      </CardContent>
    </Card>
  )
}
