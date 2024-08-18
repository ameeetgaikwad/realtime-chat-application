export function truncateText(text: string, maxLength: number) {
  if (text.length == 0) {
    return;
  }

  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
