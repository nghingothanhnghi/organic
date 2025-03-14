import moment from "moment";

/**
 * Formats a date string based on `useRelative` and `formatType`.
 * 
 * @param dateString - The date string in ISO format.
 * @param useRelative - If true, returns "X months ago".
 * @param formatType - "12-hour" for AM/PM, "24-hour" for military time.
 * @returns The formatted date string.
 */
export const formatDateTime = (
  dateString: string, 
  useRelative = false, 
  formatType: "12-hour" | "24-hour" = "24-hour"
): string => {
  const date = moment(dateString);
  
  if (!date.isValid()) {
    return "Invalid date"; // Handle invalid dates
  }

  if (useRelative) {
    return date.fromNow(); // "6 months ago"
  }

  // Switchable absolute format
  return formatType === "12-hour"
    ? date.format("DD/MM/YYYY, h:mm A")  // Example: 12/12/2024, 8:00 PM
    : date.format("DD/MM/YYYY, HH:mm"); // Example: 12/12/2024, 20:00
};
