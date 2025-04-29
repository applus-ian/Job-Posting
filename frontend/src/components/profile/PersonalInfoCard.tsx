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
        <p className="text-md md:text-xl">Personal Information</p>
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
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
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
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
                {!isEditing &&(
                  <div>
                    {/* Name */}
                    <h3 className="text-md lg:text-xl font-semibold">Sayde Marie P. Elegino</h3>
                    {/* Bio */}
                    <p className="text-xs lg:text-sm text-muted-foreground max-w-md">
                      Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit vestibulum.
                    </p>
                  </div>
                )}
                {isEditing &&(
                  <div>
                    <h3 className="text-md lg:text-xl font-semibold">Upload Profile Picture</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground max-w-lg">
                      Click below to upload a formal profile picture (JPEG, PNG, or JPG) to update your profile.
                    </p>
                  </div>
                )}
                {isEditing && (
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                )}
              </div>
            </div>

            <p className="text-xs lg:text-sm">Personal Details</p>
            {/* Personal Info Fields */}
            {isEditing && (
              <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
                <div className="lg:col-span-3">
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">First Name: </label>
                  <Input disabled={!isEditing} placeholder="Sayde Marie" type="text" className="text-xs lg:text-sm"/>
                </div>
                <div className="lg:col-span-3">
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Last Name: </label>
                  <Input disabled={!isEditing} placeholder="Elegino" type="text" className="text-xs lg:text-sm"/>
                </div>
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">M.I: </label>
                  <Input disabled={!isEditing} placeholder="P." type="text" className="text-xs lg:text-sm"/>
                </div>
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Suffix: </label>
                  <Input disabled={!isEditing} placeholder=" " type="text" className="text-xs lg:text-sm"/>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Email Address: </label>
                <Input disabled={!isEditing} placeholder="smp.elegino@gmail" type="email" className="text-xs lg:text-sm"/>
              </div>
              <div>
                <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Phone Number: </label>
                <Input disabled={!isEditing} placeholder="09123456789" type="number" className="text-xs lg:text-sm" />
              </div>
            </div>

            <Separator />

            <p className="text-xs lg:text-sm">Address</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Country: </label>
                <Input disabled={!isEditing} placeholder="Philippines" type="text" className="text-xs lg:text-sm"/>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Street: </label>
                <Input disabled={!isEditing} placeholder="Camagung, Lahug" type="text" className="text-xs lg:text-sm"/>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">ZIP Code: </label>
                <Input disabled={!isEditing} placeholder="6000" type="number" className="text-xs lg:text-sm"/>
              </div>
              <div>
                <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">City: </label>
                <Input disabled={!isEditing} placeholder="Cebu City" type="text" className="text-xs lg:text-sm"/>
              </div>
              <div>
                <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Province/State: </label>
                <Input disabled={!isEditing} placeholder="Cebu" type="text" className="text-xs lg:text-sm"/>
              </div>
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
