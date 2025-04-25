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
  open: {
    text: "text-[#00730D]",
    bg: "bg-[#B6FFB2]",
  },
  draft: {
    text: "text-[#424242]",
    bg: "bg-[#E3E3E3]",
  },
  closed: {
    text: "text-[#FF0000]",
    bg: "bg-[#FFE6E6]",
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
