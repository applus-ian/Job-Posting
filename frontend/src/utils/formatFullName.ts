import { capitalizeText } from "./capitalizeText";

export function formatFullName(
  firstName?: string,
  middleName?: string,
  lastName?: string,
  suffix?: string
): string {
  const parts: string[] = [];

  if (firstName) parts.push(capitalizeText(firstName));
  if (middleName) parts.push(capitalizeText(middleName));
  if (lastName) parts.push(capitalizeText(lastName));

  let fullName = parts.join(" ");

  if (suffix) {
    fullName += `, ${suffix.toUpperCase()}`;
  }

  return fullName.trim();
}
