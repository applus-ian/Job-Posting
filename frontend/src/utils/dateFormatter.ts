import { format } from "date-fns";

export function formatDateTime(dateString: string | Date): string {
  const date = new Date(dateString);
  return format(date, "MMMM d, yyyy - h:mm a");
}

export function formatDateOnly(dateString: string | Date): string {
  const date = new Date(dateString);
  return format(date, "MMMM d, yyyy");
}

export function formatTimeOnly(timeString: string): string {
  const today = new Date();
  const dateString = `${today.toISOString().split("T")[0]}T${timeString}`;
  const date = new Date(dateString);

  return format(date, "h:mm a");
}
