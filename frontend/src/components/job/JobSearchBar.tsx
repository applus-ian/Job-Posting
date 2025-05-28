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
import { useState, useEffect } from "react";

type JobFilters = {
  titleOrTags: string;
  location: string;
  category: string;
}

type JobSearchBarProps = {
  onFilterChange: (filters: JobFilters) => void;
  jobPostings?: any[];
};

export default function JobSearchBar({ onFilterChange, jobPostings = [] }: JobSearchBarProps) {
  const [filters, setFilters] = useState<JobFilters>({
    titleOrTags: "",
    location: "",
    category: "",
  });

  const categories = Array.from(
    new Set(
      jobPostings
        .map(job => (typeof job.category === "string" ? job.category : null))
        .filter((cat): cat is string => !!cat)
    )
  );

  const handleChange = (field: keyof JobFilters) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFilters = { ...filters, [field]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (value: string) => {
    const newFilters = { ...filters, category: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 lg:p-2 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:divide-x">
        {/* Job Title */}
        <div className="flex items-center gap-2 w-full lg:flex-1 px-3 py-2 lg:px-4 border rounded-md lg:border-none lg:rounded-none">
          <Search className="text-orange-500 w-5 h-5" />
          <Input
            type="text"
            value={filters.titleOrTags}
            onChange={handleChange("titleOrTags")}
            placeholder="Job title, Keyword..."
            className="w-full border-none shadow-none p-0 text-left text-sm focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 w-full lg:w-[200px] px-3 py-2 lg:px-4 border rounded-md lg:border-none lg:rounded-none">
          <MapPin className="text-orange-500 w-5 h-5" />
          <Input
            value={filters.location}
            onChange={handleChange("location")}
            placeholder="Location"
            className="w-full border-none shadow-none p-0 text-left text-sm focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 w-full lg:w-[200px] px-3 py-2 m-0 lg:me-4 lg:px-4 border rounded-md lg:border-none lg:rounded-none">
          <Layers className="flex-shrink-0 text-orange-500 w-5 h-5" />
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full border-none shadow-none p-0 text-left text-sm text-gray-500 justify-start focus:ring-0 focus:outline-none">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No categories available
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))
                )}
            </SelectContent>
          </Select>
        </div>

        {/* Button */}
        <div className="w-full lg:w-auto px-3 lg:px-4">
          <Button className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md px-6 py-2">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
