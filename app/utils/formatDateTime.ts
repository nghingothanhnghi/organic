import moment from "moment/min/moment-with-locales";
import "moment/locale/vi"; // Import Vietnamese locale
import "moment/locale/en-gb"; // Import English (or use "en" if needed)
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
  formatType: "12-hour" | "24-hour" = "24-hour",
  locale: string = "vi" // Default to English
): string => {
  const date = moment(dateString);
  
  if (!date.isValid()) {
    return locale === "vi" ? "Ngày không hợp lệ" : "Invalid date"; // Handle invalid dates
  }

  date.locale(locale || "vi"); // Ensure locale is set dynamically, fallback to Vietnamese

  if (useRelative) {
    return date.fromNow(); // Example: "5 tháng trước" (Vietnamese), "5 months ago" (English)
  }

  // Switchable absolute format
  return formatType === "12-hour"
    ? date.format("DD/MM/YYYY, h:mm A")  // Example: 12/12/2024, 8:00 PM
    : date.format("DD/MM/YYYY, HH:mm"); // Example: 12/12/2024, 20:00
};
