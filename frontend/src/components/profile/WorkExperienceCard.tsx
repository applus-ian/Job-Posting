"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Save, Trash2, Briefcase, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export function WorkExperienceCard() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row items-center">
          <p className="text-md lg:text-xl">Work Experience(s)</p>
        </div>
        <Button
          variant={isEditing ? "destructive" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1"
        >
          {isEditing ? <>Cancel</> : <>Edit</>}
        </Button>
      </div>
      {[1].map((_, index) => (
        <Card key={index} className="border shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase />
              <CardTitle className="text-sm lg:text-lg">Work Experience #{index + 1}</CardTitle>
            </div>
            {isEditing && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex flex-col gap-4">
              {/* Work Info Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                    Company:{" "}
                  </label>
                  <Input
                    disabled={!isEditing}
                    placeholder="Applus Velosi"
                    type="text"
                    className="text-xs lg:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                    Role/Position:{" "}
                  </label>
                  <Input
                    disabled={!isEditing}
                    placeholder="UI/UX Designer"
                    type="text"
                    className="text-xs lg:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                    Description:{" "}
                  </label>
                  <Textarea
                    disabled={!isEditing}
                    placeholder="As a **UI/UX Designer**, I specialize in creating visually appealing and user-friendly
                     interfaces that enhance user experience across digital platforms. I combine my passion for design 
                     with a deep understanding of user behavior, ensuring that every project is intuitive, functional, 
                     and aligned with the brand’s goals. I work with tools such as **Figma**, **Adobe XD**, and **Sketch** 
                     to craft engaging web and mobile designs. Whether it’s wireframing, prototyping, or conducting user 
                     research, I am dedicated to delivering seamless and enjoyable digital experiences."
                    className="text-xs lg:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <label className="text-[rgba(0,0,0,0.7)] text-xs ms-1">Start Year</label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue placeholder="2019" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[rgba(0,0,0,0.7)] text-xs ms-1">End Year</label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue placeholder="2023" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                      <SelectItem value="Present">Present</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {isEditing && (
        <div className="flex items-center justify-between mt-3">
          <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Another Experience
          </Button>
          <Button type="button" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
