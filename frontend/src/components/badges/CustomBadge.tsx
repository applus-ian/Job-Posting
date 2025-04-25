"use client";
import { Badge } from "../ui/badge";
import clsx from "clsx";

const statusStyles = {
  tag: {
    text: "text-[#FF6900]",
    bg: "bg-[#FFEEE3]",
  },
  success: {
    text: "text-[#00730D]",
    bg: "bg-[#B6FFB2]",
  },
  submitted: {
    text: "text-[#767F8C]",
    bg: "bg-[rgba(118,127,140,0.2)]",
  },
  reviewed: {
    text: "text-[#22069F]",
    bg: "bg-[rgba(34,6,159,0.2)]",
  },
};

export default function CustomBadge({
  label,
  status,
}: {
  label: string;
  status: keyof typeof statusStyles;
}) {
  const styles = statusStyles[status] || statusStyles["tag"];
  return (
    <Badge className={clsx("rounded-full", styles.text, styles.bg)}>
      {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
    </Badge>
  );
}
