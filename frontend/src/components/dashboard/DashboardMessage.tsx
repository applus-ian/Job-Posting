"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";

interface DashboardMessageProps {
  title: string;
  content: string;
  status?: "info" | "warning" | "success" | "error";
}

export function DashboardMessage({
  title,
  content,
  status = "info",
}: DashboardMessageProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const statusStyles = {
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
  };

  const titleStyles = {
    info: "text-blue-800",
    warning: "text-yellow-800",
    success: "text-green-800",
    error: "text-red-800",
  };

  return (
    <div className={`relative rounded-md border px-3 py-2 ${statusStyles[status]} shadow-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <h4 className={`text-xs font-medium ${titleStyles[status]}`}>{title}</h4>
          <p className="mt-0.5 text-xs">{content}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 rounded-full p-1 hover:bg-black/5"
        >
          <XIcon className="h-3 w-3" />
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
  );
}
