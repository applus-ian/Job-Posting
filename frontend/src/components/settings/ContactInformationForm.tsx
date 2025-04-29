"use client"

import { useState } from "react"
import PhoneInput from "./PhoneInput"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

export default function ContactInformationForm() {
  const [form, setForm] = useState({
    firstName: "Sayde Marie",
    lastName: "Elegino",
    middleInitial: "P",
    suffix: "None",
    phone: "639912346789",
    email: "smp@elegino.gmail.com",
  })

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardContent className="px-6 space-y-6">
        <h2 className="text-xl font-semibold">Edit Information</h2>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2 flex flex-col space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
          <div className="col-span-1 flex flex-col space-y-2">
            <Label htmlFor="middleInitial">M.I</Label>
            <Input
              id="middleInitial"
              value={form.middleInitial}
              onChange={(e) => handleChange("middleInitial", e.target.value)}
            />
          </div>
          <div className="col-span-1 flex flex-col space-y-2">
            <Label htmlFor="suffix">Suffix</Label>
            <Input
              id="suffix"
              value={form.suffix}
              onChange={(e) => handleChange("suffix", e.target.value)}
            />
          </div>
        </div>

        {/* Phone Input */}
        <PhoneInput
          value={form.phone}
          onChange={(val) => handleChange("phone", val)}
        />

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              className="pl-10"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>

        <Button className="w-fit bg-orange-500 hover:bg-orange-600">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}
