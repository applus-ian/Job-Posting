"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MapPin, Search, Layers } from "lucide-react";

export default function JobSearchBar() {
  return (
    <div className="bg-white rounded-xl shadow p-4 lg:p-2 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:divide-x">
        {/* Job Title */}
        <div className="flex items-center gap-2 w-full lg:flex-1 px-3 py-2 lg:px-4 border rounded-md lg:border-none lg:rounded-none">
          <Search className="text-orange-500 w-5 h-5" />
          <Input
            type="text"
            placeholder="Job title, Keyword..."
            className="w-full border-none shadow-none p-0 text-left text-sm focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 w-full lg:w-[200px] px-3 py-2 lg:px-4 border rounded-md lg:border-none lg:rounded-none">
          <MapPin className="text-orange-500 w-5 h-5" />
          <Input
            type="text"
            placeholder="Location"
            className="w-full border-none shadow-none p-0 text-left text-sm focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 w-full lg:w-[200px] px-3 py-2 lg:px-4 border rounded-md lg:border-none lg:rounded-none">
          <Layers className="text-orange-500 w-5 h-5" />
          <Select>
            <SelectTrigger className="w-full border-none shadow-none p-0 text-left text-sm text-gray-500 justify-start focus:ring-0 focus:outline-none">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Button */}
        <div className="w-full lg:w-auto px-3 lg:px-4">
          <Button className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md px-6 py-2">
            Find Job
          </Button>
        </div>
      </div>
    </div>
  );
}
