"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Upload, Save } from "lucide-react";
import { Separator } from "../ui/separator";

export function PersonalInfoCard() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-xl">Personal Information</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>
      <div className="w-full mt-4">
        <Card>
          <CardContent className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white rounded-full p-2 cursor-pointer">
                      <Edit className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-semibold">Profile Picture</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Upload a clear photo of yourself. A professional headshot is recommended.
                </p>
                {isEditing && (
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                )}
              </div>
            </div>

            <p className="text-sm">Personal Details</p>
            {/* Personal Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input disabled={!isEditing} placeholder="First Name" />
              <Input disabled={!isEditing} placeholder="Last Name" />
              <Input disabled={!isEditing} placeholder="Middle Name" />
              <Input disabled={!isEditing} placeholder="Suffix" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input disabled={!isEditing} placeholder="Email Address" type="email" />
              <Input disabled={!isEditing} placeholder="Phone Number" />
            </div>

            <Separator />

            <p className="text-sm">Address</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input disabled={!isEditing} placeholder="Country" />
              <Input disabled={!isEditing} placeholder="Address" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input disabled={!isEditing} placeholder="ZIP Code" />
              <Input disabled={!isEditing} placeholder="City" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input disabled={!isEditing} placeholder="Province/State" />
              <Input disabled={!isEditing} placeholder="Street" />
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <Button type="button" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
