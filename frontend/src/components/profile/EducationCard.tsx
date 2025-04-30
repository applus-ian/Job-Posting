"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Save, Trash2, GraduationCap, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export function EducationCard() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl">Educational Background</p>
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
              <GraduationCap />
              <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
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
              {/* Educ Info Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                    School Name:{" "}
                  </label>
                  <Input
                    disabled={!isEditing}
                    placeholder="Cebu Technological University - Main Campus"
                    type="text"
                    className="text-xs lg:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                    Degree:{" "}
                  </label>
                  <Input
                    disabled={!isEditing}
                    placeholder="Bachelor of Science"
                    type="text"
                    className="text-xs lg:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-[rgba(0,0,0,0.7)] text-xs ms-1">
                    Course:{" "}
                  </label>
                  <Input
                    disabled={!isEditing}
                    placeholder="Information Systems"
                    type="text"
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
            Add Another Education
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
