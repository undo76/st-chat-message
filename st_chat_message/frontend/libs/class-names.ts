/**
 * Helper function to generate class names
 */
export function classNames(
  ...classes: (false | null | undefined | string)[]
): string {
  return classes.filter(Boolean).join(" ");
}
