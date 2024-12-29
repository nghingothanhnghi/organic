import moment from "moment";

/**
 * Formats a date string into 'dd/mm/yyyy, hh:00'.
 * @param dateString - The date string in ISO format.
 * @returns The formatted date string or a placeholder for invalid dates.
 */
export const formatDateTime = (dateString: string): string => {
  const date = moment(dateString);
  
  // Check if the date is valid
  if (!date.isValid()) {
    return "Invalid date"; // Optional: Customize for invalid dates
  }
  
  // Format: dd/mm/yyyy, hh:00
  return date.format("DD/MM/YYYY, HH:00");
};
