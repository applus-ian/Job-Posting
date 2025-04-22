"use client";
import { Badge } from "../ui/badge";
import clsx from "clsx";

const statusStyles = {
  tag: {
    text: "text-[#FF6900]",
    bg: "bg-[#FFEEE3]",
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
