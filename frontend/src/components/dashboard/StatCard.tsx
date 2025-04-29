"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string | number;
  percentChange: number;
}

export function StatCard({ icon: Icon, iconColor, title, value, percentChange }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-orange-50/50 p-1.5 rounded-lg">
          <Icon className="h-4 w-4 text-orange-500" />
        </div>
        <span className="text-xs text-gray-600">{title}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold leading-none">{value}</p>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-green-50">
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 0.5L9.33013 8.5H0.669873L5 0.5Z" fill="#22C55E"/>
          </svg>
          <span className="text-[10px] text-green-600 font-medium">{percentChange}%</span>
        </div>
      </div>
    </div>
  );
} 