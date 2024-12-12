import moment from 'moment-timezone';

/**
 * Formats a timestamp to 'DD/MM/YY'.
 * @param timestamp - The timestamp to format.
 * @returns The formatted date as a string.
 */
export function formatTimestampToDDMMYY(timestamp: number): string {
  return moment(timestamp).format('DD/MM/YY');
}

/**
 * Formats a timestamp to 'DD MMM YYYY'.
 * @param timestamp - The timestamp to format.
 * @returns The formatted date as a string.
 */
export function formatTimestampToDDMMMYYYY(timestamp: number): string {
  return moment(timestamp).format('DD MMM YYYY');
}

/**
 * Formats a timestamp to a specific timezone.
 * @param timestamp - The timestamp to format.
 * @param timezone - The timezone to use for formatting.
 * @param format - The format string.
 * @returns The formatted date as a string.
 */
export function formatTimestampWithTimezone(
  timestamp: number,
  timezone: string,
  format: string,
): string {
  return moment.tz(timestamp, timezone).format(format);
}

/**
 * Adds days to a given timestamp.
 * @param timestamp - The timestamp to add days to.
 * @param days - The number of days to add.
 * @returns The new timestamp after adding the days.
 */
export function addDays(timestamp: number, days: number): number {
  return moment(timestamp).add(days, 'days').valueOf();
}

/**
 * Subtracts days from a given timestamp.
 * @param timestamp - The timestamp to subtract days from.
 * @param days - The number of days to subtract.
 * @returns The new timestamp after subtracting the days.
 */
export function subtractDays(timestamp: number, days: number): number {
  return moment(timestamp).subtract(days, 'days').valueOf();
}

/**
 * Checks if a timestamp is before another timestamp.
 * @param timestamp1 - The first timestamp.
 * @param timestamp2 - The second timestamp to compare with.
 * @returns True if the first timestamp is before the second, otherwise false.
 */
export function isBefore(timestamp1: number, timestamp2: number): boolean {
  return moment(timestamp1).isBefore(moment(timestamp2));
}

/**
 * Checks if a timestamp is after another timestamp.
 * @param timestamp1 - The first timestamp.
 * @param timestamp2 - The second timestamp to compare with.
 * @returns True if the first timestamp is after the second, otherwise false.
 */
export function isAfter(timestamp1: number, timestamp2: number): boolean {
  return moment(timestamp1).isAfter(moment(timestamp2));
}
